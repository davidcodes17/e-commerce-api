import { readFile, readFileSync, writeFile } from "fs";
import path from "path";

export default (d) => {
  const p = path.join("./public", "log.txt");
  readFile(p, "utf8", (err, data) => {
    const contents = data+=`
        ___________________________ ${new Date().toUTCString()} ___________________________
        
        ${d}
        _________________________________________________________________________
        
        `;
    writeFile(p, contents, (err) => {
      if (!err) {
        console.log("Error Logged Successfully");
      }
    });
  });
};
