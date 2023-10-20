import "./loader.css";

const createLoader = () => {
    const loader = document.createElement("div");
    loader.className = "loader";

    return loader;
};

export default createLoader;