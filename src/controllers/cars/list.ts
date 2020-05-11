import { sendList } from '../../middleware/index';
import { queryToObject } from '../../utils/requests';

const list = ({ Cars }: any, { config }: any) => async (
  req: { query: { [x: string]: any } },
  res: any,
  next: (arg0: any) => void
) => {
  try {
    let { search, limit, skip, lat, lng, distance } = queryToObject(req.query);

    skip = skip ? parseInt(skip, 10) : 0;
    limit = parseInt(limit, 10);
    limit = limit && limit < config.maxLimitPerQuery ? limit : config.maxLimitPerQuery;

    const query = { $and: [] };
    if (search) {
      query.$and.push({ $or: new Cars().fieldsToSearch(search) as never } as never);
    }
    // if need work with cords
    if (lat && lng) {
      query.$and.push({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lat), parseFloat(lng)] } as never,
            $maxDistance: (parseFloat(distance) || 10) as never
          } as never
        } as never
      } as never);
    }

    const count = await Cars.find(query).count();
    const businesses = await Cars.find(query)
      //.sort({ : 1 })
      .skip(skip)
      .limit(limit);

    return sendList(res, { businesses, count });
  } catch (error) {
    next(error);
  }
};

export default list;
