var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URI);

var image = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    tagIdList: [{type: Schema.Types.ObjectId, ref: "Tag"}],
    description: String,
    imageBinary: String,
    userMail: String
});


module.exports = mongoose.model("Image", image);