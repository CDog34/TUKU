/**
 * Created by CDog on 15/10/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pictureSchema = new Schema({

    key :  String,
    realAddress:String,
    createDate:{type: Date, default: Date.now()},
    canView : {type:Boolean,default:true}
});


pictureSchema.statics.getResent= function (number,cbk) {
    picture.find({canView:true})
        .sort({_id:-1})
        .limit(number)
        .exec(cbk);

};




var picture=mongoose.model("picture",pictureSchema);

module.exports=picture;