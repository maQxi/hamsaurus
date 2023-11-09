import { SlashCommandBuilder } from "discord";

export const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");
