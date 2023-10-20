import "./dayForecastCard.css";
import HumidityIconLink from "../../../assets/humidity.svg";

const createDayForecastCard = ({ dateString, tempC, tempF, degreeUnit, imageURL }) => {
    // Add card
    const card = document.createElement("div");
    card.className = "day-card";

    // Add day of the week
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    const today = new Date();
    if (parseInt(dateString.split("-")[0]) === today.getFullYear()
        && parseInt(dateString.split("-")[1]) === today.getMonth() + 1
        && parseInt(dateString.split("-")[2]) === today.getDate()) {
            dayDiv.textContent = "Today";
    } else {
        dayDiv.textContent = getDayOfTheWeek({dateString: dateString});
    }
    card.appendChild(dayDiv);

    // Add date
    const dateDiv = document.createElement("div");
    dateDiv.className = "date";
    dateDiv.textContent = `${dateString.split("-")[2]}/${dateString.split("-")[1]}`;
    card.appendChild(dateDiv);

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

const getDayOfTheWeek = ({ dateString }) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-us", { weekday: "long" }).substring(0, 3);
};

export default createDayForecastCard;