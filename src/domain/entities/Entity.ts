export abstract class Entity<T> {

    protected id: string;
    public props: T;

    constructor(props: T, id?: string) {
        this.props = props;
        this.id = id ?? crypto.randomUUID();
    }
}