const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("tests bot and connection")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await interaction.reply("Testing everything...");
    await interaction.channel.send("Connection to Discord API is working.");
    await interaction.channel.send(
      "WS Latency is " + Math.round(interaction.client.ws.ping) + "ms"
    );
    return;
  },
};
