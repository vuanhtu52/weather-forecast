import "./hourForecastBoard.css";
import ClockIconLink from "../../../assets/clock.svg";
import createHourForecastCard from "../hourForecastCard/hourForecastCard";

const createHourForecastBoard = () => {
    // Create board
    const board = document.createElement("div");
    board.className = "hour-board";

    // Add header
    const header = document.createElement("div");
    header.className = "header";

    const icon = new Image();
    icon.className = "icon";
    icon.src = ClockIconLink;
    header.appendChild(icon);

    const title = document.createElement("div");
    title.textContent = "HOURLY FORECAST";
    header.appendChild(title);

    board.appendChild(header);

    // Add section to display forecast cards
    const cards = document.createElement("div");
    cards.className = "cards";

    for (let i = 0; i < 15; i++) {
        const card = createHourForecastCard();
        if (i === 0) {
            card.classList.add("hour-card-active");
        }
        cards.appendChild(card);
    }

    board.appendChild(cards);

    return board;
};

export default createHourForecastBoard;