'use client';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface ISearch {
    showInput: boolean;
}

function Search({ showInput }: ISearch) {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    return (
        <div className="flex items-center w-[180px] h-[46px] border-borderLightTheme border-2">
            <div className="flex justify-center items-center w-[40px] pl-2">
                <SearchIcon style={{ fontSize: 20, color: '#999' }} />
            </div>
            <div className="grow">
                <input
                    type="text"
                    className="w-full h-[44px] px-2 py-1"
                    placeholder="Tìm kiếm..."
                />
            </div>
        </div>
    );
}

export default Search;
