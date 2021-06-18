import Eris from "eris";

export type context = ({}: Filter) => void;

export interface Filter {
    message: Eris.Message;
    guild: Eris.Guild;
    client: Eris.Client;
}