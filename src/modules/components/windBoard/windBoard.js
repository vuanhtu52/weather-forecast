import "./windBoard.css";
import WindIconLink from "../../../assets/wind.svg";

const createWindBoard = () => {
    // Add board
    const board = document.createElement("div");
    board.className = "wind-board";

    // Add header
    const header = document.createElement("div");
    header.className = "header";

    const icon = new Image();
    icon.className = "icon";
    icon.src = WindIconLink;
    header.appendChild(icon);

    const title = document.createElement("div");
    title.textContent = "WIND";
    header.appendChild(title);

    board.appendChild(header);

    // Add content
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    // Add wind speed info
    const speedDiv = document.createElement("div");
    speedDiv.className = "speed";

    const valueDiv = document.createElement("div");
    valueDiv.className = "value";
    valueDiv.textContent = "3";
    speedDiv.appendChild(valueDiv);

    const unitDiv = document.createElement("div");
    unitDiv.className = "unit";
    unitDiv.textContent = "KMH";
    speedDiv.appendChild(unitDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.textContent = "Wind";
    speedDiv.appendChild(descriptionDiv);

    contentDiv.appendChild(speedDiv);

    // Add line break
    const lineBreak = document.createElement("hr");
    contentDiv.appendChild(lineBreak);

    // Add gusts info
    const gustDiv = document.createElement("div");
    gustDiv.className = "gust";

    const gustValueDiv = document.createElement("div");
    gustValueDiv.className = "value";
    gustValueDiv.textContent = "9";
    gustDiv.appendChild(gustValueDiv);

    const gustUnitDiv = document.createElement("div");
    gustUnitDiv.className = "unit";
    gustUnitDiv.textContent = "KPH";
    gustDiv.appendChild(gustUnitDiv);

    const gustDescriptionDiv = document.createElement("div");
    gustDescriptionDiv.textContent = "Gusts";
    gustDiv.appendChild(gustDescriptionDiv);

    contentDiv.appendChild(gustDiv);

    
    board.appendChild(contentDiv);

    return board;
};

export default createWindBoard;