"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
//# sourceMappingURL=users.schema.js.map