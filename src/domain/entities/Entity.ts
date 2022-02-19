import crypto from "crypto";

export interface Props<T>{

}
export abstract class Entity {
    private _id: string;
    public props: Props<Entity>;

    constructor(props: Props<Entity>, id?: string) {
        this.props = {...props};
        this._id = id ?? crypto.randomUUID();
    }
    get id(): string {
        return this._id;
    }
}
