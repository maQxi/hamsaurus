// @deno-types="npm:@types/express@4.17.15"
import "$std/dotenv/load.ts";
import express from "express";
import bodyParser from "bodyParser";
import nacl from "npm:tweetnacl";
import { verifyKey, verifyKeyMiddleware } from "npm:discord-interactions";
import { Response, Request, Application } from "npm:@types/express@4.17.15";
import { APIInteraction } from "discordTypes";
import { getXp } from "./commands/xp.ts";

const token = Deno.env.get("BOT_TOKEN")!;
const clientId = Deno.env.get("DISCORD_CLIENT_ID")!;
const publicKey = Deno.env.get("DISCORD_PUBLIC_KEY")!;

const app: Application = express();
// app.use(bodyParser.json());

app.post("/", verifyKeyMiddleware(publicKey), async (req, res) => {
  try {
    console.log(req.body, "body");
    const { type, data }: APIInteraction = req.body;

    console.log(data, "data");
    if (type === 1) {
      res.json({ type: 1 });
    } else if (type === 2) {
      if (data.name === "ping") {
        return res.json({
          type: 4,
          data: {
            content: "pong!",
          },
        });
      }
      if (data.name === "xp") {
        return res.json(getXp(data));
      }
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
      console.log(data, "data");
      // Handle other cases as needed
      res.status(400).json({ error: "Invalid type" });
    }
  } catch (e) {
    console.log(e);
    res.status(401).send("invalid request signature");
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
