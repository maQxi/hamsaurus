import mongoose from "npm:mongoose";
import "$std/dotenv/load.ts";

const uri = Deno.env.get("MONGO_URI") || "localhost:27017";
mongoose.connect(uri);
// try {
//   // const res = envVars.ENV === "dev"
// await client.connect(Deno.env.get("MONGO_URI")!);
