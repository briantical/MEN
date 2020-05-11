import { sendAccepted } from '../../middleware';

const signOut = (req: any, res: any) => {
  req.logOut();
  sendAccepted(res)();
};

export default signOut;
