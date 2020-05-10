"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { sendList } = require('../../middleware/index');
const { queryToObject } = require('../../utils/requests');
const list = ({ Cars }, { config }) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, limit, skip, lat, lng, distance } = queryToObject(req.query);
        skip = skip ? parseInt(skip, 10) : 0;
        limit = parseInt(limit, 10);
        limit = limit && limit < config.maxLimitPerQuery ? limit : config.maxLimitPerQuery;
        const query = { $and: [] };
        if (search) {
            query.$and.push({ $or: new Cars().fieldsToSearch(search) });
        }
        // if need work with cords
        if (lat && lng) {
            query.$and.push({
                location: {
                    $near: {
                        $geometry: { type: 'Point', coordinates: [parseFloat(lat), parseFloat(lng)] },
                        $maxDistance: parseFloat(distance) || 10
                    }
                }
            });
        }
        const count = yield Cars.find(query).count();
        const businesses = yield Cars.find(query)
            //.sort({ : 1 })
            .skip(skip)
            .limit(limit);
        return sendList(res, { businesses, count });
    }
    catch (error) {
        next(error);
    }
});
module.exports = { list };
