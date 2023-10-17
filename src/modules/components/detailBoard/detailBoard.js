import "./detailBoard.css";

const createDetailBoard = ({iconLink, title, content}) => {
    // Add detail board
    const detailBoard = document.createElement("div");
    detailBoard.className = "detail-board";

    // Add header
    const header = document.createElement("div");
    header.className = "header";

    const icon = new Image();
    icon.className = "icon";
    icon.src = iconLink;
    header.appendChild(icon);

    const titleDiv = document.createElement("div");
    titleDiv.textContent = title;
    header.appendChild(titleDiv);

    detailBoard.appendChild(header);

    // Add content
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    contentDiv.textContent = content;
    detailBoard.appendChild(contentDiv);

    return detailBoard;
};

export default createDetailBoard;