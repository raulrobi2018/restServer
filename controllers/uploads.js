const {response} = require("express");
const path = require("path");

//Se iguala res a response para tener el tipado de express
const loadFile = (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    const {file} = req.files;
    const splitedName = file.name.split(".");
    const extension = splitedName[splitedName.length - 1];

    //Validate extension
    const allowedExtensions = ["png", "jpg", "txt", "jpeg", "pdf", "gif"];

    if (!allowedExtensions.includes(extension)) {
        return res
            .status(400)
            .json({
                msg: `Extension ${extension} is not allowed. Valid extension ${allowedExtensions} `
            });
    }

    const uploadPath = path.join(__dirname, "../uploads/", file.name);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({msg: "File uploaded to " + uploadPath});
    });
};

module.exports = {
    loadFile
};
