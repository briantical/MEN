import { sendAccepted, withoutErrors } from '../../middleware';
const { MethodNotAllowed, NotAcceptable } = require('rest-api-errors');
import { PASSWORD } from '../../utils/regexes';

const signIn = ({ User }: any) => async (req: any, res: any, next: any) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, newPassword } = req.body;
    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    if (!PASSWORD.test(newPassword)) {
      throw new NotAcceptable(406, 'Password is in wrong format.');
    }
    user.changePassword(
      password,
      newPassword,
      withoutErrors(next, () => sendAccepted(res)())
    );
  } catch (error) {
    next(error);
  }
};

export default signIn;
