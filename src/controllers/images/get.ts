const { isString } = require('lodash');

const get = ({ Image }: any) => async (req: any, res: any, next: any) => {
  const { _id } = req.params;

  if (isString(_id)) {
    res.send(null);
    return;
  }

  try {
    const image = await Image.findOne({ _id });
    res.contentType(image.mimetype);
    res.end(image.data, 'binary');
  } catch (error) {
    next(error);
  }
};

export = get;
