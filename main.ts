import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord";
// import { Client } from "npm:discord.js";

import "$std/dotenv/load.ts";

// const commands = [
//   {
//     name: "ping",
//     description: "Replies with Pong!",
//   },
// ];

const token = Deno.env.get("BOT_TOKEN")!;
const clientId = Deno.env.get("DISCORD_CLIENT_ID")!;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "xp") {
    await interaction.reply("Pong!");
  }
});
client.addListener(Events.InteractionCreate, async (interaction) => {
  console.log(interaction, "intera");
});

client.login(token);
const url =
  "https://discord.com/api/v10/applications/" + clientId + "/commands";

const json = {
  name: "xp",
  type: 1,
  description: "Check your xp and rank",
};

fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(json),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
