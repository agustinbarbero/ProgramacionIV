const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

function checkMagicBytes(filePath) {
    try {
        const buffer = Buffer.alloc(4);
        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, 4, 0);
        fs.closeSync(fd);
        
        const hex = buffer.toString('hex').toUpperCase();

        if (hex.startsWith('FFD8FF')) return 'image/jpeg';
        if (hex.startsWith('89504E47')) return 'image/png';
        if (hex.startsWith('47494638')) return 'image/gif';
        if (hex.startsWith('25504446')) return 'application/pdf';
        
        return 'unknown';
    } catch (err) {
        return 'error';
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, uniqueName + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const validNameRegex = /^[a-zA-Z0-9.-]+$/;
        
        if (!validNameRegex.test(file.originalname)) {
             return cb(new Error('Invalid filename'));
        }

        const ext = path.extname(file.originalname).toLowerCase();
        if (!ext) return cb(new Error('Invalid filename'));

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt'];
        if (!allowedExtensions.includes(ext)) {
            return cb(new Error('File type not allowed'));
        }
        
        cb(null, true);
    }
});

const uploadMiddleware = (req, res, next) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ error: 'File too large' });
            }

            if (err.message === 'File type not allowed') {
                return res.status(400).json({ error: 'File type not allowed' });
            }


            if (err.message === 'Invalid filename' || err.message === 'Malformed part header') {
                return res.status(400).json({ error: 'Invalid filename' });
            }

            return res.status(400).json({ error: 'Invalid filename' }); 
        }
        next();
    });
};

const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const detectedMime = checkMagicBytes(req.file.path);
    const ext = path.extname(req.file.originalname).toLowerCase();
    
    const isText = ext === '.txt'; 
    const isValidImage = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(detectedMime);

    if (!isText && !isValidImage) {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'Invalid file content' });
    }

    try {
        fs.chmodSync(req.file.path, 0o644);
    } catch (e) {
    }

    res.json({ 
        message: 'File uploaded successfully', 
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
    });
};

module.exports = {
    uploadMiddleware,
    uploadFile
};