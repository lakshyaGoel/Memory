var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URI);

var tag = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    name: String
});
module.exports = mongoose.model("Tag", tag);