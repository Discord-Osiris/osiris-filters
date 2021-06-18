import Eris from "eris";
import fs from "fs/promises";
import config from "../config.json";
import { context } from "./Context";

export = class FilterClient {

    public readonly filters: Map<string, context>;

    public readonly mentions: Map<string, Eris.User[]>;

    private client: Eris.Client;

    constructor(client: Eris.Client) {
        this.filters = new Map();
        this.mentions = new Map();

        this.client = client;

        client.on("messageCreate", (m: Eris.Message) => this.messageCreate(m));
        client.on("messageDelete", (m: Eris.Message) => this.messageDelete(m));
    }

    get clientFilters() {
        return this.filters.values();
    }

    async init() {
        let folder = await fs.readdir("./dist/filters/");
        for (let file of folder) {
            let filter: context = require(`../filters/${file}`);
            this.filters.set(file.toLowerCase().split(".")[0], filter);
        }
    }

    private messageDelete(message: Eris.Message) {
        let filter = this.filters.get("ghostping");

        if (!filter) return;

        filter({
            message: message,
            guild: (<Eris.GuildChannel>message.channel).guild,
            client: this.client
        });
    }

    private messageCreate(message: Eris.Message) {
        if (message.author.bot) return;
        if (message.author.id === (config.id)) return;
        for (let filter of this.filters.values()) {
            filter({
                message: message,
                guild: (<Eris.GuildChannel>message.channel).guild,
                client: this.client
            });
        }
    }
}