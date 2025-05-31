export function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = 5000): Promise<Response> {
    const timeoutPromise = new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new TypeError('Request timed out')), timeoutMs)
    );

    return Promise.race([fetch(url, options), timeoutPromise]);
}