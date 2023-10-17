import createDetailBoard from "../detailBoard/detailBoard";
import "./todayBoard.css";
import ThermometerIconLink from "../../../assets/thermometer.svg";
import PrecipitationIconLink from "../../../assets/precipitation.svg";
import VisibilityIconLink from "../../../assets/visibility.svg";
import HumidityIconLink from "../../../assets/humidity.svg";

const createTodayBoard = () => {
    // Create board
    const todayBoard = document.createElement("div");
    todayBoard.className = "today-board";

    // Add the temperature buttons
    const tempButtons = document.createElement("div");
    tempButtons.className = "temp-buttons";

    const cButton = document.createElement("button");
    cButton.className = "c-button button-active";
    cButton.textContent = "°C";
    tempButtons.appendChild(cButton);

    const fButton = document.createElement("button");
    fButton.className = "f-button";
    fButton.textContent = "°F";
    tempButtons.appendChild(fButton);

    todayBoard.appendChild(tempButtons);

    // Add the main display
    const mainDisplay = document.createElement("div");
    mainDisplay.className = "main-display";

    const cityDisplay = document.createElement("div");
    cityDisplay.className = "city";
    cityDisplay.textContent = "Ho Chi Minh";
    mainDisplay.appendChild(cityDisplay);

    const tempDisplay = document.createElement("div");
    tempDisplay.className = "temp";
    tempDisplay.textContent = "28°";
    mainDisplay.appendChild(tempDisplay);

    const conditionDisplay = document.createElement("div");
    conditionDisplay.className = "condition";
    conditionDisplay.textContent = "Rainy Day";
    mainDisplay.appendChild(conditionDisplay);

    todayBoard.appendChild(mainDisplay);

    // Add detail display
    const detailDisplay = document.createElement("div");
    detailDisplay.className = "detail-display";

    const feelsLikeBoard = createDetailBoard({iconLink: ThermometerIconLink, title: "FEELS LIKE", content: "30°"});
    detailDisplay.appendChild(feelsLikeBoard);

    const precipitationBoard = createDetailBoard({iconLink: PrecipitationIconLink, title: "PRECIPITATION", content: "20 mm"});
    detailDisplay.appendChild(precipitationBoard);

    const visibilityBoard = createDetailBoard({iconLink: VisibilityIconLink, title: "VISIBILITY", content: "5 km"});
    detailDisplay.appendChild(visibilityBoard);

    const humidityBoard = createDetailBoard({iconLink: HumidityIconLink, title: "HUMIDITY", content: "82%"});
    detailDisplay.appendChild(humidityBoard);

    todayBoard.appendChild(detailDisplay);

    return todayBoard;
};

export default createTodayBoard;