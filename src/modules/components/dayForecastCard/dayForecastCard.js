import "./dayForecastCard.css";
import HumidityIconLink from "../../../assets/humidity.svg";

const createDayForecastCard  = () => {
    // Add card
    const card = document.createElement("div");
    card.className = "day-card";

    // Add day
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = "Mon";
    card.appendChild(dayDiv);

    // Add date
    const dateDiv = document.createElement("div");
    dateDiv.className = "date";
    dateDiv.textContent = "16/09";
    card.appendChild(dateDiv);

    // Add temperature
    const tempDiv = document.createElement("div");
    tempDiv.className = "temp";
    tempDiv.textContent = "28°"
    card.appendChild(tempDiv);

    // Add icon
    const icon = new Image();
    icon.className = "icon"
    icon.src = HumidityIconLink;
    card.appendChild(icon);

    return card;
};

export default createDayForecastCard;