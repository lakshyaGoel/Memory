var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URI);

var memory = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    name: String,
    country: String,
    city: [],
    description: String,
    imageIdList: [{type: Schema.Types.ObjectId, ref: "Image"}],
    userMail: String
}, {timestamps: {}});// timestamp automatically set createdAt, and updatedAt


module.exports = mongoose.model("Memory", memory);