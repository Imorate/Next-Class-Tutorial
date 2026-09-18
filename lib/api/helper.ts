export const is2xx = (status: number) => status >= 200 && status < 300;
export const is3xx = (status: number) => status >= 300 && status < 400;
export const is4xx = (status: number) => status >= 400 && status < 500;
export const is5xx = (status: number) => status >= 500 && status < 600;
