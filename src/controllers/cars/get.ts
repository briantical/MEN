import { sendOne } from '../../middleware/index';

const get = ({ Car }: any) => async (req: any, res: any, next: (arg0: any) => void) => {
  try {
    const userId = req.user.id;
    const { _id } = req.params;
    const car = await Car.findOne({ _id, userId });
    return sendOne(res, { car });
  } catch (error) {
    next(error);
  }
};

export default get;
