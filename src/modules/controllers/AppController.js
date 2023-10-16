import ScreenController from "./ScreenController";

const AppController = () => {
    const screenController = ScreenController();

    const init = () => {
        screenController.init();
    };

    const getWeather = async ({location}) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a447ab4f8114437dab575353231310&q=${location}`);
            const data = await response.json();
            console.log(data);
        } catch {
            console.log("Something went wrong");
        }
    };

    return {
        init,
        getWeather,
    }
}

export default AppController;