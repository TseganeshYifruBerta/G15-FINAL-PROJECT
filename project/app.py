from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from winnowing import Winnowing

app = Flask(__name__)

# Temporary folder to save uploaded files
UPLOAD_FOLDER = '/tmp/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/check_plagiarism', methods=['POST'])
def check_plagiarism():
    if 'file1' not in request.files or 'file2' not in request.files:
        return jsonify({"error": "Both file1 and file2 are required."}), 400

    file1 = request.files['file1']
    file2 = request.files['file2']

    filename1 = secure_filename(file1.filename)
    filename2 = secure_filename(file2.filename)
    
    filepath1 = os.path.join(UPLOAD_FOLDER, filename1)
    filepath2 = os.path.join(UPLOAD_FOLDER, filename2)
    
    # Attempt to save uploaded files
    try:
        file1.save(filepath1)
    except Exception as e:
        return jsonify({"error": f"Could not save file {filename1}. Error: {str(e)}"}), 500
    
    try:
        file2.save(filepath2)
    except Exception as e:
        # Clean up the first file in case of failure when saving the second file
        if os.path.exists(filepath1):
            os.remove(filepath1)
        return jsonify({"error": f"Could not save file {filename2}. Error: {str(e)}"}), 500

    winnowing = Winnowing(filepath1, filepath2)
    result = winnowing.check()
    
    # Clean up the uploaded files
    if os.path.exists(filepath1):
        os.remove(filepath1)
    if os.path.exists(filepath2):
        os.remove(filepath2)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
