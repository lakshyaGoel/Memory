function isSet(param, defaultValue){
    var result = param;
    if(typeof param === "undefined"){
        result = defaultValue;
    }
    return result;
}

 module.exports = isSet;

