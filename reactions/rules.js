const { EmbedBuilder } = require("discord.js");
const messages = require("./rules.json");

let messageId = "0";
let role = null;

const acceptedEmoji = "✅";

async function createMessages(channel) {
  await channel.send(messages.de.join("\n"));
  await channel.send(messages.en.join("\n"));
}

module.exports = {
  name: "rules",
  getMessageId() {
    return messageId;
  },
  async init(client) {
    const reactionChannel = await client.channels.fetch(
      process.env.REACTIONS_RULES_CHANNEL_ID
    );
    const rulesChannel = await client.channels.fetch(
      process.env.DISCORD_RULES_CHANNEL_ID
    );
    const reactionChannelMessages = await reactionChannel.messages.fetch({
      limit: 100,
    });
    const rulesChannelMessages = await rulesChannel.messages.fetch({
      limit: 100,
    });

    if (rulesChannelMessages.size !== 2) {
      await rulesChannelMessages.forEach((message) => {
        message.delete();
      });
      createMessages(rulesChannel);
    }

    let tmp;
    if (reactionChannelMessages.size !== 3) {
      await reactionChannelMessages.forEach((message) => {
        message.delete();
      });
      createMessages(reactionChannel);
      const embed = new EmbedBuilder()
        .setColor("#17b111")
        .setTitle(messages.embed.title)
        .setDescription(messages.embed.description);
      tmp = await channel.send({ embeds: [embed] });
      await tmp.react(acceptedEmoji);

      console.log("rules: created messages");
    } else {
      tmp = reactionChannelMessages.first();
      console.log("rules: messages already exist");
    }

    messageId = tmp.id;
    role = await tmp.guild.roles.fetch(process.env.REACTIONS_RULES_ROLE_ID);
    return;
  },
  async reactionAdd(reaction, guildMember) {
    if (reaction.emoji.toString() === acceptedEmoji) {
      guildMember.roles.add(role);
    }
    await reaction.remove();
    return;
  },
  async reactionRemove(reaction, guildMember) {
    // no action
    return;
  },
};
