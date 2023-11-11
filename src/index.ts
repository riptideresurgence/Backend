import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {createServer} from "http";

import * as core from "@riptide/core"; // we import the core for the sole purpose of connecting to database
import * as discordBot from "@riptide/discordbot";

__dirname = path.dirname(module.filename || process.execPath);
if (fs.existsSync(path.join(__dirname, '../config/.env'))) {
	dotenv.config({ path: path.join(__dirname, "../config/.env") });
}

// Get environment variables
const mongodbUri = process.env["MONGODB_URI"];
const discordBotToken = process.env["DISCORD_BOT_TOKEN"];
const discordBotClientId = process.env["DISCORD_BOT_CLIENT_ID"];
const discordBotPrefix = process.env["DISCORD_BOT_PREFIX"] || ";";

if (!mongodbUri) {
    throw new Error("Backend: No MONGODB_URI found in environment.");
}
if (!discordBotClientId) {
    throw new Error("Backend: No DISCORD_BOT_CLIENT_ID found in environment.");
}
if (!discordBotToken) {
    throw new Error("Backend: No DISCORD_BOT_TOKEN found in environment.");
}

// Keep alive
createServer((req, res) => {
    res.write("hi nothing is in here");
    res.end();
}).listen(8080);

// Initialize things
core.database.connect(mongodbUri, undefined);
discordBot.createClient(discordBotPrefix, discordBotClientId, discordBotToken);