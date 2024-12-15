import { IHistory } from "./IHistory";

export interface IUser {
    id: string;
    username: string;
    categories: string[];
    history: IHistory[];

}
