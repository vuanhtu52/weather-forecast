import "./style.css";
import AppController from "./modules/controllers/AppController";

const appController = AppController();
appController.init();
// appController.getTodayWeather({location: "ho chi minh"});
// appController.getForecast({location: "ho chi minh"});