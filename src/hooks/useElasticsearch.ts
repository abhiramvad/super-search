// src/hooks/useElasticsearch.ts
import { useState } from 'react';
import axios from 'axios';

const useElasticsearch = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const elasticsearchApi = axios.create({
        baseURL: 'https://27e35bbb0d204ec9bdf299f61c2540f9.us-central1.gcp.cloud.es.io',
        headers: {
            Authorization: 'ApiKey MUwxWHA0a0JDRzdaUzZidUN6NVk6V1NhOTZnVFdTSEdTVHczWnRaRTh6dw==',
        },
    });

    const search = async (query: string) => {
        try {
            const response = await elasticsearchApi.post('collection-with-embeddings/_search', {
                "knn": {
                    "field": "text_embedding.predicted_value",
                    "query_vector_builder": {
                        "text_embedding": {
                            "model_id": "sentence-transformers__msmarco-minilm-l-12-v3",
                            "model_text": query
                        }
                    },
                    "k": 5,
                    "num_candidates": 100
                },
                "_source": [
                    "id",
                    "text"
                ]
            } as any);
            setSearchResults(response.data.hits.hits);
            return response.data.hits.hits;
        } catch (error) {
            console.error('Error fetching data from Elasticsearch:', error);
        }
    };

    return { searchResults, search };
};

export default useElasticsearch;
