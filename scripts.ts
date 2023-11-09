import { Interaction } from "discord";

const token = Deno.env.get("BOT_TOKEN")!;
const clientId = Deno.env.get("DISCORD_CLIENT_ID")!;
const url =
  "https://discord.com/api/v10/applications/" + clientId + "/commands";

export const createCommand = (json: Interaction) => {
  "https://discord.com/api/v10/applications/<my_application_id>/commands";

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
};
