import {
  APIChatInputApplicationCommandDMInteraction,
  APIChatInputApplicationCommandInteraction,
  APIChatInputApplicationCommandInteractionData,
  APIInteraction,
} from "discordTypes";

export const getXp = (data: APIChatInputApplicationCommandInteractionData) => {
  // return 5 xp and name of user
  const { value } = data.options.find((option) => option.name === "name");
  return {
    type: 4,
    data: {
      content: `Hello, ${value}! You have 5 xp!`,
    },
  };
};
