import _ from 'lodash';
import { sendUpdated } from '../../middleware/index';

const update = ({ Car }: any) => async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { _id } = req.params;
    const car = await Car.findOne({ _id, userId });
    _.extend(car, req.body);

    await car.save();
    return sendUpdated(res, { car });
  } catch (error) {
    next(error);
  }
};

export default update;
