import axios from 'axios';

const API_KEY = process.env['GOOGLE_API_KEY']
console.log(API_KEY);

class GoogleMapAPI {
  currentCoordConfig = {
    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + API_KEY,
    body: "",
    method: "POST"
  };


  async getCurrentCoordinate() {
    let response = await axios(this.currentCoordConfig);
    return [response.data.location.lat.toString(), response.data.location.lng.toString()];
  }

  async getCurrentAddress() {
    let [lat, long] = await this.getCurrentCoordinate();
    let latStr = lat.toString();
    let longStr = long.toString();
    let url = 'https://maps.googleapis.com/maps/api/geocode/json'
    const parameter = { params: { latlng: latStr + ',' + longStr, key: API_KEY, result_type: 'street_address' } };
    let response = await axios.post(url, null, parameter);
    if (response.data.results) {
      return response.data.results[0].formatted_address
    }
    return null;
  }

  async getNearbyPlaces(lat: string, long: string) {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const parameter = {
      params: {
        opennow: '',
        type: 'restaurant',
        radius: '50000',
        location: lat + ',' + long,
        key: API_KEY
      }
    };
    console.log(parameter.params);
    let response = await axios.get(url, parameter).catch((error) => {
      console.log(error);
    });
    return response;
  }
}

export { GoogleMapAPI };