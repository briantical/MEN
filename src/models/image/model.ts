import mongoose from 'mongoose';
import schema from './schema';

const Image = mongoose.model('Image', schema);
export default Image;
