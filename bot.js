const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
  ],
});
client.commands = new Collection();
client.reactions = new Collection();

client.internalReady = false;

client.on("interactionCreate", async (interaction) => {
  if (!client.internalReady) return;
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on("messageReactionAdd", async (interaction, user) => {
  if (!client.internalReady) return;
  if (interaction.partial) {
    try {
      await interaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      return;
    }
  }
  const reaction = client.reactions.get(interaction.message.id);
  if (!reaction) return;
  const guildMember = await interaction.message.guild.members.fetch(user.id);
  await reaction.reactionAdd(interaction, guildMember);
});

client.on("messageReactionRemove", async (interaction, user) => {
  if (!client.internalReady) return;
  if (interaction.partial) {
    try {
      await interaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      return;
    }
  }
  const reaction = client.reactions.get(interaction.message.id);
  if (!reaction) return;
  const guildMember = await interaction.message.guild.members.fetch(user.id);
  await reaction.reactionRemove(interaction, guildMember);
});

client.once("ready", async () => {
  // Command collection
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }

  // Reaction collection
  const reactionsPath = path.join(__dirname, "reactions");
  const reactionFiles = fs
    .readdirSync(reactionsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of reactionFiles) {
    const filePath = path.join(reactionsPath, file);
    const reaction = require(filePath);
    await reaction.init(client);
    console.log(
      `added reaction (name=${
        reaction.name
      } messageId=${await reaction.getMessageId()})`
    );
    await client.reactions.set(reaction.getMessageId(), reaction);
  }

  client.internalReady = true;
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);
