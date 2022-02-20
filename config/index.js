require("dotenv").config();

let config = {
    port: process.env.PORT,
    class: process.env.CLASE
}

let sockets = {

}

module.exports = { config, sockets }