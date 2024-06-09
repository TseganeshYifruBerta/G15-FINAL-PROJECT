from tokenizer import Parser

class Winnowing:
    def __init__(self, filename1, filename2):
        self.filename1 = filename1
        self.filename2 = filename2
    

    def hash(self,text):
        return hash(text)

    def k_gram(self,text, k):
        result = []
        for i in range(len(text) - k + 1):
            kgram = text[i:i+k]
            result.append((kgram, self.hash(kgram), i, i+k))
        return result
    
    def get_fingerprints(self, window_size, hash_value):
        fingerprints = []
        prev_min = 0

        for i in range(len(hash_value) - window_size):
            window = hash_value[i:i+window_size]

            min_j = window.index(min(window))
            if min_j + i != prev_min:
                fingerprints.append(hash_value[min_j + i])
                prev_min = min_j + i
        
        return fingerprints


    def merge(self, intervals):
        if not intervals:
            return []
        intervals.sort()
        res = [intervals[0]]
        for i in range(1, len(intervals)):
            if res[-1][1] >= intervals[i][0]:
                res[-1] = [min(res[-1][0], intervals[i][0]), max(res[-1][1], intervals[i][1])]
            else:
                res.append(intervals[i])
        
        return res
    
    def check(self):
        text1 = ""
        with open(self.filename1,'r') as f:
            text1 = f.read()

        p1 = Parser(self.filename1, text1)
        token1 = p1.get_parsed_result()
        string1 = "".join(list(map(lambda x : x[0], token1)))
        kgrams1 = self.k_gram(string1, 25)
        h1 = list(map(lambda x : x[1], kgrams1))
        fingerprints1 = self.get_fingerprints(4, h1)


        text2 = ""
        with open(self.filename2,'r') as f:
            text2 = f.read()

        p2 = Parser(self.filename2, text2)
        token2 = p2.get_parsed_result()
        string2 = "".join(list(map(lambda x : x[0], token2)))
        kgrams2 = self.k_gram(string2, 25)
        h2 = list(map(lambda x : x[1], kgrams2))
        fingerprints2 = self.get_fingerprints(4, h2)

        detected = []
        for f1 in fingerprints1:
            for f2 in fingerprints2:
                if f1 == f2:
                    idx = h1.index(f1)
                    start = kgrams1[idx][2]
                    end = kgrams1[idx][3]
                    flag = 0
                    for t in token1:
                        if t[2] == start:
                            start = t[1]
                            flag = 1
                        
                        if t[2] == end:
                            end = t[1]
                                
                    if flag:
                        detected.append([start,end])
        if not detected:
            # Return a result indicating no plagiarism was detected or handle this case as desired
            return {"ratio": 0.0, "tagged_code": "No plagiarism detected."}
        
        detected.sort()
        merged = [detected[0]] + self.merge(detected[1:]) 
        count = 0
        code = ""
        if merged:
            code = text1[:merged[0][0]]
            for i, tup in enumerate(merged):
                if tup[1] > tup[0]:
                    count += (tup[1] - tup[0])

                    code += '<plagiarized>' + text1[merged[i][0] : merged[i][1]] + '</plagiarized>'
                    if i < len(merged) - 1:
                        code += text1[merged[i][1] : merged[i+1][0]]
                    else:
                        code += text1[merged[i][1]:]

        result = count/len(text1) if count/len(text1) < 1 else 1.0

        return {"ratio":result, "tagged_code":code}




                









