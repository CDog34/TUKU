import http from 'http';
import stream from 'stream';
import {Image} from '../models/imageModel';
import config from '../config';
import {MarkerResolver} from '../services/paginationService';

export async function listMyImageHistory(userId,paginationSpec) {
  const resolver = new MarkerResolver(Image, paginationSpec);
  return await resolver.find({ownerId: userId, isActive: true},null,{sortKey: '_id', sortOrder: -1});
}

export async function listAllImages(paginationSpec) {
  const resolver = new MarkerResolver(Image, paginationSpec);
  return await resolver.find({}, null, {sortKey: '_id', sortOrder: -1});
}
export async function getOneActiveImage(id) {
  return await Image.findOne({_id: id, isActive: true});
}

export async function deleteUserImage(imageId, user, isHardMode) {
  const img = await Image.findOne({_id: imageId, isActive: true});
  if (!img) throw 'No Image';
  if (img.ownerId !== user._id) throw 'Not You';
  if (!isHardMode) {
    img.isActive = false;
    return await img.save();
  } else {
    return await img.remove();
  }
}

export async function relayImage(imagePath, koaCtx) {
  const option = {
    hostname: config.CDNBase,
    path: `/${imagePath}`,
    method: 'GET'
  };
  return await new Promise((resolve, rej) => {
    const req = http.request(option, (res) => {
      koaCtx.set(res.headers);
      koaCtx.set('X-Image-Path', imagePath);
      koaCtx.body = res.pipe(stream.PassThrough());
      resolve();
    });
    req.on('error', (err) => {
      rej(err);
      console.log('[Dbg.jq:err]:', err);
    });

    req.end();
  })

}

