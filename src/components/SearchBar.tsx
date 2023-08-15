// src/components/SearchBar.tsx
import React, { useState } from 'react';
import useElasticsearch from '../hooks/useElasticsearch';
import { TextField, Button } from '@mui/material';
import useSearchApi from "../hooks/useSearchApi";
interface SearchBarProps {
    onSearchResults: (data: any[]) => void; // Callback to pass fetched data to parent component
}

const SearchBar: React.FC<SearchBarProps> = ({onSearchResults}) => {
    const [query, setQuery] = useState<string>('');
    const { search } = useSearchApi();
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const results = await search(query);
        onSearchResults(results);
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };
    return (
        <div className="search-bar">
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button disabled={query.length===0} variant="contained" type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
};

export default SearchBar;
