import mongoose from 'mongoose';

export const RoleEnum = {
  USER: 100,
  ADMIN: 200
};


const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  weiboUid: {
    type: String,
    index: true
  },
  avatarUrl: String,
  description: String,
  isActive: {
    type: Boolean,
    index: true,
    default: true
  },
  role: {
    type: Number,
    default: RoleEnum.USER
  },
  updateAt: {
    type: Number,
    default: Date.now
  }
});

userSchema.statics.createFromWeiboProfile = async function (weiboProfile) {
  const uid = weiboProfile.idstr || weiboProfile.id;
  let user = await this.findOne({weiboUid: uid});
  if (!user) {
    user = new this();
    user.weiboUid = uid;
  }
  user.name = weiboProfile.name || weiboProfile['screen_name'];
  user.avatarUrl = weiboProfile['avatar_hd'] || weiboProfile['avatar_large'] || weiboProfile['profile_image_url'];
  user.description = weiboProfile.description;
  await user.save();
  return user;
};

export const User = mongoose.model('User', userSchema, 'User');
