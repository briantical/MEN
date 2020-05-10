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
const jsonfile = require('jsonfile');
const path = require('path');
const addCatalogs = () => __awaiter(void 0, void 0, void 0, function* () {
    // const count = await Models.find({}).count();
    // if (!count) {
    const file = path.resolve(__dirname, './private/assets', './model.json');
    jsonfile.readFile(file, (err, catalogsJSON) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        for (let index = 0; index < catalogsJSON.length; index++) {
            // const model = new Model(catalogsJSON[index]);
            // await model.save();
        }
    }));
    // }
});
const onAppStart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield addCatalogs();
    }
    catch (error) {
        console.log('---> on start Error: ');
        console.log(error);
    }
});
module.exports = { onAppStart };
