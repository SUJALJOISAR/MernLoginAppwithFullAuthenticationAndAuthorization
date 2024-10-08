"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./db/connection");
//connections and listeners
const PORT = process.env.PORT || 5000;
(0, connection_1.connectToDatabase)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log("server is open in port 5000");
    });
}).catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map