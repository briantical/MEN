import _ from 'lodash';
import { sendCreated } from '../../middleware/index';

const create = ({ Car }: any) => async (req: any, res: any, next: (arg0: any) => void) => {
  try {
    const userId = req.user.id;
    const car = new Car({ userId });
    _.extend(car, req.body);

    await car.save();
    return sendCreated(res, { car });
  } catch (error) {
    next(error);
  }
};

export default create;
