import mongoose from 'mongoose';
import schema from './schema';
import { fieldToSearch } from '../../utils/mongo/helpers';

schema.methods.fieldsToSearch = (search: any) => ['model'].map(fieldToSearch(search));

const Car = mongoose.model('Car', schema);
export default Car;
