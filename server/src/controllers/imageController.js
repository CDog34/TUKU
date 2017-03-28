import {Image} from '../models/imageModel';

export async function listMyImageHistory(userId) {
  return await Image.find({ownerId: userId, isActive: true}).sort({updateAt: -1});
}