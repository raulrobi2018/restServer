const {response} = require("express");

const isAdminRole = (req, res = response, next) => {
    //In case the user is null
    if (!req.userAuth) {
        return res.status(500).json({msg: "The token is not verified"});
    }

    const {role, name} = req.userAuth;

    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} is not an administrator`
        });
    }

    next();
};

//En este middleware se reciben parámetros. Los tomo con el spread por pueden variar
//En vez de retornar una respuesta, retorno una función para poder seguir manejando el
//request y el response
const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: "Should validate the token first"
            });
        }

        if (!roles.includes(req.userAuth.role)) {
            res.status(401).json({
                msg: `The service requires one of these roles ${roles}`
            });
        }
        next();
    };
};

module.exports = {
    isAdminRole,
    hasRole
};
