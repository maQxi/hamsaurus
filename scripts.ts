import "$std/dotenv/load.ts";
const token = Deno.env.get("BOT_TOKEN")!;
const clientId = Deno.env.get("DISCORD_CLIENT_ID")!;
const url =
  "https://discord.com/api/v10/applications/" + clientId + "/commands";

export const createCommand = (json) => {
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

createCommand({
  name: "blop",
  type: 1,
  description: "Send a random adorable animal photo",
  options: [
    {
      name: "animal",
      description: "The type of animal",
      type: 3,
      required: true,
      choices: [
        {
          name: "Dog",
          value: "animal_dog",
        },
        {
          name: "Cat",
          value: "animal_cat",
        },
        {
          name: "Penguin",
          value: "animal_penguin",
        },
      ],
    },
    {
      name: "only_smol",
      description: "Whether to show only baby animals",
      type: 5,
      required: false,
    },
  ],
});
createCommand({
  name: "ping",
  description: "Replies with pong!",
  type: 1,
});

// get all commands
fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bot ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
