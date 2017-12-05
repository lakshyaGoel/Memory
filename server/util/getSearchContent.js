/**
 * Created by reiven on 2017/11/08.
 * This file is to write the function
 * which help to get the note content for main page.
 */

/**
 * what I need
 *
 * connect Note,
 * - manage flag(all/share/my)
 * - query that.
 */

var mongoose = require("mongoose");
function getSearchContent(param, userId){
    // console.log("find user ",userId);
    //console.log(this.);
    //console.log("Parameter Passed is :"+ param);
    const Note = require("../model/Old-save/Note");
    var query = {};
    userId = mongoose.Types.ObjectId(userId);

    query = {
        $and: [
                {title : { $regex : new RegExp(param, "i") }},
                {"userId": userId}
        ]
    }
    
    // console.log(query);
    // TODO: Tag data join,
    const Tags = require("../model/Tag");


    var result = Tags.find().then(function(tagDb){
        function getTagObjectById(tagId){
            var result = tagDb.filter(function(tagObject){
                // console.log("tag all",String(tagObject._id), "\t tagId:", tagId);
                // console.log(String(tagObject._id) == tagId);
                if(String(tagObject._id) == tagId){
                    return true;
                }else{
                    return false;
                }
            });
            // console.log("Tag DB find By Id", result);

            if(result.length > 0){
                return result[0];
            }else{
                return {"tagName": ""};
            }
        }

        function getTagNameById(tagId){
            return getTagObjectById(tagId).tagName;
        }

        function getTagNamesByIdList(tagIdList){
            var result = [];
            for(var i = 0; i < tagIdList.length; i++){
                var name = getTagNameById(tagIdList[i]);
                if(name !== ""){
                    result.push(name);
                }
            }
            return result;
        }

        var noteDB = Note.find(query).lean().then(function(noteDb){
            for(var i = 0; i < noteDb.length; i++){
                // console.log(noteDb[i].tags);
                noteDb[i]["tagNameList"] = getTagNamesByIdList(noteDb[i].tags);
                // console.log("add tagNameList",noteDb[i]);
            }
            return noteDb.reverse();
        });
        return noteDB;
    });
    return Promise.resolve(result);
}

module.exports = getSearchContent;