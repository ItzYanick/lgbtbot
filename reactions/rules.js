const { EmbedBuilder } = require("discord.js");
const messages = require("./rules.json");

let messageId = "0";
let role = null;

const acceptedEmoji = "✅";

module.exports = {
  name: "rules",
  getMessageId() {
    return messageId;
  },
  async init(client) {
    const channel = await client.channels.fetch(
      process.env.REACTIONS_RULES_CHANNEL_ID
    );
    const channelMessages = await channel.messages.fetch({ limit: 100 });
    let tmp;
    if (channelMessages.size !== 3) {
      await channelMessages.forEach((message) => {
        message.delete();
      });
      await channel.send(messages.de.join("\n"));
      await channel.send(messages.en.join("\n"));
      const embed = new EmbedBuilder()
        .setColor("#17b111")
        .setTitle(messages.embed.title)
        .setDescription(messages.embed.description);
      tmp = await channel.send({ embeds: [embed] });
      await tmp.react(acceptedEmoji);

      console.log("rules: created messages");
    } else {
      tmp = channelMessages.first();
      console.log("rules: messages already exist");
    }
    messageId = tmp.id;
    role = await tmp.guild.roles.fetch(process.env.REACTIONS_RULES_ROLE_ID);
    return;
  },
  async reactionAdd(reaction, guildMember) {
    if (reaction.emoji.toString() === acceptedEmoji) {
      guildMember.roles.add(role);
    } else {
      await reaction.remove();
    }
    return;
  },
  async reactionRemove(reaction, guildMember) {
    if (reaction.emoji.toString() === acceptedEmoji) {
      guildMember.roles.remove(role);
    }
    return;
  },
};
