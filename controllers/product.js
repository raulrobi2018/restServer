const {response} = require("express");

const {Product} = require("../models");

const newProduct = async (req, res = response) => {
    //Quito state y user por si vienen ya que estos no se deben guardar aquí
    const {state, user, ...body} = req.body;

    const prod = await Product.findOne({name: body.name});

    if (prod) {
        return res.status(400).json({
            msg: `The product ${prod.name} already exists`
        });
    }

    const prodData = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.userAuth._id
    };
    const product = new Product(prodData);

    try {
        await product.save();
    } catch (error) {
        console.log("Error saving product", error);
        return res.status(500).json({
            msg: "Error saving the product"
        });
    }
    res.status(201).json(product);
};

getProducts = async (req, res = response) => {
    //const queryParams = req.query;
    const {limit = 5, from = 0} = req.query;
    const condition = {state: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(condition),
        //En esta línea primero buscamos las categorías con el estado en true, luego le indicamos
        //desde que registro traer y por último le decimos el límite que queremos de registros
        Product.find(condition)
            .skip(Number(from))
            .limit(Number(limit))
            //Obtiene el nombre del usuario vinculado a la categoría
            .populate("user", "name")
            .populate("category", "name")
    ]);

    res.status(201).json({total, products});
};

getProductById = async (req, res = response) => {
    const {id} = req.params;
    const prod = await Product.findById(id)
        .populate("user", "name")
        .populate("category", "name");
    res.status(201).json(prod);
};

updateProduct = async (req, res = response) => {
    const {id} = req.params;
    //Extrae los datos que no se deben actualizar aquí
    const {state, user, category, ...data} = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    //User owner token
    data.userAuth = req.userAuth._id;

    //El parámetro new: true va a hacer que se muestre en la respuesta el
    //objeto actualizado
    const prodDb = await Product.findByIdAndUpdate(id, data, {new: true});
    res.status(201).json({msg: "Product updated successfully", id, prodDb});
};

deleteProduct = async (req, res = response) => {
    const {id} = req.params;
    //Borrado lógico
    const prod = await Product.findByIdAndUpdate(
        id,
        {state: false},
        {new: true}
    );
    res.json(prod);
};

module.exports = {
    newProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
