import LogoIconLink from "../../assets/logo.svg";
import createSearchBar from "../components/searchBar/searchBar";

const ScreenController = () => {
    const init = () => {
        // Add favicon
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        link.href = LogoIconLink;
        document.head.appendChild(link);

        // Add left section
        const leftSection = document.createElement("div");
        leftSection.className = "left-section";

        // Add search bar
        const searchBar = createSearchBar();
        leftSection.appendChild(searchBar);

        document.body.appendChild(leftSection);

        // Add right section
        const rightSection = document.createElement("div");
        rightSection.className = "right-section";
        rightSection.textContent = "right";
        document.body.appendChild(rightSection);
    };

    return {
        init,
    };
};

export default ScreenController;
