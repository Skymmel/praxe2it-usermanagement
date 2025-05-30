import React from "react";
import "./searchbar.css";
interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
    return (
        <div className={"search"}>
            <div className="search-wrapper">
                <input className={"search-input"} type="text" placeholder={placeholder || "Search"} value={value} onChange={(e) => onChange(e.target.value)}/>
                <div className={"search-icon"}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z"
                            stroke="#2C2C2C"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
export default SearchBar;