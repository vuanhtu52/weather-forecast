import LogoIconLink from "../../assets/logo.svg";
import createDayForecastBoard from "../components/dayForecastBoard/dayForecastBoard";
import createHourForecastBoard from "../components/hourForecastBoard/hourForecastBoard";
import createSearchBar from "../components/searchBar/searchBar";
import createTodayBoard from "../components/todayBoard/todayBoard";
import createUVBoard from "../components/uvBoard/uvBoard";
import createWindBoard from "../components/windBoard/windBoard";
import ApiController from "./ApiController";

const ScreenController = () => {
    const apiController = ApiController();

    const init = async () => {
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

        // Add span for error message
        const errorSpan = document.createElement("span");
        errorSpan.className = "error-span";
        leftSection.appendChild(errorSpan);

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

        // Attach listeners
        _handleInputPressEnter();

        // Fetch data for the first time
        const data = await apiController.getData({ location: "Ho Chi Minh City" });
        if (data === null || data.hasOwnProperty("error")) {
            errorSpan.textContent = "Cannot find location."
        } else {
            _populateData({ data: data });
        }
    };

    // Detect when user presses enter in search bar
    const _handleInputPressEnter = async () => {
        const input = document.querySelector(".search-bar input");
        const errorSpan = document.querySelector(".error-span");
        input.addEventListener("keyup", async (event) => {
            if (event.keyCode === 13) {
                errorSpan.textContent = "";
                if (input.value.trim() === "") {
                    errorSpan.textContent = "Please enter a valid city's name.";
                } else {
                    const data = await apiController.getData({ location: input.value.trim() });
                    if (data === null || data.hasOwnProperty("error")) {
                        errorSpan.textContent = "Cannot find location."
                    } else {
                        _populateData({ data: data });
                    }
                }
            }
        });
    };

    const _populateData = ({ data }) => {
        console.log(data);
        // Populate data in today's board
        const cityDiv = document.querySelector(".today-board .main-display .city");
        cityDiv.textContent = data.location.name;

        const tempDiv = document.querySelector(".today-board .main-display .temp");
        tempDiv.textContent = `${data.current.temp_c}°`;

        const conditionDiv = document.querySelector(".today-board .main-display .condition");
        conditionDiv.textContent = data.current.condition.text;

        const imageDiv = document.querySelector(".today-board .main-display .image");
        imageDiv.src = data.current.imageURL;

        const feelsLikeDiv = document.querySelector(".today-board .detail-card:first-child .content");
        feelsLikeDiv.textContent = `${data.current.feelslike_c}°`;

        const precipitationDiv = document.querySelector(".today-board .detail-card:nth-child(2) .content");
        precipitationDiv.textContent = `${data.current.precip_mm} mm`;

        const visibilityDiv = document.querySelector(".today-board .detail-card:nth-child(3) .content");
        visibilityDiv.textContent = `${data.current.vis_km} km`;

        const humidityDiv = document.querySelector(".today-board .detail-card:nth-child(4) .content");
        humidityDiv.textContent = `${data.current.humidity}%`;

        // Populate data in UV board
        const uvValueDiv = document.querySelector(".uv-board .content .value");
        uvValueDiv.textContent = data.current.uv;

        const uvLevelDiv = document.querySelector(".uv-board .content .level");
        if (0 <= data.current.uv && data.current.uv <= 2) {
            uvLevelDiv.textContent = "Low";
        } else if (3 <= data.current.uv && data.current.uv <= 5) {
            uvLevelDiv.textContent = "Moderate";
        } else if (6 <= data.current.uv && data.current.uv <= 7) {
            uvLevelDiv.textContent = "High";
        } else if (8 <= data.current.uv && data.current.uv <= 10) {
            uvLevelDiv.textContent = "Very High";
        } else {
            uvLevelDiv.textContent = "Extreme";
        }

        // Populate data in wind board
        const windDiv = document.querySelector(".wind-board .speed .value");
        windDiv.textContent = data.current.wind_kph;

        const gustDiv = document.querySelector(".wind-board .gust .value");
        gustDiv.textContent = data.current.gust_kph;

        // Populate data in hourly forecast board
    };

    return {
        init,
    };
};

export default ScreenController;
