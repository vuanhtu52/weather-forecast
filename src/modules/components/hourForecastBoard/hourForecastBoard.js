import "./hourForecastBoard.css";

const createHourForecastBoard = () => {
    // Create board
    const board = document.createElement("div");
    board.textContent = "hourly forecast";

    return board;
};

export default createHourForecastBoard;