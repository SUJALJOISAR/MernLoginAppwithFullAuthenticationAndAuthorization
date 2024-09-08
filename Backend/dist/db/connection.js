"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.disconnectToDatabase = disconnectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URL).then(() => {
            console.log("DB Connection Successfull");
        });
    }
    catch (error) {
        console.log(error);
    }
}
async function disconnectToDatabase() {
    try {
        await mongoose_1.default.disconnect().then(() => {
            console.log("DB Disconnected Successfully");
        });
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=connection.js.map