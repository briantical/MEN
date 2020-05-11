import { sendOne } from '../../middleware';

const signIn = (req: any, res: any) => {
  const { token, user } = req;
  return sendOne(res, { user, token });
};

export default signIn;
