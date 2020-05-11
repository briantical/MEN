import { sendDeleted } from '../../middleware/index';

const remove = ({ Car }: any) => async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { _id } = req.params;
    const car = await Car.findOne({ _id, userId });
    await Car.remove({ _id, userId });
    return sendDeleted(res);
  } catch (error) {
    next(error);
  }
};

export default remove;
