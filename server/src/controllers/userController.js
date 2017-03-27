import {User} from '../models/userModel';

export async function createOrUpdateUserFromWeibo(weiboProfile) {
  return await User.createFromWeiboProfile(weiboProfile);
}