import "./searchBar.css";

const createSearchBar = () => {
    const searchBar = document.createElement("div");
    searchBar.textContent = "search bar";

    return searchBar;
};

export default createSearchBar;