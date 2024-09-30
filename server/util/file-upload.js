const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

const fileUpload = async function (file, directory) {
    return new Promise((resolve, reject) => {
        try {
            let mime_type = file.split(';')[0].split(":")[1].split('/')[1];
            console.log("mime_type: ", mime_type);

            if (mime_type === "png" || mime_type === "jpeg" || mime_type === "gif" || mime_type === "mp4") {
                let file_name = dayjs().format('YYYYMMDDHHmmss') + "_" + String(Math.floor(Math.random() * 100)) + "." + mime_type;
                console.log("file name: ", file_name);

                let upload_path = path.join('uploads', directory);
                console.log("upload_path: ", upload_path);

                let base64 = file.split(';base64,')[1];

                fs.mkdir(upload_path, { recursive: true }, (err) => {
                    if (err) {
                        return reject(err.message ? err.message : err);
                    } else {
                        
                        let full_upload_path = path.join(upload_path, file_name);
                        console.log("Full upload path: ", full_upload_path);

          //encoding  
                        fs.writeFile(
                            full_upload_path,
                            base64,
                            { encoding: "base64" },
                            (err) => {
                                if (err) {
                                    return reject(err.message ? err.message : err);
                                } else {
                                    // Resolve with the path to the uploaded file
                                    return resolve(full_upload_path);
                                }
                            }
                        );
                    }
                });
            } else {
                console.log("Invalid file type");
                return reject("Only .png, .jpeg, .jpg, .gif, and .mp4 formats are allowed.");
            }
        } catch (error) {
            console.log(error);
            return reject(error.message ? error.message : error);
        }
    });
};


//>>>>>//?
module.exports = { fileUpload };
