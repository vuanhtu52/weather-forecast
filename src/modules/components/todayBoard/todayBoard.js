import "./todayBoard.css";
import ThermometerIconLink from "../../../assets/thermometer.svg";
import PrecipitationIconLink from "../../../assets/precipitation.svg";
import VisibilityIconLink from "../../../assets/visibility.svg";
import HumidityIconLink from "../../../assets/humidity.svg";
import createDetailCard from "../detailCard/detailCard";

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
    mainDisplay.appendChild(cityDisplay);

    const tempDisplay = document.createElement("div");
    tempDisplay.className = "temp";
    mainDisplay.appendChild(tempDisplay);

    const conditionDisplay = document.createElement("div");
    conditionDisplay.className = "condition";
    mainDisplay.appendChild(conditionDisplay);

    const imageDisplay = document.createElement("img");
    imageDisplay.className = "image";
    mainDisplay.appendChild(imageDisplay);

    todayBoard.appendChild(mainDisplay);

    // Add detail display
    const detailDisplay = document.createElement("div");
    detailDisplay.className = "detail-display";

    const feelsLikeCard = createDetailCard({iconLink: ThermometerIconLink, title: "FEELS LIKE", content: ""});
    detailDisplay.appendChild(feelsLikeCard);

    const precipitationCard = createDetailCard({iconLink: PrecipitationIconLink, title: "PRECIPITATION", content: ""});
    detailDisplay.appendChild(precipitationCard);

    const visibilityCard = createDetailCard({iconLink: VisibilityIconLink, title: "VISIBILITY", content: ""});
    detailDisplay.appendChild(visibilityCard);

    const humidityCard = createDetailCard({iconLink: HumidityIconLink, title: "HUMIDITY", content: ""});
    detailDisplay.appendChild(humidityCard);

    todayBoard.appendChild(detailDisplay);

    return todayBoard;
};

export default createTodayBoard;