const determineStudentIdForSection = async(concatenatedCode, plagiarizedSections) => {
    let normalizedCode = concatenatedCode.replace(/\r\n/g, "\n").trim();
    const lines = normalizedCode.split('\n');
    
    let currentStudentId = null;
    let tempCodeBlock = '';
    let foundStudentIds = []; // Use an array to collect IDs

    for (const line of lines) {
        if (line.trim().startsWith('# Student ID:')) {
            // Before resetting for the next student, check if the current block contains plagiarized content
            if (currentStudentId && plagiarizedSections.some(section => tempCodeBlock.includes(section))) {
                foundStudentIds.push(currentStudentId); // Add the current ID if plagiarized content was found
            }
            currentStudentId = line.split(':')[1].trim(); // Update the current student ID
            tempCodeBlock = ''; // Reset the temp code block for the next student
        } else {
            tempCodeBlock += line + '\n'; // Append the current line to the temp code block
        }
    }

    // After looping, check the last student's block for plagiarized content
    if (currentStudentId && plagiarizedSections.some(section => tempCodeBlock.includes(section))) {
        foundStudentIds.push(currentStudentId); // Add the last student ID if plagiarized content was found
    }

    return foundStudentIds.length > 0 ? foundStudentIds : "Plagiarized section not found in any student's code";
};
module.exports = determineStudentIdForSection;