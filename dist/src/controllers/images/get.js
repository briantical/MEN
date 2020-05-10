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
const { isString } = require('lodash');
const get = ({ Image }) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (isString(_id)) {
        res.send(null);
        return;
    }
    try {
        const image = yield Image.findOne({ _id });
        res.contentType(image.mimetype);
        res.end(image.data, 'binary');
    }
    catch (error) {
        next(error);
    }
});
module.exports = get;
