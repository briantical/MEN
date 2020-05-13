import { withoutErrors } from '../../middleware';
const { NotAcceptable } = require('rest-api-errors');
import { PASSWORD } from '../../utils/regexes';

const signUp = ({ User }: any) => async (req: any, res: any, next: any) => {
  try {
    const { email, password, fullName } = req.body;

    if (!PASSWORD.test(password)) {
      return next(new NotAcceptable(406, 'Password is in wrong format.'));
    }

    const user = new User({
      email: email,
      profile: {
        fullName
      }
    });

    await User.register(
      user,
      password,
      withoutErrors(next, () => next(res))
    );
  } catch (error) {
    console.log(error);
  }
};

export default signUp;
