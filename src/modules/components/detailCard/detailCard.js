import "./detailCard.css";

const createDetailCard = ({iconLink, title, content}) => {
    // Add detail card
    const detailCard = document.createElement("div");
    detailCard.className = "detail-card";

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

    detailCard.appendChild(header);

    // Add content
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    contentDiv.textContent = content;
    detailCard.appendChild(contentDiv);

    return detailCard;
};

export default createDetailCard;