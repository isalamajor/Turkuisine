const mongoose = require("mongoose");
const connection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/turkuisine"); // await espera si la conexion tarda un poco
        console.log("Connection to database successful :)");
    } catch (error) {
        console.log(error);
        throw new Error("Not able to connect to database")
    }
}

module.exports = {connection};