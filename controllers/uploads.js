const {response} = require("express");
const {uploadFile} = require("../helpers/file-upload");

//Se iguala res a response para tener el tipado de express
const loadFile = async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    try {
        //const fileName = await uploadFile(req.files, ["txt", "docx"], "txt");
        const fileName = await uploadFile(req.files, undefined, "images");
        res.json({fileName});
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

module.exports = {
    loadFile
};
