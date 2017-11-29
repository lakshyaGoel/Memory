/**
 * Created by reiven on 2017/11/08.
 */

function generateDemoUser(){
    console.info("generate demo User data");
    var User = require("../model/User");
    var userName = ["nakam052@umn.edu", "Pico Taro", "Kosaka Daimaou", "Ninja Slayer", "Serval Chan", "One-Punch man", "Saitama", "Lil Wayne", "Kanye West", "Ty Dolla Sign", "Tinashe"];
    var errorCount = 0;
    for(var i = 0; i < userName.length; i++){
        var user = new User();
        user.img = "./religious_otter.jpg";// dummy image url
        user.name = userName[i];
        user.nickname = userName[i].split(" ")[0];
        user.save(function(err){
            if(err){
                errorCount += 1;
            }
        });
    }
    console.log("error while generateDemoUser: " + errorCount);
}

function generateDemoTag(){
    console.info("generate demo Tag data");
    var Tag = require("../model/Tag");
    var tagList = ["PPAP", "Comedian", "Anime", "Addictive", "Song", "Rap", "Hip-Hop", "Homecoming Concert", "Strong", "Hero"];
    var errorCount = 0;
    for(var i = 0; i < tagList.length; i++){
        var tag = new Tag();
        tag.tagName = tagList[i];
        tag.save(function(err){
            if(err){
                errorCount += 1;
            }
        });
    }
    console.log("error while generateDemoTag: ", errorCount);
}

