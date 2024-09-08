"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = require("../utils/validators");
const appRouter = (0, express_1.default)();
appRouter.get("/users", controllers_1.getAllUsers);
appRouter.post("/register", (0, validators_1.validate)(validators_1.signupValidator), controllers_1.userSignup);
appRouter.post("/login", (0, validators_1.validate)(validators_1.loginValidator), controllers_1.userLogin);
// appRouter.get("/logout",);
exports.default = appRouter;
//# sourceMappingURL=index.js.map