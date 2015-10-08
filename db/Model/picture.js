/**
 * Created by CDog on 15/10/8.
 */
var pictureSchema=require("../Schema/pictures");
var mongoose=require("mongoose");

var picture=mongoose.model("picture",pictureSchema);

module.exports=picture;
