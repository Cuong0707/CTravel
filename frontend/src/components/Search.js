import React from "react";
import '../style/Search.scss';
import { Link, useSearchParams, useLocation } from "react-router-dom";
import HotelInfo from "./Card/hoteInfo";

const Search = () => {
    const location = useLocation();
    const searchResults = location.state && location.state.searchResults;
    return (

        <div className="container">
            <div className="container-search">
                {searchResults.length === 0 ?
                    (<h3>Không có kết quả</h3>) :
                    (<HotelInfo searchResults={searchResults} ></HotelInfo>)}
            </div>
        </div>
    )
}

export default Search