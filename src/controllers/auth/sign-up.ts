import { withoutErrors } from '../../middleware';
const { NotAcceptable } = require('rest-api-errors');
import { PASSWORD } from '../../utils/regexes';

const signUp = ({ User }: any) => (req: any, res: any, next: any) => {
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

  User.register(
    user,
    password,
    withoutErrors(next, () => next())
  );
};

export default signUp;
