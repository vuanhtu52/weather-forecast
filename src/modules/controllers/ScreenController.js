import LogoIconLink from "../../assets/logo.svg";
import createDayForecastBoard from "../components/dayForecastBoard/dayForecastBoard";
import createDayForecastCard from "../components/dayForecastCard/dayForecastCard";
import createHourForecastBoard from "../components/hourForecastBoard/hourForecastBoard";
import createHourForecastCard from "../components/hourForecastCard/hourForecastCard";
import createSearchBar from "../components/searchBar/searchBar";
import createTodayBoard from "../components/todayBoard/todayBoard";
import createUVBoard from "../components/uvBoard/uvBoard";
import createWindBoard from "../components/windBoard/windBoard";
import ApiController from "./ApiController";

const ScreenController = () => {
    const apiController = ApiController();
    let degreeUnit = "c";

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
        _handleClickSearchButton();
        _handleClickCButton();
        _handleClickFButton();

        // Fetch data for the first time
        const data = await apiController.getData({ location: "Ho Chi Minh City" });
        if (data === null || data.hasOwnProperty("error")) {
            errorSpan.textContent = "Cannot find location."
        } else {
            _populateData({ data: data });
        }
    };

    const _populateData = ({ data }) => {
        // Populate data in today's board
        const cityDiv = document.querySelector(".today-board .main-display .city");
        cityDiv.textContent = data.location.name;

        const tempDiv = document.querySelector(".today-board .main-display .temp");
        tempDiv.tempC = data.current.temp_c;
        tempDiv.tempF = data.current.temp_f;
        if (degreeUnit === "c") {
            tempDiv.textContent = `${data.current.temp_c}°`;
        } else {
            tempDiv.textContent = `${data.current.temp_f}°`;
        }

        const conditionDiv = document.querySelector(".today-board .main-display .condition");
        conditionDiv.textContent = data.current.condition.text;

        const imageDiv = document.querySelector(".today-board .main-display .image");
        let imagePromise = fetch("https://" + data.current.condition.icon.substring(2));
        imagePromise
            .then(response => response.blob())
            .then(imageData => {
                const imageURL = URL.createObjectURL(imageData);
                imageDiv.src = imageURL;
            })
            .catch(err => {
                console.log("Cannot fetch image: " + err);
            });

        const feelsLikeDiv = document.querySelector(".today-board .detail-card:first-child .content");
        feelsLikeDiv.tempC = data.current.feelslike_c;
        feelsLikeDiv.tempF = data.current.feelslike_f;
        if (degreeUnit === "c") {
            feelsLikeDiv.textContent = `${data.current.feelslike_c}°`;
        } else {
            feelsLikeDiv.textContent = `${data.current.feelslike_f}°`;
        }
        
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
        const hourCardsWrapper = document.querySelector(".hour-board .cards");
        while (hourCardsWrapper.lastChild) {
            hourCardsWrapper.removeChild(hourCardsWrapper.lastChild);
        }
        const currentTime = new Date();

        // Add the card for current time
        const nowHourCard = createHourForecastCard({ hour: "Now", tempC: data.current.temp_c, tempF: data.current.temp_f, degreeUnit: degreeUnit, imageURL: data.current.condition.icon });
        nowHourCard.classList.add("hour-card-active");
        hourCardsWrapper.appendChild(nowHourCard);

        // Add the cards for the remaining hours of the day
        for (let i = currentTime.getHours() + 1; i < 24; i++) {
            const hourData = data.forecast.forecastday["0"].hour[i.toString()];
            const card = createHourForecastCard({ hour: hourData.time.split(" ")[1], tempC: hourData.temp_c, tempF: hourData.temp_f, degreeUnit: degreeUnit, imageURL: hourData.condition.icon });
            hourCardsWrapper.appendChild(card);
        }

        // Add the cards for the next day's hours until the total number of cards = 24
        const numOfRemainingCards = 24 - hourCardsWrapper.childElementCount;
        for (let i = 0; i < numOfRemainingCards; i++) {
            const hourData = data.forecast.forecastday["1"].hour[i.toString()];
            const card = createHourForecastCard({ hour: hourData.time.split(" ")[1], tempC: hourData.temp_c, tempF: hourData.temp_f, degreeUnit: degreeUnit, imageURL: hourData.condition.icon });
            hourCardsWrapper.appendChild(card);
        }

        // Populate data in 14-day forecast board
        const dayCardsWrapper = document.querySelector(".day-board .cards");
        while (dayCardsWrapper.lastChild) {
            dayCardsWrapper.removeChild(dayCardsWrapper.lastChild);
        }

        // Add the card for today
        const todayCard = createDayForecastCard({ dateString: data.forecast.forecastday["0"].date, tempC: data.forecast.forecastday["0"].day.avgtemp_c, tempF: data.forecast.forecastday["0"].day.avgtemp_f, degreeUnit: degreeUnit, imageURL: data.forecast.forecastday["0"].day.condition.icon });
        todayCard.classList.add("day-card-active");
        dayCardsWrapper.appendChild(todayCard);

        // Add the cards for the remaining days
        for (let i = 1; i < 14; i++) {
            if (data.forecast.forecastday.hasOwnProperty(i.toString())) {
                const dayData = data.forecast.forecastday[i.toString()];
                const card = createDayForecastCard({ dateString: dayData.date, tempC: dayData.day.avgtemp_c, tempF: dayData.day.avgtemp_f, degreeUnit: degreeUnit, imageURL: dayData.day.condition.icon });
                dayCardsWrapper.appendChild(card);
            }
        }
    };

    const _handleInput = async () => {
        _showLoader();
        const input = document.querySelector(".search-bar input");
        const errorSpan = document.querySelector(".error-span");
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
                _hideLoader();
    };

    const _showLoader = () => {
        const loader = document.querySelector(".left-section .loader");
        loader.style.display = "block";
    };

    const _hideLoader = () => {
        const loader = document.querySelector(".left-section .loader");
        loader.style.display = "none";
    };

    // Detect when user presses enter in search bar
    const _handleInputPressEnter = () => {
        const input = document.querySelector(".search-bar input");
        input.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                _handleInput();
            }
        });
    };

    // Detect when user clicks the search button in search bar
    const _handleClickSearchButton = () => {
        const searchButton = document.querySelector(".search-bar .search-icon");
        searchButton.addEventListener("click", () => {
            _handleInput();
        });
    };

    const _switchDegree = () => {
        // Change the active button
        const cButton = document.querySelector(".c-button");
        cButton.classList.toggle("button-active");
        const fButton = document.querySelector(".f-button");
        fButton.classList.toggle("button-active");

        // Convert degree in main display
        const tempMainDisplay = document.querySelector(".today-board .main-display .temp");
        if (degreeUnit === "c") {
            tempMainDisplay.textContent = tempMainDisplay.tempF + "°";
        } else {
            tempMainDisplay.textContent = tempMainDisplay.tempC + "°";
        }

        // Toggle degree in feels like card
        const feelsLikeDiv = document.querySelector(".today-board .detail-card:first-child .content");
        if (degreeUnit === "c") {
            feelsLikeDiv.textContent = feelsLikeDiv.tempF + "°";
        } else {
            feelsLikeDiv.textContent = feelsLikeDiv.tempC + "°";
        }

        // Toggle degree in hourly forecast board
        const hourCards = document.querySelectorAll(".hour-board .hour-card");
        hourCards.forEach(card => {
            if (degreeUnit === "c") {
                card.querySelector(".temp").textContent = card.querySelector(".temp").tempF;
            } else {
                card.querySelector(".temp").textContent = card.querySelector(".temp").tempC;
            }
        });

        // Toggle degree in 14-day forecast board
        const dayCards = document.querySelectorAll(".day-board .day-card");
        dayCards.forEach(card => {
            if (degreeUnit === "c") {
                card.querySelector(".temp").textContent = card.querySelector(".temp").tempF;
            } else {
                card.querySelector(".temp").textContent = card.querySelector(".temp").tempC;
            }
        });
        
        // Toggle the degreeUnit
        if (degreeUnit === "c") {
            degreeUnit = "f";
        } else {
            degreeUnit = "c";
        }
    };

    // Detect when user clicks c-degree button
    const _handleClickCButton = () => {
        const cButton = document.querySelector(".today-board .c-button");
        cButton.addEventListener("click", () => {
            if (degreeUnit === "f") {
                _switchDegree();
            }
        });
    };

    // Detect when user clicks f-degree button
    const _handleClickFButton = () => {
        const fButton = document.querySelector(".today-board .f-button");
        fButton.addEventListener("click", () => {
            if (degreeUnit === "c") {
                _switchDegree();
            }
        });
    };

    return {
        init,
    };
};

export default ScreenController;
