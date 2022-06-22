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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const test = require('../index');
const supertest = require('supertest');
const request = supertest(__1.default);
it("should get the image uploaded in to the disk with mulger", () => {
    const data = test.multer.diskStorage;
    expect(data).toBeDefined();
});
it('should call imageResized on load', () => __awaiter(void 0, void 0, void 0, function* () {
    yield request.post('/images', function (error, response, body) {
        expect(request.statusCode).toBe(200);
        //const resizeSpy =test.sharp   
        //expect(resizeSpy).toBeDefined()
    });
}));
