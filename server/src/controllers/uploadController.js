import config from '../config';
import {uploadFile, md5sumFile, getImageSize} from '../services/uploadService';
import {Image} from '../models/imageModel';
import _ from 'lodash';


export async function getImageRatio(img) {
  if (img.heightWidthRatio) return null;
  const res = await getImageSize(img.remoteKey);
  const heightWidthRatio = res.height / res.width;
  await Image.update({_id: img._id}, {$set: {heightWidthRatio}});
}

export async function handleImageUpload(image, userId) {
  const checkSum = await md5sumFile(image);
  let doUpload = true;

  const existImages = await Image.findByMd5sum(checkSum);
  let existImage = null;
  if (!!existImages && existImages.length) {
    const userIdStr = !!userId ? userId.toString() : undefined;
    existImage = _.find(existImages, (img) => img.ownerId === userIdStr);
    if (existImage)
      return {
        image: existImage,
        CDNBase: config.CDNBase
      };
    doUpload = false;
    existImage = existImages[0];
  }
  const newImage = new Image();
  newImage.name = encodeURIComponent(image.name);
  newImage.md5sum = checkSum;
  newImage.ownerId = userId;
  if (doUpload) {
    const res = await uploadFile(image,{contentSecret:checkSum});
    newImage.remoteKey = res.remoteKey;
  } else {
    newImage.remoteKey = existImage.remoteKey;
    newImage.heightWidthRatio = existImage.heightWidthRatio;
  }
  await newImage.save();
  if (!newImage.heightWidthRatio) getImageRatio(newImage);
  return {
    image: newImage,
    CDNBase: config.CDNBase
  };
}