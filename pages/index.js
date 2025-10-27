import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(express.json());

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Discord bot setup
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
  partials: ["CHANNEL"]
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// API route to send login code
app.post("/send-code", async (req, res) => {
  const { discordId } = req.body;
  if (!discordId) return res.status(400).json({ error: "Missing discordId" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const user = await client.users.fetch(discordId);
    await user.send(`🔐 Your NoahMedia login code is: **${code}**`);

    // Save code in Supabase
    await supabase.from("discord_login_codes").insert([{ discord_id: discordId, code, created_at: new Date() }]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send DM" });
  }
});

// API route to verify login code
app.post("/verify-code", async (req, res) => {
  const { discordId, code } = req.body;
  if (!discordId || !code) return res.status(400).json({ error: "Missing discordId or code" });

  const { data, error } = await supabase
    .from("discord_login_codes")
    .select("*")
    .eq("discord_id", discordId)
    .eq("code", code)
    .limit(1);

  if (error || data.length === 0) return res.json({ success: false });

  // Delete code after use
  await supabase.from("discord_login_codes")
    .delete()
    .eq("discord_id", discordId)
    .eq("code", code);

  res.json({ success: true });
});

app.listen(3000, () => console.log("🌐 API running on port 3000"));
client.login(process.env.TOKEN);

