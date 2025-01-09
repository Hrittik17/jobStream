import multer from "multer";
import path from "path";

// Set storage engine
const applicationStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/resumes/"); // Set upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

// File filter (to ensure only PDFs are uploaded)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf,application/msword") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed."), false);
    }
};

// Multer middleware
const applicationUpload = multer({
    applicationStorage,
    fileFilter,
    limits: { fileSize: 7 * 1024 * 1024 }, // Limit file size to 7MB
});

export default applicationUpload;
