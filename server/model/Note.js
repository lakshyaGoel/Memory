/**
 * Created by reiven on 2017/11/07.
 */

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URI);

var note = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,// the _id of user who create this content
    finalEditUserId: Schema.Types.ObjectId,// the User id
    title: String,// content title
    content: String,// main content of note
    description: String,// description
    tags: [Schema.Types.ObjectId],
    share: {type: Boolean, default: false}, // if enable to share, set true, else this note could not share
    shareUser: [{// item added in share user's schema is below.
        userId: {type: Schema.Types.ObjectId},
        r: {type: Boolean, default: true},// read authority, if true, note can read only, else, note can't see whether share flag is true, default is true.
        w: {type: Boolean, default: false}// write authority, if true, note can edit, else note cannot edit, default: false
    }],
    type: {type: String, default: "note"},// put note type: [note | code], default: note
    codeSetting: {
        mode: {type: String},
        theme: {type: String},
        autoComplete: {type: Boolean, default: false},
        lineNumber: {type: Boolean, default: false},
    },
    like: [// liked user data to prevent duplicate like and dislike
        {
            userId: {type: Schema.Types.ObjectId},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    dislike: [// liked user data to prevent duplicate like and dislike
        {
            userId: {type: Schema.Types.ObjectId},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    history: []
}, {timestamps: {}});// timestamp automatically set createdAt, and updatedAt

module.exports = mongoose.model("Note", note);