var express = require('express');
var router = express.Router();
const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');
var ObjectId = require('mongoose').Types.ObjectId;

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

// delete note by id
router.post("/delete", checkJwt, function(req, res, next){
    var mongoose = require("mongoose");
    var noteId = req.body.noteId;
    console.log("detect delete" ,noteId);
    // var userId = mongoose.Types.ObjectId(req.body.userId);//
    var Note = require("../model/Old-save/Note");
    Note.findOneAndRemove({_id: noteId}, (err, db) =>{
        // console.log("find it",db);


        let response = {
            message: "successfully deleted"
        };
        res.status(200).send(response);
    });
});

// get api to show all note in main panel.
router.post('/all-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body).then(function(userId){
        if(userId){// user exist
            getContent("all", userId.toString()).then(
                function(result){
                    // console.log("check data before send: ", result);

                    res.send({content:result, currentUserId: userId});
                }
            ).catch(function(err){
                console.log("something wrong:" + err);
                res.send("wrong flg");
            });
        }else{
            res.send("wrong flg");
        }
    });
});// END: router.get('/all-note', checkJwt, function(req, res, next)


router.post('/search-note', checkJwt, function(req, res, next){
    //console.log(req.body.val);
    var getContent = require("../util/getSearchContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body.profile).then(function(userId){
        if(userId){// user exist
            //console.log("The VALUE"+req.body.val);
            getContent(req.body.value, userId.toString()).then(
                function(result){
                    // console.log("check data before send: ", result);
                    res.send({content:result, currentUserId: userId});
                }
            ).catch(function(err){
                console.log("something wrong:" + err);
                res.send("wrong flg");
            });
        }else{
            res.send("wrong flg");
        }
    });
});// END: router.get('/all-note', checkJwt, function(req, res, next)

// get api to show my note in main panel.
router.post('/my-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body).then(function(userId){
        if(userId){// user exist
            getContent("my", userId.toString()).then(
                function(result){
                    // console.log("check data before send: ", result);

                    res.send({content:result, currentUserId: userId});
                }
            ).catch(function(err){
                console.log("something wrong:" + err);
                res.send("wrong flg");
            });
        }else{
            res.send("wrong flg");
        }
    });
});// END: router.get('/my-note', checkJwt, function(req, res, next)

router.post('/add-note', checkJwt, function(req, res, next){
    var title = req.body.noteTitle;
    var content = req.body.noteCont;
    var desc = req.body.noteDesc;
    var tags = req.body.tags;
    
    var bIsTagEmpty = false;
    if (tags) {
        bIsTagEmpty = true;
        tags = tags
            .split(", ")
            .map(function (b) {
                return b.substr(1);
            });
    } else {
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
        if(shareUser.length === 1 && shareUser[shareUser.length-1].length === 0){
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
                        tag.save(function(err){});
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
                for(var i = 0; i < tagSaveList.length; i ++){
                    Tag.update({"_id": ObjectId(tagSaveList[i])}, { $push: { noteId: newNoteId } }, function(err){
                        if(err){
                            console.log("Something gone wrong");
                        }else{
                            console.log("Success!!");
                        }
                    });
                }
            }
            res.send(JSON.stringify({s:"Success"}));
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
