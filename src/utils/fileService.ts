import path from "path";
import fs from "fs";
import {v4 as uuidv4} from "uuid";

class FileService {
  save(file: any): string {
    const fileExtension = file.mimetype.split("/")[1]; // .jpg
    const random = uuidv4(); //random string
    const fileName = random + "." + fileExtension;
    console.log(fileName);
    const filePath = path.resolve("static", fileName);
    file.mv(filePath);
    return fileName;
  }
  delete(fileName: string) {
    const filePath = path.resolve("static", fileName);
    fs.unlinkSync(filePath);
  }
}

export default new FileService();
