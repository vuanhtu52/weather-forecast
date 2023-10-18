import ScreenController from "./ScreenController";

const AppController = () => {
    const screenController = ScreenController();

    const init = () => {
        screenController.init();
    };

    const getTodayWeather = async ({location}) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a447ab4f8114437dab575353231310&q=${location}`);
            const data = await response.json();
            console.log(data);
        } catch {
            console.log("Something went wrong");
        }
    };

    const getForecast = async ({location}) => {
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
        getTodayWeather,
        getForecast,
    };
}

export default AppController;