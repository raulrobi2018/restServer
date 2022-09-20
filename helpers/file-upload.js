const path = require("path");

const {v4: uuidv4} = require("uuid");

const uploadFile = (
    files,
    allowedExtensions = ["png", "jpg", "txt", "jpeg", "pdf", "gif"],
    folder = ""
) => {
    return new Promise((resolve, reject) => {
        const {file} = files;
        const splitedName = file.name.split(".");
        const extension = splitedName[splitedName.length - 1];

        //Validate extension
        if (!allowedExtensions.includes(extension)) {
            return reject(
                `Extension ${extension} is not allowed. Valid extension ${allowedExtensions} `
            );
        }

        const tempName = uuidv4() + "." + extension;
        const uploadPath = path.join(
            __dirname,
            "../uploads/",
            folder,
            tempName
        );

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(tempName);
        });
    });
};

module.exports = {
    uploadFile
};
