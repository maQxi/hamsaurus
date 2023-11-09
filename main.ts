// @deno-types="npm:@types/express@4.17.15"
import "$std/dotenv/load.ts";
import express from "express";
import bodyParser from "bodyParser";
import nacl from "npm:tweetnacl";
import { Response, Request } from "npm:@types/express@4.17.15";

const token = Deno.env.get("BOT_TOKEN")!;
const clientId = Deno.env.get("DISCORD_CLIENT_ID")!;

const app = express();
app.use(bodyParser.json());

app.post("/", async (req: Request, res: Response) => {
  const { valid, body } = await verifySignature(req);
  if (!valid) {
    return res.status(401).json({ error: "Invalid request signature" });
  }
  const { type = 0, data = { options: [] } } = JSON.parse(body);

  if (type === 1) {
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
});

const PORT = Deno.env.get("port") || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function verifySignature(
  request: Request
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  // Discord sends these headers with every request.
  const signature = request.headers["X-Signature-Ed25519"];
  const timestamp = request.headers["X-Signature-Timestamp"];
  const body = await request.body;
  if (!signature || !timestamp) {
    return { valid: false, body: "" };
  }
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature as string),
    hexToUint8Array(PUBLIC_KEY)
  );

  return { valid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}
