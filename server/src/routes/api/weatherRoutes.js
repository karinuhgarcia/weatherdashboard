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
const express_1 = require("express");
const historyService_js_1 = __importDefault(require("../../service/historyService.js"));
const weatherService_js_1 = __importDefault(require("../../service/weatherService.js"));
const router = (0, express_1.Router)();
// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityName } = req.body;
    if (!cityName) {
        return res.status(400).json({ message: 'City name is required' });
    }
    try {
        //Fetch/GET weather data from the city name
        const weatherData = yield weatherService_js_1.default.getWeatherForCity(cityName);
        // TODO: save city to search history
        yield historyService_js_1.default.addCity(cityName);
        return res.status(200).json(weatherData);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch weather data' });
    }
}));
// TODO: GET search history
router.get('/history', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield historyService_js_1.default.getCities();
        res.status(200).json(history);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve search history' });
    }
}));
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCity = yield historyService_js_1.default.removeCity(id);
        res.status(200).json(deletedCity);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete city from search history' });
    }
}));
exports.default = router;
