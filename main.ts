// @deno-types="npm:@types/express@4.17.15"
import "$std/dotenv/load.ts";
import express from "express";
import bodyParser from "bodyParser";
import nacl from "npm:tweetnacl";
import { verifyKey, verifyKeyMiddleware } from "npm:discord-interactions";
import { Response, Request, Application } from "npm:@types/express@4.17.15";

const token = Deno.env.get("BOT_TOKEN")!;
const clientId = Deno.env.get("DISCORD_CLIENT_ID")!;
const publicKey = Deno.env.get("DISCORD_PUBLIC_KEY")!;

const app: Application = express();
// app.use(bodyParser.json());

app.post("/", verifyKeyMiddleware(publicKey), async (req, res) => {
  try {
    console.log(req.body, "body");
    const { type = 0, data = { options: [] } } = req.body;

    console.log(data, "data");
    if (type === 1) {
      if (data.name === "ping") {
        return res.json({
          type: 4,
          data: {
            content: "pong!",
          },
        });
      }
      return res.json({
        version: 1,
        type: 3,
        token: "unique_interaction_token",
        message: {
          type: 0,
          tts: false,
          timestamp: "2021-05-19T02:12:51.710000+00:00",
          pinned: false,
          mentions: [],
          mention_roles: [],
          mention_everyone: false,
          id: "844397162624450620",
          flags: 0,
          embeds: [],
          edited_timestamp: null,
          content: "This is a message with components.",
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  label: "Click me!",
                  style: 1,
                  custom_id: "click_one",
                },
              ],
            },
          ],
          channel_id: "345626669114982402",
          author: {
            username: "Mason",
            public_flags: 131141,
            id: "53908232506183680",
            discriminator: "1337",
            avatar: "a_d5efa99b3eeaa7dd43acca82f5692432",
          },
          attachments: [],
        },
        member: {
          user: {
            username: "Mason",
            public_flags: 131141,
            id: "53908232506183680",
            discriminator: "1337",
            avatar: "a_d5efa99b3eeaa7dd43acca82f5692432",
          },
          roles: ["290926798626357999"],
          premium_since: null,
          permissions: "17179869183",
          pending: false,
          nick: null,
          mute: false,
          joined_at: "2017-03-13T19:19:14.040000+00:00",
          is_pending: false,
          deaf: false,
          avatar: null,
        },
        id: "846462639134605312",
        guild_id: "290926798626357999",
        data: {
          custom_id: "click_one",
          component_type: 2,
        },
        channel_id: "345626669114982999",
        application_id: "290926444748734465",
      });
      res.json({ type: 1 });
    }
    if (type === 2) {
      const { value } = data.options.find((option) => option.name === "name");
      return res.json({
        // Type 4 responds with the below message retaining the user's
        // input at the top.
        type: 4,
        data: {
          content: `Hello, ${value}!`,
        },
      });
    } else {
      // Handle other cases as needed
      res.status(400).json({ error: "Invalid type" });
    }
  } catch (e) {
    console.log(e);
    res.status(401).end("invalid request signature");
  }
});

const PORT = Deno.env.get("port") || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// async function verifySignature(
//   request: Request
// ): Promise<{ valid: boolean; body: string }> {
//   const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
//   // Discord sends these headers with every request.
//   // const signature = request.headers["X-Signature-Ed25519"];
//   console.log(request.rawHeaders);
//   const timestamp = request.headers["x-signature-timestamp"];
//   const signature = request.headers["x-signature-ed25519"];
//   const body = await request.body;
//   console.log(signature, timestamp, body, "body");

//   if (!signature || !timestamp) {
//     return { valid: false, body: "" };
//   }
//   const valid = nacl.sign.detached.verify(
//     new TextEncoder().encode(timestamp + body),
//     hexToUint8Array(signature as string),
//     hexToUint8Array(PUBLIC_KEY)
//   );
//   return { valid, body };
// }

// /** Converts a hexadecimal string to Uint8Array. */
// function hexToUint8Array(hex: string) {
//   return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
// }
