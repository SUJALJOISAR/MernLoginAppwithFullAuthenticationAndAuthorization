"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv"); // to use the .env file variables and functions we have to import this 
(0, dotenv_1.config)(); //then simply run the config() to use 
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET)); // to directly set the cookies from backend to frontend
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
//for routes
app.use("/api", index_1.default);
exports.default = app;
//start the server using "npm run dev"
//# sourceMappingURL=app.js.map