"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    constructor() {
        this.cityName = '';
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
        if (!this.baseURL || !this.apiKey) {
            throw new Error('API_BASE_URL and API_KEY must be provided');
        }
    }
    // TODO: Create fetchLocationData method
    fetchLocationData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.buildGeocodeQuery());
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }
            return response.json();
        });
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        return {
            lat: locationData.lat,
            lon: locationData.lon,
        };
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery() {
        return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.apiKey}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    fetchAndDestructureLocationData() {
        return __awaiter(this, void 0, void 0, function* () {
            const locationData = yield this.fetchLocationData();
            return this.destructureLocationData(locationData[0]);
        });
    }
    // TODO: Create fetchWeatherData method
    fetchWeatherData(coordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.buildWeatherQuery(coordinates));
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        });
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const weather = response.list[0];
        return {
            temp: weather.main.temp,
            feelsLike: weather.main.feels_like,
            humidity: weather.main.humidity,
            windSpeed: weather.wind_speed,
            weather: weather.weather[0].description,
        };
    }
    // TODO: Complete buildForecastArray method
    getWeatherForCity(city) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cityName = city;
            const coordinates = yield this.fetchAndDestructureLocationData();
            const weatherData = yield this.fetchWeatherData(coordinates);
            const currentWeather = this.parseCurrentWeather(weatherData);
            // const forecast = this.buildForecastArray(weatherData.daily);
            return {
                city,
                currentWeather,
                // forecast,
            };
        });
    }
}
exports.default = new WeatherService();
