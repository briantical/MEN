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
const { sendAccepted, withoutErrors } = require('../../middleware');
const { MethodNotAllowed, NotAcceptable } = require('rest-api-errors');
const { PASSWORD } = require('../../utils/regexes');
const signIn = ({ User }) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.user.id);
        const { password, newPassword } = req.body;
        if (!user) {
            throw new MethodNotAllowed(405, 'Permission denied');
        }
        if (!PASSWORD.test(newPassword)) {
            throw new NotAcceptable(406, 'Password is in wrong format.');
        }
        user.changePassword(password, newPassword, withoutErrors(next, () => sendAccepted(res)()));
    }
    catch (error) {
        next(error);
    }
});
module.exports = signIn;
