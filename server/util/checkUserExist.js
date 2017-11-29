/**
 * Created by reiven on 2017/11/09.
 */
function UserExist(profile){
    var User = require("../model/User");
    return Promise.resolve(User.find({name: profile.name, nickname: profile.nickname}).then(
        function(result){
            if(result.length === 1){
                return result[0]._id;
            }else{
                return false;
            }
        }, function(reason){
            return false;
        }
    ));
}

module.exports = UserExist;