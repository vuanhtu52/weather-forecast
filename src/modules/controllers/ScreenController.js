import LogoIconLink from "../../assets/logo.svg";
import createDayForecastBoard from "../components/dayForecastBoard/dayForecastBoard";
import createHourForecastBoard from "../components/hourForecastBoard/hourForecastBoard";
import createSearchBar from "../components/searchBar/searchBar";
import createTodayBoard from "../components/todayBoard/todayBoard";
import createUVBoard from "../components/uvBoard/uvBoard";
import createWindBoard from "../components/windBoard/windBoard";

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

        // Add today board
        const todayBoard = createTodayBoard();
        leftSection.appendChild(todayBoard);

        document.body.appendChild(leftSection);

        // Add right section
        const rightSection = document.createElement("div");
        rightSection.className = "right-section";

        // Add hourly forecast board
        const hourForecastBoard = createHourForecastBoard();
        rightSection.appendChild(hourForecastBoard);

        // Add 14-day forecast board
        const dayForecastBoard = createDayForecastBoard();
        rightSection.appendChild(dayForecastBoard);

        // Add uv board
        const extraBoards = document.createElement("div");
        extraBoards.className = "extra-boards";

        const uvBoard = createUVBoard();
        extraBoards.appendChild(uvBoard);

        // Add wind board
        const windBoard = createWindBoard();
        extraBoards.appendChild(windBoard);

        rightSection.appendChild(extraBoards);

        document.body.appendChild(rightSection);
    };

    return {
        init,
    };
};

export default ScreenController;
