from pygments.lexers import guess_lexer_for_filename
import pygments.token 


class Parser:
    def __init__(self, filename, text):
        self.filename = filename
        self.text = text
    
    def get_parsed_result(self):
        lexer = guess_lexer_for_filename(self.filename, self.text)

        tokens = lexer.get_tokens(self.text)
        tokens = list(tokens)
        orignal_counter = 0
        hashed_counter = 0

        result = []
        
        for i, token in enumerate(tokens):
            if token[0] in pygments.token.Name.Function:
                result.append(("F", orignal_counter, hashed_counter))
                hashed_counter += 1
            elif token[0] in pygments.token.Name:
                result.append(("V",orignal_counter,hashed_counter))
                hashed_counter += 1
            elif token[0] in pygments.token.Literal.String:
                result.append(("S", orignal_counter, hashed_counter))
            elif token[0] in pygments.token.Comment or token[0] in pygments.token.Text or token[0] in pygments.token.Whitespace:
                pass
            else:
                result.append((token[1], orignal_counter, hashed_counter))
                hashed_counter += len(token[1])

            orignal_counter += len(token[1])

        return result

# r = Parser("example.py").get_parsed_result()
# print(r)


