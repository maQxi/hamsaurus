import { SlashCommandBuilder } from "discord";

export const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
},