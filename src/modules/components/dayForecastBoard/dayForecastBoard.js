import "./dayForecastBoard.css";
import CalendarIconLink from "../../../assets/calendar.svg";
import createDayForecastCard from "../dayForecastCard/dayForecastCard";

const createDayForecastBoard = () => {
    // Create board
    const board = document.createElement("div");
    board.className = "day-board";

    // Add header
    const header = document.createElement("div");
    header.className = "header";

    const icon = new Image();
    icon.className = "icon";
    icon.src = CalendarIconLink;
    header.appendChild(icon);

    const title = document.createElement("div");
    title.textContent = "14-DAY FORECAST";
    header.appendChild(title);

    board.appendChild(header);

    // Add section to display forecast cards
    const cards = document.createElement("div");
    cards.className = "cards";

    // for (let i = 0; i < 14; i++) {
    //     const card = createDayForecastCard();
    //     if (i === 0) {
    //         card.classList.add("day-card-active");
    //     }
    //     cards.appendChild(card);
    // }

    board.appendChild(cards);

    return board;
};

export default createDayForecastBoard;