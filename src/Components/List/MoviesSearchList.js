import React, { useEffect, useState } from "react";

export default function MoviesSearchList(data) {
    console.log(data.searchResult)
    if (data.searchResult.length > 0) {
        return (
            <div className="absolute">

                <p>lala</p>
            </div>
        )
    } else {
        return
        (
            <div></div>
        )
    }

}

// export function updateSearchListView(searchData) {

//     MoviesSearchList(searchData)
//     return
// }