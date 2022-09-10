const { EmbedBuilder } = require("discord.js");

let messageId = "0";
let architectureRole = null;
let civilAndEnvironmentalEngineeringRole = null;
let electricalEngineeringAndInformationTechnologyRole = null;
let computerScienceRole = null;
let manufacturingSystemsEngineeringRole = null;
let biologyRole = null;
let chemistryRole = null;
let materialAndGeosciencesRole = null;
let mathematicsRole = null;
let physicsRole = null;
let socialAndHistoricalSciencesRole = null;
let humanSciencesRole = null;
let lawAndEconomicSciencesRole = null;

const architectureEmoji = "📐";
const civilAndEnvironmentalEngineeringEmoji = "🍂";
const electricalEngineeringAndInformationTechnologyEmoji = "🔋";
const computerScienceEmoji = "💻";
const manufacturingSystemsEngineeringEmoji = "⚙️";
const biologyEmoji = "🧬";
const chemistryEmoji = "🧪";
const materialAndGeosciencesEmoji = "💎";
const mathematicsEmoji = "🧮";
const physicsEmoji = "⚛️";
const socialAndHistoricalSciencesEmoji = "📜";
const humanSciencesEmoji = "🧠";
const lawAndEconomicSciencesEmoji = "⚖️";

module.exports = {
  name: "study",
  getMessageId() {
    return messageId;
  },
  async init(client) {
    const channel = await client.channels.fetch(
      process.env.REACTIONS_STUDY_CHANNEL_ID
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
          "Reagiere auf die folgenden Emojis um deinen Studiengang in deinem Profil anzeigen zu lassen!\nReact to the corresponding emoji to display your study courses in your profile!"
        )
        .setDescription(
          `${architectureEmoji} for Architecture / Architektur\n` +
            `${civilAndEnvironmentalEngineeringEmoji} for Civil and Environmental Engineering / Bau- und Umweltingenieurwissenschaften\n` +
            `${electricalEngineeringAndInformationTechnologyEmoji} for Electrical Engineering and Information Technology / Elektrotechnik und Informationstechnik (etit)\n` +
            `${computerScienceEmoji} for Computer Science / Informatik\n` +
            `${manufacturingSystemsEngineeringEmoji} for Manufacturing Systems Engineering / Maschinenbau\n` +
            `${biologyEmoji} for Biology / Biologie\n` +
            `${chemistryEmoji} for Chemistry / Chemie\n` +
            `${materialAndGeosciencesEmoji} for Material and Geosciences / Material- und Geowissenschaften\n` +
            `${mathematicsEmoji} for Mathematics / Mathematik\n` +
            `${physicsEmoji} for Physics / Physik\n` +
            `${socialAndHistoricalSciencesEmoji} for Social and Historical Sciences / Gesellschafts- und Geschichtswissenschaften\n` +
            `${humanSciencesEmoji} for Human Sciences / Humanwissenschaften\n` +
            `${lawAndEconomicSciencesEmoji} for Law and Economic Sciences / Rechts- und Wirtschaftswissenschaften`
        );
      tmp = await channel.send({ embeds: [embed] });
      await tmp.react(architectureEmoji);
      await tmp.react(civilAndEnvironmentalEngineeringEmoji);
      await tmp.react(electricalEngineeringAndInformationTechnologyEmoji);
      await tmp.react(computerScienceEmoji);
      await tmp.react(manufacturingSystemsEngineeringEmoji);
      await tmp.react(biologyEmoji);
      await tmp.react(chemistryEmoji);
      await tmp.react(materialAndGeosciencesEmoji);
      await tmp.react(mathematicsEmoji);
      await tmp.react(physicsEmoji);
      await tmp.react(socialAndHistoricalSciencesEmoji);
      await tmp.react(humanSciencesEmoji);
      await tmp.react(lawAndEconomicSciencesEmoji);

      console.log("study: created messages");
    } else {
      tmp = channelMessages.first();
      console.log("study: messages already exist");
    }
    messageId = tmp.id;

    const guildRoles = tmp.guild.roles;
    architectureRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_ARCHITECTURE
    );
    civilAndEnvironmentalEngineeringRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_CIVIL_ENVIRONMENTAL_ENGINEERING
    );
    electricalEngineeringAndInformationTechnologyRole = await guildRoles.fetch(
      process.env
        .REACTIONS_STUDY_ROLE_ID_ELECTRICAL_ENGINEERING_INFORMATION_TECHNOLOGY
    );
    computerScienceRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_COMPUTER_SCIENCE
    );
    manufacturingSystemsEngineeringRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_MANUFACTURING_SYSTEMS_ENGINEERING
    );
    biologyRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_BIOLOGY
    );
    chemistryRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_CHEMISTRY
    );
    materialAndGeosciencesRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_MATERIAL_GEOSCIENCES
    );
    mathematicsRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_MATHEMATICS
    );
    physicsRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_PHYSICS
    );
    socialAndHistoricalSciencesRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_SOCIAL_HISTORICAL_SCIENCES
    );
    humanSciencesRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_HUMAN_SCIENCES
    );
    lawAndEconomicSciencesRole = await guildRoles.fetch(
      process.env.REACTIONS_STUDY_ROLE_ID_LAW_ECONOMIC_SCIENCES
    );
    return;
  },
  async reactionAdd(reaction, guildMember) {
    const emoji = reaction.emoji.toString();
    switch (emoji) {
      case architectureEmoji:
        await guildMember.roles.add(architectureRole);
        break;
      case civilAndEnvironmentalEngineeringEmoji:
        await guildMember.roles.add(civilAndEnvironmentalEngineeringRole);
        break;
      case electricalEngineeringAndInformationTechnologyEmoji:
        await guildMember.roles.add(
          electricalEngineeringAndInformationTechnologyRole
        );
        break;
      case computerScienceEmoji:
        await guildMember.roles.add(computerScienceRole);
        break;
      case manufacturingSystemsEngineeringEmoji:
        await guildMember.roles.add(manufacturingSystemsEngineeringRole);
        break;
      case biologyEmoji:
        await guildMember.roles.add(biologyRole);
        break;
      case chemistryEmoji:
        await guildMember.roles.add(chemistryRole);
        break;
      case materialAndGeosciencesEmoji:
        await guildMember.roles.add(materialAndGeosciencesRole);
        break;
      case mathematicsEmoji:
        await guildMember.roles.add(mathematicsRole);
        break;
      case physicsEmoji:
        await guildMember.roles.add(physicsRole);
        break;
      case socialAndHistoricalSciencesEmoji:
        await guildMember.roles.add(socialAndHistoricalSciencesRole);
        break;
      case humanSciencesEmoji:
        await guildMember.roles.add(humanSciencesRole);
        break;
      case lawAndEconomicSciencesEmoji:
        await guildMember.roles.add(lawAndEconomicSciencesRole);
        break;
      default:
        await reaction.remove();
        break;
    }
    return;
  },
  async reactionRemove(reaction, guildMember) {
    const emoji = reaction.emoji.toString();
    switch (emoji) {
      case architectureEmoji:
        await guildMember.roles.remove(architectureRole);
        break;
      case civilAndEnvironmentalEngineeringEmoji:
        await guildMember.roles.remove(civilAndEnvironmentalEngineeringRole);
        break;
      case electricalEngineeringAndInformationTechnologyEmoji:
        await guildMember.roles.remove(
          electricalEngineeringAndInformationTechnologyRole
        );
        break;
      case computerScienceEmoji:
        await guildMember.roles.remove(computerScienceRole);
        break;
      case manufacturingSystemsEngineeringEmoji:
        await guildMember.roles.remove(manufacturingSystemsEngineeringRole);
        break;
      case biologyEmoji:
        await guildMember.roles.remove(biologyRole);
        break;
      case chemistryEmoji:
        await guildMember.roles.remove(chemistryRole);
        break;
      case materialAndGeosciencesEmoji:
        await guildMember.roles.remove(materialAndGeosciencesRole);
        break;
      case mathematicsEmoji:
        await guildMember.roles.remove(mathematicsRole);
        break;
      case physicsEmoji:
        await guildMember.roles.remove(physicsRole);
        break;
      case socialAndHistoricalSciencesEmoji:
        await guildMember.roles.remove(socialAndHistoricalSciencesRole);
        break;
      case humanSciencesEmoji:
        await guildMember.roles.remove(humanSciencesRole);
        break;
      case lawAndEconomicSciencesEmoji:
        await guildMember.roles.remove(lawAndEconomicSciencesRole);
        break;
      default:
        break;
    }
    return;
  },
};
