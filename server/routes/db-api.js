var express = require('express');
var router = express.Router();
const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

// mongoose model and some parts
var ObjectId = require('mongoose').Types.ObjectId;
var Memory = require("../model/Memory");
var Image = require("../model/Image");

/**
 * What kind of API I need?
 *
 * // create part
 * - add memory
 * - add image
 * - add tag?
 *
 * // read part
 * - show all memories I registered
 * - show all image info in certain memory
 * - show image detail
 * - search memory by date/name/or something like that.
 *
 * // update part
 * - edit memory
 * - edit image
 * - edit tag?
 *
 * // delete part
 * - delete memory
 * - delete image and description set
 * - delete tag?
 */

// MUST USE sendMessage Object to send message to the client
// The style of sendMessage is
// sendMessage = {status: boolean, data: object}


// delete note by id
// TODO: fix as post
router.get("/delete",  function(req, res, next){
    console.log("test");
    res.send("hello teset");
});


// api to get all-memory item
// TODO: fix as post
// TODO: kill auth in the meantime of auth non setting
router.post("/all-memory", /*checkJwt,*/ function(req, res, next){
    let sendMessage = {"status": false, data: {}};

    // get user mail address send from client
    let userMail = req.body.userMail;

    if(userMail != ""){// TODO: need check this, maybe undefined or something.
        Memory.find({"userMail": userMail}).exec(function(err, result){
            if(!err){
                // set sendMessage
                sendMessage.status = true;
                sendMessage.data = result;
            }
            res.send(sendMessage);
        });
    }else{
        res.send(sendMessage);
    }// TODO: need test. I did not test yet.
});// END: router.post("/all-memory", checkJwt, function(req, res, next)


// api to get image item of certain memory
router.post("/memory-image", checkJwt, function(req, res, next){
    let sendMessage = {"status": false, data: {}};

    // get tapped memoryId send from client
    let memoryId = req.body.memoryId;

    if(memoryId != ""){// TODO: need check this, maybe undefined or something.
        Memory.find({_id: ObjectId(memoryId)})
        .populate("imageIdList")// TODO: populate test!
        .exec(function(err, result){
            if(!err){
                // set sendMessage
                sendMessage.status = true;
                sendMessage.data = result;
            }
            res.send(sendMessage);
        });
    }else{
        res.send(sendMessage);
    }
});// END: router.post("/memory-image", checkJwt, function(req, res, next)


// api to get certain image detail
router.post("/image-detail", checkJwt, function(req, res, next){
    let sendMessage = {"status": false, data: {}};

    // get tapped imageId send from client
    let imageId = req.body.imageId;

    if(imageId != ""){// TODO: need check this, maybe undefined or something.
        Image.find({_id: ObjectId(imageId)})
        .populate("tagIdList")// TODO: populate test!
        .exec(function(err, result){
            if(!err){
                // set sendMessage
                sendMessage.status = false;
                sendMessage.data = result;
            }
            res.send(sendMessage);
        });
    }else{
        res.send(sendMessage);
    }
});// END: router.post("/image-detail", checkJwt, function(req, res, next)


// api when go to add new Image page
router.post("/add-image-page", checkJwt, function(req, res, next){
    let sendMessage = {"status": false, data: {}};

    // get user mail address send from client
    let userMail = req.body.userMail;
    let memoryPromise = Memory.find({userMail: userMail});
    let tagPromise = Tag.find({userMail: userMail});
    Promise.all([memoryPromise, tagPromise])
    .then(
        function(result){
            let memoryResult = result[0];
            let tagResult = result[1];

            // set sendMessage
            sendMessage.status = true;
            sendMessage.data = {memoryList: memoryResult, tagList: tagResult};
            res.send(sendMessage);
        },
        function(reason){// if operation fault
            sendMessage.data = {reason: reason};

            // set sendMessage
            res.send(sendMessage);
        }
    );
});// END: router.post("/add-image-page", checkJwt, function(req, res, next)


// api when save new Image
router.post("/add-image-to-the-memory",checkJwt, function(req, res, next){
    let sendMessage = {"status": false, data: {}};

    let memoryId = req.body.memoryId? req.body.memoryId: false;
    let userMail = req.body.userMail;
    let description = req.body.description ? req.body.description: false;
    let imageBinary = req.body.imageBinary ? req.body.imageBinary: false;
    let tagIdList = req.body.tagIdList ? req.body.tagIdList: "";
    let title = req.body.title ? req.body.title: false;
    // console.log("req.body: ",req.body);


    // Image save()
    let image = new Image();

    if(title){
        image.title = title;
    }

    if(description){
        image.description = description;
    }

    if(imageBinary){
        image.imageBinary = imageBinary;
    }

    if(userMail){
        image.userMail = userMail;
    }

    // TODO: need to check tag saving functionality.
    // I don't think about duplication. it's too tired, and I have no time.
    if(tagIdList){
        if(tagIdList){
            tagIdList = tagIdList.split(",");
            for(var i = 0; i < tagIdList.length; i++){
                var tag = new Tag();
                tag.name = tagIdList[i];
                tag.save(function(err){});
                image.tagIdList.append(tag._id);
            }
        }
    }

    image.save(function(err){});

    if(memoryId){
        Memory.findOne({_id: ObjectId(memoryId)}).exec(function(err, data){
            data.imageIdList.push(image._id);
            data.save(function(err){});
        });
    }
    // end image save

    sendMessage.status = true;
    // see: https://stackoverflow.com/questions/31021343/add-to-an-object-to-population-in-a-mongoose-model
    res.send(sendMessage);
});// END: router.post("/add-image-to-the-memory", checkJwt, function(req, res, next)


