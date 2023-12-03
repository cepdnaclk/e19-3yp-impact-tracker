"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMsg = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
var HttpMsg;
(function (HttpMsg) {
    HttpMsg["OK"] = "Ok";
    HttpMsg["NO_CONTENT"] = "NO CONTENT";
    HttpMsg["BAD_REQUEST"] = "BAD REQUEST";
    HttpMsg["UNAUTHORIZED"] = "UNAUTHORIZED";
    HttpMsg["NOT_FOUND"] = "NOT FOUND";
    HttpMsg["INTERNAL_SERVER_ERROR"] = "INTERNAL SERVERERROR";
    HttpMsg["INVALID_EMAIL"] = "Invalid Email";
    HttpMsg["INVALID_TEAMID"] = "Invalid Team ID";
})(HttpMsg || (exports.HttpMsg = HttpMsg = {}));
