import ScreenController from "./ScreenController";

const ApiController = () => {
    const init = () => {
        
    };

    const getRealTimeData = async ({ location }) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a447ab4f8114437dab575353231310&q=${location}`);
            const data = await response.json();
            const imageResponse = await fetch("https://" + data.current.condition.icon.substring(2));
            const imageData = await imageResponse.blob();
            const imageURL = URL.createObjectURL(imageData);
            data.imageURL = imageURL;
            console.log(imageURL);
            return data;
        } catch {
            console.log("Something went wrong");
            return null;
        }
    };

    const getForecast = async ({ location }) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a447ab4f8114437dab575353231310&q=${location}&days=7`);
            const data = await response.json();
            console.log(data);
        } catch {
            console.log("Something went wrong");
        }
    };

    return {
        init,
        getRealTimeData,
        getForecast,
    };
}

export default ApiController;