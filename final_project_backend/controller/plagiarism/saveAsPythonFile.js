const fs = require('fs');
const path = require('path');

const saveAsPythonFile = async (submittedAnswer, filename) => {
    
    const filePath = path.join(__dirname, `${filename}.py`);
    fs.writeFileSync(filePath, submittedAnswer);
    return filePath;
}

module.exports = saveAsPythonFile;