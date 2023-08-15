// src/hooks/useSearchApi.ts
import { useState } from 'react';
import axios from 'axios';

const useSearchApi = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const searchApi = axios.create({
        baseURL: 'http://localhost:8080/'
    });

    const search = async (query: string) => {
        try {
            const response = await searchApi.get('search', {
                params : {query: query}
            } as any);
            setSearchResults(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    return { searchResults, search };
};

export default useSearchApi;
