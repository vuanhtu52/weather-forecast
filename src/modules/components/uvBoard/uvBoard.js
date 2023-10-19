import "./uvBoard.css";
import ThermometerIconLink from "../../../assets/thermometer.svg";

const createUVBoard = () => {
    // Add board
    const board = document.createElement("div");
    board.className = "uv-board";

    // Add header
    const header = document.createElement("div");
    header.className = "header";

    const icon = new Image();
    icon.className = "icon";
    icon.src = ThermometerIconLink;
    header.appendChild(icon);

    const title = document.createElement("div");
    title.textContent = "UV INDEX";
    header.appendChild(title);

    board.appendChild(header);

    // Add content
    const content = document.createElement("div");
    content.className = "content";

    const value = document.createElement("div");
    value.className = "value";
    content.appendChild(value);

    const level = document.createElement("div");
    level.className = "level";
    content.appendChild(level);

    board.appendChild(content);

    return board;
};

export default createUVBoard;