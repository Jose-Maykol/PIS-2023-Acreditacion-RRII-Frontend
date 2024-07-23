export interface QueryStatus<T> {
    isIdle: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    data?: T
}