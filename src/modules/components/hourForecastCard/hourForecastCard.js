import "./hourForecastCard.css";
import HumidityIconLink from "../../../assets/humidity.svg";

const createHourForecastCard = () => {
    // Add card
    const card = document.createElement("div");
    card.className = "hour-card";

    // Add time
    const timeDiv = document.createElement("div");
    timeDiv.className = "time";
    timeDiv.textContent = "15:00";
    card.appendChild(timeDiv);

    // Add temperature
    const tempDiv = document.createElement("div");
    tempDiv.className = "temp";
    tempDiv.textContent = "28°"
    card.appendChild(tempDiv);

    // Add icon
    const icon = new Image();
    icon.src = HumidityIconLink;
    card.appendChild(icon);

    return card;
};

export default createHourForecastCard;