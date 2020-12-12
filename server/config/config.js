// ==============================
// Port
// ==============================
process.env.PORT = process.env.PORT || 3000;

// ==============================
// Enviroment
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ==============================
// Database
// ==============================
let urlDatabase;

if (process.env.NODE_ENV === "dev") {
    urlDatabase = "mongodb://localhost:27017/cofee";
} else {
    urlDatabase =
        "mongodb+srv://raulrobi:2AGJglk4RqjhBRPF@cluster0.vrtdh.mongodb.net/coffee?retryWrites=true&w=majority";
}

process.env.URLDB = urlDatabase;
