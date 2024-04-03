const determineStudentIdForSection = async(concatenatedCode, plagiarizedSections) => {
    
    let normalizedCode = concatenatedCode.replace(/\r\n/g, "\n").trim();

    const lines = normalizedCode.split('\n');
    
    let currentStudentId = null;
    let tempCodeBlock = '';
    let foundStudentId = null;

    for (const line of lines) {
        if (line.startsWith('# Student ID:')) {

            let normalizedTempCodeBlock = tempCodeBlock.replace(/\r\n/g, "\n").trim();
            if (plagiarizedSections.some(section => normalizedTempCodeBlock.includes(section.replace(/\r\n/g, "\n").trim()))) {
                foundStudentId = currentStudentId;
                break;
            }
            
            currentStudentId = line.split(':')[1].trim();
            tempCodeBlock = '';
        } else {
            tempCodeBlock += line + '\n';
        }
    }

    if (!foundStudentId && plagiarizedSections.some(section => tempCodeBlock.replace(/\r\n/g, "\n").trim().includes(section.replace(/\r\n/g, "\n").trim()))) {
        foundStudentId = currentStudentId;
    }

    if (foundStudentId) {
        return foundStudentId
    } else {

        // console.log("Plagiarized section not found in any student's code. Check for formatting and whitespace differences.");
        return ("Plagiarized section not found in any student's code" );
    }
};

module.exports = determineStudentIdForSection;
