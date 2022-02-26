export default interface IUseCase {

    execute: (data: any) => Promise<any>;
}