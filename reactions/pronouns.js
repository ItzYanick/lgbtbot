const { EmbedBuilder } = require("discord.js");

let messageId = "0";
let sheHerRole = null;
let heHimRole = null;
let theyThemRole = null;
let sheTheyRole = null;
let heTheyRole = null;
let theySheRole = null;
let theyHeRole = null;
let anyRole = null;
let noRole = null;
let askRole = null;

const sheHerEmoji = "⬜";
const heHimEmoji = "🟧";
const theyThemEmoji = "🟦";
const sheTheyEmoji = "🟥";
const heTheyEmoji = "🟫";
const theySheEmoji = "🟪";
const theyHeEmoji = "🟩";
const anyEmoji = "🟨";
const noEmoji = "🔴";
const askEmoji = "🟠";

module.exports = {
  name: "pronouns",
  getMessageId() {
    return messageId;
  },
  async init(client) {
    const channel = await client.channels.fetch(
      process.env.REACTIONS_PRONOUNS_CHANNEL_ID
    );
    const channelMessages = await channel.messages.fetch({ limit: 100 });
    let tmp;
    if (channelMessages.size !== 1) {
      await channelMessages.forEach((message) => {
        message.delete();
      });
      const embed = new EmbedBuilder()
        .setColor("#17b111")
        .setTitle(
          "Reagiere auf die folgenden Emojis um deine Pronomen in deinem Profil anzeigen zu lassen!\nReact to the corresponding emoji to display your pronouns in your profile!"
        )
        .setDescription(
          `${sheHerEmoji} for She / Her\n` +
            `${heHimEmoji} for He / Him\n` +
            `${theyThemEmoji} for They / Them\n` +
            `${sheTheyEmoji} for She / They\n` +
            `${heTheyEmoji} for He / They\n` +
            `${theySheEmoji} for They / She\n` +
            `${theyHeEmoji} for They / He\n` +
            `${anyEmoji} for Any Pronouns\n` +
            `${noEmoji} for No Pronouns\n` +
            `${askEmoji} for Ask For Pronouns`
        );
      tmp = await channel.send({ embeds: [embed] });
      await tmp.react(sheHerEmoji);
      await tmp.react(heHimEmoji);
      await tmp.react(theyThemEmoji);
      await tmp.react(sheTheyEmoji);
      await tmp.react(heTheyEmoji);
      await tmp.react(theySheEmoji);
      await tmp.react(theyHeEmoji);
      await tmp.react(anyEmoji);
      await tmp.react(noEmoji);
      await tmp.react(askEmoji);

      console.log("pronouns: created messages");
    } else {
      tmp = channelMessages.first();
      console.log("pronouns: messages already exist");
    }
    messageId = tmp.id;

    const guildRoles = tmp.guild.roles;
    sheHerRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_SHE_HER
    );
    heHimRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_HE_HIM
    );
    theyThemRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_THEY_THEM
    );
    sheTheyRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_SHE_THEY
    );
    heTheyRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_HE_THEY
    );
    theySheRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_THEY_SHE
    );
    theyHeRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_THEY_HE
    );
    anyRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_ANY
    );
    noRole = await guildRoles.fetch(process.env.REACTIONS_PRONOUNS_ROLE_ID_NO);
    askRole = await guildRoles.fetch(
      process.env.REACTIONS_PRONOUNS_ROLE_ID_ASK
    );
    return;
  },
  async reactionAdd(reaction, user, guildMember) {
    const emoji = reaction.emoji.toString();
    switch (emoji) {
      case sheHerEmoji:
        guildMember.roles.add(sheHerRole);
        break;
      case heHimEmoji:
        guildMember.roles.add(heHimRole);
        break;
      case theyThemEmoji:
        guildMember.roles.add(theyThemRole);
        break;
      case sheTheyEmoji:
        guildMember.roles.add(sheTheyRole);
        break;
      case heTheyEmoji:
        guildMember.roles.add(heTheyRole);
        break;
      case theySheEmoji:
        guildMember.roles.add(theySheRole);
        break;
      case theyHeEmoji:
        guildMember.roles.add(theyHeRole);
        break;
      case anyEmoji:
        guildMember.roles.add(anyRole);
        break;
      case noEmoji:
        guildMember.roles.add(noRole);
        break;
      case askEmoji:
        guildMember.roles.add(askRole);
        break;
      default:
        await reaction.remove();
        break;
    }
    return;
  },
  async reactionRemove(reaction, user, guildMember) {
    const emoji = reaction.emoji.toString();
    switch (emoji) {
      case sheHerEmoji:
        guildMember.roles.remove(sheHerRole);
        break;
      case heHimEmoji:
        guildMember.roles.remove(heHimRole);
        break;
      case theyThemEmoji:
        guildMember.roles.remove(theyThemRole);
        break;
      case sheTheyEmoji:
        guildMember.roles.remove(sheTheyRole);
        break;
      case heTheyEmoji:
        guildMember.roles.remove(heTheyRole);
        break;
      case theySheEmoji:
        guildMember.roles.remove(theySheRole);
        break;
      case theyHeEmoji:
        guildMember.roles.remove(theyHeRole);
        break;
      case anyEmoji:
        guildMember.roles.remove(anyRole);
        break;
      case noEmoji:
        guildMember.roles.remove(noRole);
        break;
      case askEmoji:
        guildMember.roles.remove(askRole);
        break;
      default:
        break;
    }
    return;
  },
};
