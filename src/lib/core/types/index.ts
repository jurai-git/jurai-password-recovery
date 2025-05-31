
export interface ErrorResponse {
    status: number,
    json: any
};

export function isErrorResponse(obj: any): obj is ErrorResponse {
    return (
        typeof obj === "object" &&
        typeof obj.status === "number" &&
        typeof obj.json === "object"
    );
}

export type AsyncState<T> = {
    loading: boolean;
    error: ErrorResponse | TypeError | null;
    data: T;
};

export interface AccountRecoveryData {
    username: string,
    token: string
};

export type EmptyResponse = {
    done: boolean
};