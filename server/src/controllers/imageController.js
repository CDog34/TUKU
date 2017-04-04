import {Image} from '../models/imageModel';

export async function listMyImageHistory(userId) {
  return await Image.find({ownerId: userId, isActive: true}).sort({updateAt: -1});
}

export async function listAllImages() {
  return await Image.find({}).sort({updateAt: -1});
}

export async function deleteUserImage(imageId, user) {
  const img = await Image.findOne({_id: imageId, isActive: true});
  if (!img) throw 'No Image';
  if (img.ownerId !== user._id) throw 'Not You';
  img.isActive = false;
  return await img.save();
}