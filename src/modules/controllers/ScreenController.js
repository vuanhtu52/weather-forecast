import LogoIconLink from "../../assets/logo.svg";

const ScreenController = () => {
    const init = () => {
        // Add favicon
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        link.href = LogoIconLink;
        document.head.appendChild(link);
    };

    return {
        init,
    };
};

export default ScreenController;
