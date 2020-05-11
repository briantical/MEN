import _ from 'lodash';
import { sendOne } from '../../middleware/index';
const { MethodNotAllowed } = require('rest-api-errors');

const signIn = ({ User }: any) => async (
  req: { user: { id: any }; body: { email: any } },
  res: any,
  next: (arg0: any) => void
) => {
  try {
    const user = await User.findById(req.user.id);
    const { email } = req.body;
    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    _.extend(user, {
      email: email
    });

    await user.save();
    return sendOne(res, { user });
  } catch (error) {
    next(error);
  }
};

export = signIn;
