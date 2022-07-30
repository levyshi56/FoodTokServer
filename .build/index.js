var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_express = __toModule(require("express"));
var import_dotenv = __toModule(require("dotenv"));
var import_app = __toModule(require("./app"));
const app = (0, import_express.default)();
const port = process.env["PORT"];
import_dotenv.default.config();
const cors = require("cors");
app.use(cors({
  origin: ["https://foodtok-1.levys1.repl.co"]
}));
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/nearbyrestaurant", (req, res) => {
  if (!req.query.lat || !req.query.long) {
    res.send({ message: "no lat or no long" });
  }
  let lat = req.query.lat;
  let long = req.query.long;
  let mapsAPI = new import_app.GoogleMapAPI();
  let response = async () => {
    await mapsAPI.getNearbyPlaces(lat, long).then((response2) => {
      var _a, _b;
      if (response2) {
        let restaurantName = [];
        console.log((_a = response2 == null ? void 0 : response2.data) == null ? void 0 : _a.results);
        for (const restaurant of (_b = response2 == null ? void 0 : response2.data) == null ? void 0 : _b.results) {
          restaurantName.push(restaurant == null ? void 0 : restaurant.name);
          console.log(restaurant.geometry.location);
        }
        console.log(restaurantName);
        res.send(JSON.stringify(restaurantName));
      } else {
        res.send({ message: "failed" });
      }
    });
  };
  response();
});
app.listen(port, () => {
  console.log(`\u26A1\uFE0F[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
