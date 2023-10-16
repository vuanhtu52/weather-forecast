import "./searchBar.css";
import MapIconLink from "../../../assets/map-marker.svg";
import SearchIconLink from "../../../assets/search.svg";

const createSearchBar = () => {
    // Add search bar
    const searchBar = document.createElement("div");
    searchBar.className = "search-bar";

    // Add map icon
    const mapIcon = new Image();
    mapIcon.src = MapIconLink;
    mapIcon.className = "map-icon";
    searchBar.appendChild(mapIcon);

    // Add input field
    const input = document.createElement("input");
    input.type = "text";
    searchBar.appendChild(input);

    // Add search icon
    const searchIcon = new Image();
    searchIcon.src = SearchIconLink;
    searchIcon.className = "search-icon";
    searchBar.appendChild(searchIcon);

    return searchBar;
};

export default createSearchBar;