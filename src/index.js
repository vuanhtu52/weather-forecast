import "./style.css";
import ApiController from "./modules/controllers/ApiController";
import ScreenController from "./modules/controllers/ScreenController";

const screenController = ScreenController();
screenController.init();

const apiController = ApiController();
// apiController.getRealTimeData({location: "ho chi minh"});
apiController.getData({location: "sydney"});