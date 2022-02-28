export default interface ValueObject<T> {

    getValue(): any;
    equals(other: T): boolean
};