export default interface IValueObject<T> {

    getValue(): any;
    equals(other: T): boolean
};