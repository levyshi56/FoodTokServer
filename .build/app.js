var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
__export(exports, {
  GoogleMapAPI: () => GoogleMapAPI
});
var import_axios = __toModule(require("axios"));
const API_KEY = process.env["GOOGLE_API_KEY"];
console.log(API_KEY);
class GoogleMapAPI {
  currentCoordConfig = {
    url: "https://www.googleapis.com/geolocation/v1/geolocate?key=" + API_KEY,
    body: "",
    method: "POST"
  };
  async getCurrentCoordinate() {
    let response = await (0, import_axios.default)(this.currentCoordConfig);
    return [response.data.location.lat.toString(), response.data.location.lng.toString()];
  }
  async getCurrentAddress() {
    let [lat, long] = await this.getCurrentCoordinate();
    let latStr = lat.toString();
    let longStr = long.toString();
    let url = "https://maps.googleapis.com/maps/api/geocode/json";
    const parameter = { params: { latlng: latStr + "," + longStr, key: API_KEY, result_type: "street_address" } };
    let response = await import_axios.default.post(url, null, parameter);
    if (response.data.results) {
      return response.data.results[0].formatted_address;
    }
    return null;
  }
  async getNearbyPlaces(lat, long) {
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const parameter = {
      params: {
        opennow: "",
        type: "restaurant",
        radius: "50000",
        location: lat + "," + long,
        key: API_KEY
      }
    };
    console.log(parameter.params);
    let response = await import_axios.default.get(url, parameter).catch((error) => {
      console.log(error);
    });
    return response;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleMapAPI
});
//# sourceMappingURL=app.js.map
