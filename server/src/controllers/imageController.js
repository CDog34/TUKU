import {Image} from '../models/imageModel';

export async function listMyImageHistory(userId) {
  return await Image.find({ownerId: userId, isActive: true}).sort({updateAt: -1});
}

export async function listAllImages() {
  return await Image.find({}).sort({updateAt: -1});
}