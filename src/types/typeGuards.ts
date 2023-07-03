import { AxiosError } from "axios";

export const isErrorResponse: <T>(
    response?: ActionResponse<T>,
) => response is { error: AxiosError } = (
    response,
): response is { error: AxiosError } => {
        return (response as { error: AxiosError })?.error !== undefined;
    };