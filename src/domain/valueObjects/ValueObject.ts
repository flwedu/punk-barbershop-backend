export interface ValueObject<T>{

    getValue(): any;
    equals(other: T):boolean
}