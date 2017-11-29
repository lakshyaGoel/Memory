/**
 * Created by reiven on 2017/11/07.
 */
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URI);

var tag = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    tagName: String, // img url
    noteId: [Schema.ObjectId],// store Note DB's object ID
}, {timestamps: {}});// timestamp automatically set createdAt, and updatedAt


mongoose.connect(process.env.DB_URL);

module.exports = mongoose.model("Tag", tag);