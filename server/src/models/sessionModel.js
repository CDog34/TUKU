import mongoose from 'mongoose';

export const CategoryEnum = {
  WEIBO: 100
};

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true
  },
  token: {
    type: String,
    index: true
  },
  validUntil: {
    type: Number,
    default: Date.now
  },
  category: {
    type: Number,
    index: true
  },
});

sessionSchema.statics.getSession = async function (sessionId, token) {
  const res = await this.findOne({_id: sessionId, token: token});
  if (!res) return null;
  if (res.validUntil < Date.now()) {
    await res.remove();
    return null;
  }
  return res;
};

export const Session = mongoose.model('Session', sessionSchema, 'Session');
