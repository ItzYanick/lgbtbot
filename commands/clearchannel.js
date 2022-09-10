const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearchannel")
    .setDescription("deletes the last x messages")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("number of messages to delete")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await interaction.reply("Starting deleting channel...");
    await interaction.channel.messages
      .fetch({ limit: interaction.options.getInteger("amount") + 1 })
      .then(async (messages) => {
        for (const message of Array.from(messages.values())) {
          await message.delete();
          await sleep(500);
        }
      });
    return;
  },
};
