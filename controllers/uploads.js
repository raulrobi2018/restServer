const {response} = require("express");
const {uploadFile} = require("../helpers/file-upload");
const {User, Product} = require("../models");
const path = require("path");
const fs = require("fs");

//Se iguala res a response para tener el tipado de express
const loadFile = async (req, res = response) => {
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

const updateImage = async (req, res = response) => {
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({msg: `The user with id ${id} does not exist`});
            }
            break;
        case "products":
            model = await Product.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({msg: `The product with id ${id} does not exist`});
            }
            break;

        default:
            return res
                .status(500)
                .json({msg: `Collection ${collection} is not validated`});
    }

    //Clear previous images
    if (model.img) {
        const pathImg = path.join(
            __dirname,
            "../uploads",
            collection,
            model.img
        );
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    let file;

    //Puede fallar la subida porque el uploadFile retorna el reject y no es enviada
    //la respuesta al response
    try {
        file = await uploadFile(req.files, undefined, collection);
    } catch (error) {
        return res.status(500).json({msg: `${error}`});
    }

    model.img = file;

    await model.save();

    res.json(model);
};

module.exports = {
    loadFile,
    updateImage
};