function generateNote(){
    /**
     * first, get Tag data
     * second, get User data
     * then, generate note data with Tag data and User data.
     * when I need Tag and User data?
     *      - userId, tags, shareUser, like, dislike
     */
    var Tag = require("../model/Tag");
    var User = require("../model/User");
    var tagPromise = Promise.resolve(Tag.find());
    var userPromise = Promise.resolve(User.find());
    Promise.all([tagPromise, userPromise]).then(
        function(result){
            var tagList = result[0];
            var userList = result[1];
            // console.log("tagList: ",tagList);
            // console.log("userList: ",userList);
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

            var Note = require("../model/Note");

            function generateNoteParts(title, content, currentCallNumber){
                var result = new Note();
                result.content = content;
                result.title = title;
                var tempContent = result.content.split(" ");
                result.description = (tempContent.length > 5)? tempContent.slice(0,5).join(" "): tempContent.join(" ");
                result.share = (currentCallNumber%2 == 1);
                result.type = (currentCallNumber %3 == 0)? "code": "note";
                result.codeSetting = {mode: "JavaScript", theme: "Github", autoComplete: true, lineNumber: true};
                result.tags = [];
                result.shareUser = [];
                result.like = [];
                result.dislike = [];
                return result;
            }

            var isSet = require("./isSet");

            function getTagId(tagName){
                return isSet(findTagByTagName(tagName)._id, null);
            }

            function getTagIdList(tagList){
                var result = [];
                for(var i = 0; i < tagList.length; i++){
                    result.push(getTagId(tagList[i]));
                }
                return result;
            }

            function getSharedUserItem(userName){
                var result = {};
                var userData = findUserByUserName(userName);
                // console.log(userData);
                if(isSet(userData._id, false)){
                    result.userId = userData._id;
                    result.r = true;
                    result.w = true;
                }
                return result;
            }

            function getSharedUserList(userNameList){
                var result = [];
                for(var i = 0; i < userNameList.length; i++){
                    result.push(getSharedUserItem(userNameList[i]));
                }
                return result;
            }

            function getLikeDislikeUserItem(userName){
                var result = {};
                var userData = findUserByUserName(userName);
                // console.log("like dislike insde: ",userData);
                if(isSet(userData._id, false)){
                    result.userId = userData._id;
                    result.createdAt = new Date();
                }
                return result;
            }

            function getLikeDislikeUserList(userNameList){
                var result = [];
                for(var i = 0; i < userNameList.length; i++){
                    result.push(getLikeDislikeUserItem(userNameList[i]));
                }
                return result;
            }

            var note1 = generateNoteParts("PPAP", "I have a pen, I have an apple, Oh! Apple Pen. I have a pen, I have pinnaple. Oh! Pinnaple Pen, Apple Pen. Pineapple Pen! Oh! Pen Pineapple Apple Pen!", 0);
            var note2 = generateNoteParts("One Punch", "My name is Saitama. I'm a hero. I could kill every bad guys with only one punch.", 1);
            var note3 = generateNoteParts("The important thing", "Ninja were...merciless demi-gods, ruling Japan with their karate in the age of ninja tranquility.But, “some” committed a forbidden form of hara-kiri storing their souls at Kinkaku Temple for future resurrection.Their lost history was falsified and concealed and the truth about these ninja was long forgotten..", 2);
            var note4 = generateNoteParts("Welcome to Japari-park", "Tanoshiiii! Sugoo! Servel Chan!", 3);
            var note5 = generateNoteParts("or nah", "Is you really 'bout your money or nah? Can you really take dick or nah? Can I bring another bitch or nah? Is you with the shits or nah?", 4);
            var note6 = generateNoteParts("Sucker for Pain", "I torture you Take my hand through the flames I torture you ", 5);
            var note7 = generateNoteParts("2 On", "Man, I love to get on I love to get 2 on When the drink be too strong When the tree be way too strong", 6);
            var note8 = generateNoteParts("From Time", "Cause I love me, I love me enough for the both of us That's why you trust me, I know you've been through more than most of us So what are you? What are you, what are you so afraid of? Darling you, you give but you cannot take love", 7);
            var note9 = generateNoteParts("Low Life", "I just took some molly, what else?Got some bitch from Follies with us She gonna fuck the squad, what else? I'mma fuck her broads, what else? ", 8);

            note1.tags = getTagIdList(["PPAP", "Comedian", "Addictive", "Song"]);
            note2.tags = getTagIdList(["Anime", "Strong", "Hero"]);
            note3.tags = getTagIdList(["Anime", "Addictive", "Hero"]);
            note4.tags = getTagIdList(["Anime", "Addictive"]);
            note5.tags = getTagIdList(["Song", "Addictive", "Hip-Hop", "Homecoming Concert"]);
            note6.tags = getTagIdList(["Song", "Addictive", "Hip-Hop"]);
            note7.tags = getTagIdList(["Song", "Addictive", "Homecoming Concert"]);
            note8.tags = getTagIdList(["Song", "Addictive", "Hio-Hop"]);
            note9.tags = getTagIdList(["Song", "Addictive", "Hio-Hop"]);

            note1.userId = findUserByUserName("nakam052@umn.edu")._id;
            note2.userId = findUserByUserName("nakam052@umn.edu")._id;
            note3.userId = findUserByUserName("nakam052@umn.edu")._id;
            note4.userId = findUserByUserName("nakam052@umn.edu")._id;
            note5.userId = findUserByUserName("nakam052@umn.edu")._id;

            note1.shareUser = getSharedUserList(["nakam052@umn.edu", "Pico Taro", "Kosaka Daimaou"]);
            note2.shareUser = getSharedUserList(["nakam052@umn.edu", "One-Punch man", "Saitama"]);
            note3.shareUser = getSharedUserList(["nakam052@umn.edu", "Ninja Slayer"]);
            note4.shareUser = getSharedUserList(["nakam052@umn.edu", "Serval Chan"]);
            note5.shareUser = getSharedUserList(["nakam052@umn.edu", "Ty Dolla Sign"]);
            note6.shareUser = getSharedUserList(["nakam052@umn.edu", "Lil Wayne", "Ty Dolla Sign"]);
            note7.shareUser = getSharedUserList(["nakam052@umn.edu", "Tinashe"]);
            note8.shareUser = getSharedUserList(["nakam052@umn.edu"]);
            note9.shareUser = getSharedUserList([]);

            note1.like = getLikeDislikeUserList(["Pico Taro", "Kosaka Daimaou"]);
            note2.like = getLikeDislikeUserList(["nakam052@umn.edu", "Pico Taro", "Kosaka Daimaou"]);
            note3.like = getLikeDislikeUserList(["nakam052@umn.edu"]);

            note4.dislike = getLikeDislikeUserItem(["Kosaka Daimaou"]);

            note1.save(function(err){});
            note2.save(function(err){});
            note3.save(function(err){});
            note4.save(function(err){});
            note5.save(function(err){});
            note6.save(function(err){});
            note7.save(function(err){});
            note8.save(function(err){});
            note9.save(function(err){});
        }
    );// END: Promise.all([tagPromise, userPromise])
}

function generateDemoData(){
    generateNote();
    // var generateUserPromise = Promise.resolve(generateDemoUser());
    // var generateTagPromise = Promise.resolve(generateDemoTag());
    // Promise.all([generateUserPromise, generateTagPromise]).then(
    //     generateNote()
    // );
}

module.exports = generateDemoData;