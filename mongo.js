const colors = require("colors");
const mongoose = require("mongoose");
const mongo = { defaults: require("./defaultValues"), ...require("dbdjs.mongo").default };
const Database = require("./class/Database");

module.exports = async (client) => {
	mongoose.connection.on("connected", () => console.log("[DB]".red + "Database is connected and ready.".green));
	mongoose.connection.on("disconnected", () => console.log("[DB]".red +  "Database has been disconnected.".green));
	mongoose.connection.on("error", (err) => console.error("[DB]".red + "An error occured!\n".red + err));

	mongoose.connect("mongodb+srv://root:Leszno3087@cluster0.d6fdt.mongodb.net/verify?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		keepAlive: true
	});
	mongo.createModel("verification");
	client.db = new Database(mongo);
};