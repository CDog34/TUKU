import mongoose from 'mongoose';


const imageSchema = new mongoose.Schema({
  name: {
    type: String
  },
  remoteKey: String,
  isActive: {
    type: Boolean,
    index: true,
    default: true
  },
  updateAt: {
    type: Number,
    default: Date.now
  },
  md5sum: {
    type: String,
    index: true
  }
});

imageSchema.statics.findByMd5sum = async function (md5) {
  return await this.findOne({md5sum: md5, isActive: true});
};

export const Image = mongoose.model('Image', imageSchema, 'Image');
