import { Platform } from 'react-native';

const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const API_KEY = 'c19c47264b0dfd0973d63aa54cb6788c';

export interface HttpResponse<T> {
    success: boolean;
    data?: T | boolean;
    error?: string;
}


const buildUrl = (url: string, params: Record<string, any>): string => {
    const urlParams = new URLSearchParams({
        api_key: API_KEY,
        format: 'json',
        ...params,
    });
    return `${url}?${urlParams.toString()}`;
};


const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData: HttpResponse<any> = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'No Network Connection');
    }
    return response.json();
};


const PublicClientFetch = {
    get: async <T>(endpoint: string, params: Record<string, any> = {}): Promise<T> => {
        const url = buildUrl(API_BASE_URL + endpoint, params);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData: HttpResponse<any> = await response.json().catch(() => ({}));
                throw new Error(errorData?.error || 'No Network Connection');
            }

            const responseData: T = await response.json();
            return responseData;
        } catch (error) {
            throw error;
        }
    },
};


export default PublicClientFetch;
