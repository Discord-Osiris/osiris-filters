import { Filter } from "../lib/Context";

export = function({ message }: Filter){
    let { id } = message.author;

    if (message.mentions.length > 4) {
        message.channel.createMessage(`<@${id}>, Too many mentions`);
        message.delete("Automod: Mention");
    }
}