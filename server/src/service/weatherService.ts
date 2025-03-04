import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Add this
import { dirname, resolve } from 'path'; // Add this

// Replicate __dirname in ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../../../.env')

// Load .env from root directory
dotenv.config({
  path: envPath // Path resolves to root/.env
});

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
/*class Weather {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{ description: string; main: string }>;
  };
  daily: Array<{
    dt: number;
    temp: { day: number };
    weather: Array<{ description: string; main: string }>;
  }>;

  constructor(data: any) {
    this.current = {
      temp: data.current.temp,
      feels_like: data.current.feels_like,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_speed,
      weather: data.current.weather,
    };
    this.daily = data.daily.map((item: any) => ({
      dt: item.dt,
      temp: item.temp,
      weather: item.weather,
    }));
  }
}*/

// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
class WeatherService {
  private cityName = '';
  private baseURL?: string;
  private apiKey?: string;

  constructor() {
    console.log(process.env)
    this.baseURL = process.env.REACT_APP_WEATHERSERVICE_API_URL || '';
    this.apiKey = process.env.REACT_APP_WEATHERSERVICE_API_KEY || '';
    if (!this.baseURL || !this.apiKey) {
      throw new Error('API_BASE_URL and API_KEY must be provided');
    }
  }
  async getWeatherForCity(city: string) {
    this.cityName = city;

    //Call the API to get LAT/LONG
    const getLatLongApiUrl = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`
    const response = await fetch(getLatLongApiUrl);

    const latLongResult: Coordinates[] = await response.json() //translate to json

    const cityCoordinates: Coordinates = {
      lat: latLongResult[0].lat,
      lon: latLongResult[0].lon,
    }
    const getWeatherDataApi = `${this.baseURL}/data/2.5/forecast?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&appid=${this.apiKey}`

    const weatherResponse = await fetch(getWeatherDataApi);
    const weather: any = await weatherResponse.json()
    const AllWeather = [];

    for (let i = 0; i < 5; i++) {
      const weatherData: any = weather.list[i];
      const timestamp = weatherData.dt * 1000;
      const date = new Date(timestamp);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      const aWeather = {
        temp: weatherData.main.temp,
        tempF: weatherData.main.temp,
        icon: weatherData.weather[0].icon,
        iconDescription: weatherData.weather[0].description,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        weather: weatherData.weather[0].description,
        date: formattedDate,
        city: city,
      };

      AllWeather.push(aWeather);
    }

    return [AllWeather[0], AllWeather];
  }
}

export default new WeatherService();

