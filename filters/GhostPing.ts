import { Filter } from "../lib/Context";

export = function({ message }: Filter) {
    if (!message.mentions) return;
    if (message.mentions[0].id === message.author.id) return;

    message.channel.createMessage(
        `<@${message["author"]["id"]}>, Do not ghost ping, ${message.mentions[0].username}`
    );
}