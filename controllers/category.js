const {response, request} = require("express");

const {validateFields} = require("../middlewares/field-validator");
const {Category} = require("../models");

const newCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const cat = await Category.findOne({name});

    if (cat) {
        return res.status(400).json({
            msg: `The category ${cat.name} already exists`
        });
    }

    const catData = {
        name,
        user: req.userAuth._id
    };
    const category = new Category(catData);

    try {
        await category.save();
    } catch (error) {
        console.log("error creando categoria", error);
        return res.status(500).json({
            msg: "Error saving the category"
        });
    }
    res.status(201).json(category);
};

getCategories = async (req, res = response) => {
    //const queryParams = req.query;
    const {limit = 5, from = 0} = req.query;
    const condition = {state: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(condition),
        //En esta línea primero buscamos las categorías con el estado en true, luego le indicamos
        //desde que registro traer y por último le decimos el límite que queremos de registros
        Category.find(condition)
            .skip(Number(from))
            .limit(Number(limit))
            //Obtiene el nombre del usuario vinculado a la categoría
            .populate("user", "name")
    ]);

    res.status(201).json({total, categories});
};

getCategoryById = async (req, res = response) => {
    const {id} = req.params;
    const cat = await Category.findById(id).populate("user", "name");
    res.status(201).json(cat);
};

updateCategory = async (req, res = response) => {
    const {id} = req.params;
    //Extrae el state y el user por si alguién quiere actualizarlos y
    //esos datos NO se actualizan por este método
    const {state, user, ...data} = req.body;
    data.name = data.name.toUpperCase();
    //User owner token
    data.userAuth = req.userAuth._id;

    //El parámetro new: true va a hacer que se muestre en la respuesta el
    //objeto actualizado
    const catDb = await Category.findByIdAndUpdate(id, data, {new: true});
    res.status(201).json({msg: "Category updated successfully", id, catDb});
};

deleteCategory = async (req, res = response) => {
    const {id} = req.params;
    //Borrado lógico
    const cat = await Category.findByIdAndUpdate(
        id,
        {state: false},
        {new: true}
    );
    res.json(cat);
};

module.exports = {
    newCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
