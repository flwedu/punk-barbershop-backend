import crypto from "crypto";

export abstract class Entity<T> {
    private _id: string;
    public props: T;

    constructor(props: T, id?: string) {
        this.props = props;
        this._id = id ?? crypto.randomUUID();
    }
    get id(): string {
        return this._id;
    }
}
