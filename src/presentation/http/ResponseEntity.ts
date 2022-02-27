export default interface IResponseEntity<T = any> {
    status: number,
    data: T
}