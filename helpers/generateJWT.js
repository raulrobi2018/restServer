const jwt = require("jsonwebtoken");

//No tiene que ser async porque porque JWT trabaja con promesas devuelto por el callback,
//por lo tanto devuelvo una Promise
//Recibo el uid que será el único dato que voy a almacenar en el payload del JWT
const generateJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = {uid};

        //Firmamos el JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "4h"
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    reject("Could not generate the token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT
};
