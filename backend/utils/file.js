const fs = require('fs').promises;
const path = require('path');

async function deleteFileFromUploads(filename) {
    try {
        const filePath = path.join(__dirname, '..', '../backend/uploads', filename);

        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`deleted file: ${filePath}`);
    } catch (err) {

        console.log('Error deleting file:', err);
    }
}

module.exports = { deleteFileFromUploads };
