import mongoose from 'mongoose';
import config from '../config';
import {logDBStartUp} from './loggerService';

export function startDBLink() {
  const url = config.dbUrl;
  const options = {promiseLibrary: global.Promise};
  mongoose.Promise = global.Promise;
  mongoose.connect(url, options, err => logDBStartUp(err));
}
