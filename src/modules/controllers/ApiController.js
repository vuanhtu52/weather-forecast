import ScreenController from "./ScreenController";

const ApiController = () => {
    const init = () => {
        
    };

    const getData = async ({ location }) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a447ab4f8114437dab575353231310&q=${location}&days=14`);
            const data = await response.json();
            return data;
        } catch {
            console.log("Something went wrong");
            return null;
        }
    };

    return {
        init,
        getData,
    };
}

export default ApiController;