// api when save new memory page
router.post("/add-memory", checkJwt, function(req, res, next){
    var memoryTitle = req.body.memoryTitle;
    var memoryDescription = req.body.memoryDescription;
    var memoryCountry = req.body.memoryCountry;
    var memoryCities = req.body.memoryCities;
    memoryCities = memoryCities.split(", ");
    var userId = req.body.userID;

    const Memory = require("../model/Memory");
    const User = require("../model/Old-save/User");
    var mem = new Memory();
    mem.name = memoryTitle;
    mem.country = memoryCountry;
    mem.city = memoryCities;
    mem.description = memoryDescription;
    mem.imageIdList = [];
    User.findOne({ "name": userId}, function(err, user){
        if(err) return err;
        mem.userMail = user._id;
        mem.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Memory Saved!");
            }
        });
        res.send(JSON.stringify({s: "Success"}));
    })
});

// TODO: api to search certain tag
// TODO: api to search certain duration between 2 date info.


router.post('/add-note', checkJwt, function(req, res, next){
    var title = req.body.noteTitle;
    var content = req.body.noteCont;
    var desc = req.body.noteDesc;
    var tags = req.body.tags;

    var bIsTagEmpty = false;
    if(tags){
        bIsTagEmpty = true;
        tags = tags
        .split(", ")
        .map(function(b){
            return b.substr(1);
        });
    }else{
        bIsTagEmpty = true;
        tags = ["noTag"];
    }
    var share = req.body.sharePref;
    var type = req.body.noteType;
    if(share){
        var shareUser = req.body.shared;
        shareUser = shareUser.split(", ").map(function(b){
            return b;
        });
        var bIsSharedListEmpty;
        if(shareUser.length === 1 && shareUser[shareUser.length - 1].length === 0){
            bIsSharedListEmpty = true;
            share = false;
        }else{
            bIsSharedListEmpty = false;
            share = true;
        }
    }
    var shareUserIdList = [];
    var userId = req.body.userID;
    var lastEditId = req.body.userID;

    var Tag = require("../model/Tag");
    var User = require("../model/Old-save/User");
    var tagPromise = Promise.resolve(Tag.find());
    var userPromise = Promise.resolve(User.find());
    Promise.all([tagPromise, userPromise]).then(
        function(result){
            var tagList = result[0];
            var userList = result[1];

            function findTagByTagName(tagName){
                var result = tagList.filter(function(tagObject){
                    var result = false;
                    if(tagObject.tagName.indexOf(tagName) != -1){
                        result = true;
                    }
                    return result;
                });
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = {_id: undefined};
                }
                return result;
            }

            function findUserByUserName(userName){
                var result = userList.filter(function(userObject){
                    var result = false;
                    if(userObject.name.indexOf(userName) != -1){
                        result = true;
                    }
                    return result;
                });

                if(result.length > 0){
                    result = result[0];
                }else{
                    result = {};
                    result._id = undefined;
                }
                return result;
            }

            function findUserByNickName(userName){
                var result = userList.filter(function(userObject){
                    var result = false;
                    if(userObject.nickname.indexOf(userName) != -1){
                        result = true;
                    }
                    return result;
                });
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = {};
                    result._id = undefined;
                }
                return result;
            }

            function getTagIdList(tagList){
                var result = [];
                for(var i = 0; i < tagList.length; i++){
                    result.push({tagName: tagList[i], saveState: getTagId(tagList[i])});
                }
                var newIds = saveNewTag(result);
                result = result.filter(o => o.saveState !== null);
                result = result.concat(newIds);
                return result;
            }

            var isSet = require("../util/isSet");

            function getTagId(tagName){
                return isSet(findTagByTagName(tagName)._id, null);
            }

            function saveNewTag(tagsIdList){
                var newIds = [];
                var newPromise = []
                for(var i = 0; i < tagsIdList.length; i++){
                    var tag = new Tag();
                    if(tagsIdList[i].saveState == null){
                        newIds.push({tagName: tagsIdList[i].tagName, saveState: tag._id});
                        tag.tagName = tagsIdList[i].tagName;
                        tag.save(function(err){
                        });
                    }
                }
                return newIds;
            }

            if(!bIsTagEmpty){
                var tagsIdList = getTagIdList(tags);
                var tagSaveList = tagsIdList.map(function(col){
                    return col.saveState;
                });
            }else{
                tagSaveList = [];
            }
            userId = findUserByUserName(userId)._id;
            if(share){
                shareUser.forEach(element =>{
                    shareUserIdList.push({userId: findUserByNickName(element)._id, r: true, w: false});
                });
            }else{
                shareUserIdList = [];
            }
            var newNoteId = addNote(tagSaveList, shareUserIdList, title, content, desc, share, type, userId, userId);

            if(!bIsTagEmpty){
                for(var i = 0; i < tagSaveList.length; i++){
                    Tag.update({"_id": ObjectId(tagSaveList[i])}, {$push: {noteId: newNoteId}}, function(err){
                        if(err){
                            console.log("Something gone wrong");
                        }else{
                            console.log("Success!!");
                        }
                    });
                }
            }
            res.send(JSON.stringify({s: "Success"}));
        });

});

function addNote(tagsList, shareUserList, title, content, desc, share, type, userId, lastEdit){
    const Note = require("../model/Old-save/Note");
    var note = new Note();
    note.userId = userId;
    note.finalEditUserId = lastEdit;
    note.title = title;
    note.content = content;
    note.description = desc;
    note.tags = tagsList;
    note.share = share;
    note.shareUser = shareUserList;
    note.type = type;

    note.save(function(err){
        if(err){
            console.log("something else");
            console.log(err);
        }else{
            console.log("save all note data correctly");
        }
    });
    return note._id;
}

module.exports = router;
