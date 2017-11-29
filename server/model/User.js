/**
 * Created by reiven on 2017/11/07.
 */

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;


mongoose.connect(process.env.DB_URI);


var user = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    img: String, // img url given from auth0
    name: String, // note name given from auth0
    nickname: String // note nickname given from auth0
}, {timestamps: {}});// timestamp automatically set createdAt, and updatedAt


mongoose.connect(process.env.DB_URL);

module.exports = mongoose.model("User", user);