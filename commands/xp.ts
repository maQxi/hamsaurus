import {
  APIChatInputApplicationCommandDMInteraction,
  APIChatInputApplicationCommandInteraction,
  APIChatInputApplicationCommandInteractionData,
  APIInteraction,
} from "discordTypes";

export const getXp = (
  member: APIChatInputApplicationCommandInteraction["member"]
) => {
  // return 5 xp and name of user
  return {
    type: 4,
    data: {
      content: `Hello, ${member?.user.username}! You have 5 xp!`,
    },
  };
};
