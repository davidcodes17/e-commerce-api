import path from "path"
import fs from "fs"

export default (f:Express.Multer.File) => {
    const tempFilePath = path.join(__dirname, "../", 'uploads', f.originalname); 
  
    // Write the buffer to a temporary file
    fs.writeFileSync(tempFilePath, f.buffer);
  
    // Create a File object
    const file = new File([fs.readFileSync(tempFilePath)], f.filename, { type: f.mimetype });
  
    // Cleanup: Remove the temporary file
    fs.unlinkSync(tempFilePath);
  
    return file;
};