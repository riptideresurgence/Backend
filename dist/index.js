"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const core = __importStar(require("@riptide/core")); // we import the core for the sole purpose of connecting to database
const discordBot = __importStar(require("@riptide/discordbot"));
__dirname = path_1.default.dirname(module.filename || process.execPath);
if (fs_1.default.existsSync(path_1.default.join(__dirname, '../config/.env'))) {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../config/.env") });
}
// Get environment variables
const mongodbUri = process.env["MONGODB_URI"];
const discordBotToken = process.env["DISCORD_BOT_TOKEN"];
const discordBotPrefix = process.env["DISCORD_BOT_PREFIX"] || ";";
if (!mongodbUri) {
    throw new Error("Backend: No MONGODB_URI found in environment.");
}
if (!discordBotToken) {
    throw new Error("Backend: No DISCORD_BOT_TOKEN found in environment.");
}
// Initialize things
core.database.connect(mongodbUri, undefined);
discordBot.createClient(discordBotPrefix, discordBotToken);
