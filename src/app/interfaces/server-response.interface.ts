export interface IServerResponse<T> {
    status: number;
    message: string;
    data: T;
}