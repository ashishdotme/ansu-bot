import { CommandInteraction, Message, TextChannel, Collection } from "discord.js";
import {
  Discord,
  Guard,
  Permission,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
  Slash,
} from "discordx";
import { IsAdmin } from '../../guards/is-admin.js';

@Discord()
@Guard(IsAdmin)
class Clear {
  @SimpleCommand("clear", { aliases: ["c"] })
  async clear(@SimpleCommandOption("num", { type: SimpleCommandOptionType.Number })
  num: number | undefined,command: SimpleCommandMessage) {
    const channel = command.message.channel;
    if(channel instanceof TextChannel){
      const messageManager = channel.messages;
      const messages = await messageManager.channel.messages.fetch({ limit: num });
      channel.bulkDelete(messages,true);
    }
  }

  @SimpleCommand("clearmine", { aliases: ["cm"] })
  async clearMine(@SimpleCommandOption("num", { type: SimpleCommandOptionType.Number })
  num: number | undefined,command: SimpleCommandMessage) {
    const channel = command.message.channel;
    if(channel instanceof TextChannel){
      const messageManager = channel.messages;
      let messages = await messageManager.channel.messages.fetch({ limit: 100 });
      messages = messages.filter((message) => message.author.id == process.env.BOT_ID)
      const messagesArray = Array.from(messages).slice(0, num);
      messages = new Collection(messagesArray)
      channel.bulkDelete(messages,true);
    }
  }
}
