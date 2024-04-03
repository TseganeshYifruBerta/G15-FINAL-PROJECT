const parseTaggedCode= async(tagged_code) =>{
    
    const sections = [];
    const regex = /<plagiarized>(.*?)<\/plagiarized>/gs;

    let match;
    while ((match = regex.exec(tagged_code)) !== null) {

        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        sections.push(match[1]);
        
    }
    return sections;
}
module.exports = parseTaggedCode;