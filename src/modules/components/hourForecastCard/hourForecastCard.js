import "./hourForecastCard.css";
import HumidityIconLink from "../../../assets/humidity.svg";

const createHourForecastCard = ({hour, tempC, tempF, degreeUnit, imageURL}) => {
    // Add card
    const card = document.createElement("div");
    card.className = "hour-card";

    // Add time
    const timeDiv = document.createElement("div");
    timeDiv.className = "time";
    timeDiv.textContent = hour;
    card.appendChild(timeDiv);

    // Add temperature
    const tempDiv = document.createElement("div");
    tempDiv.className = "temp";
    tempDiv.tempC = tempC;
    tempDiv.tempF = tempF;
    if (degreeUnit === "c") {
        tempDiv.textContent = tempC + "°";
    } else {
        tempDiv.textContent = tempF + "°";
    }
    card.appendChild(tempDiv);

    // Add icon
    const icon = new Image();
    card.appendChild(icon);
    
    let imagePromise = fetch("https://" + imageURL);
    imagePromise
        .then(response => response.blob())
        .then(imageData => {
            const imageURL = URL.createObjectURL(imageData);
            icon.src = imageURL;
        })
        .catch(err => {
            console.log("Cannot fetch image: " + err);
        });
    return card;
};

export default createHourForecastCard;