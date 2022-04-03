

import { GuardFunction, SimpleCommandMessage } from 'discordx';
import { CommandInteraction, GuildMember } from 'discord.js';


export const IsAdmin: GuardFunction<SimpleCommandMessage, any> = async (
  message,
  client,
  next,
  { server }
) => {
  if (message.message.author.id === message.message.guild?.ownerId) {
    await next();
    return;
  }

  if (message.message.author.id === process.env.BOT_ID) {
    await next();
    return;
  }

  return
};
