/**
 * Created by CDog on 15/10/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pictureSchema = new Schema({

    key :  String,
    realAddress:String,
    createDate:{type: Date, default: new Date()},
    picView : Number
});

pictureSchema.index({key:1});

pictureSchema.statics.addOne=function(data,cbk){
    var newDoc=new pictureSchema({
        key:data.key,
        realAddress:data.realAddress,
        picView:0
    });
    newDoc.save(cbk);
}

pictureSchema.statics.getResent= function (number,cbk) {
    this.find({},{$inc:{picView:1}})
        .limit(number)
        .exec(cbk);

};




module.exports=pictureSchema;