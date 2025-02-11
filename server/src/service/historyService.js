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
// TODO: Define a City class with name and id properties
const promises_1 = __importDefault(require("node:fs/promises"));
const uuid_1 = require("uuid");
class City {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    // TODO: Define a read method that reads from the searchHistory.json file
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield promises_1.default.readFile('db/db.json', {
                flag: 'a+',
                encoding: 'utf-8',
            });
        });
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    write(cities) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield promises_1.default.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
        });
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    getCities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.read().then((cities) => {
                let parseCities;
                try {
                    parseCities = [].concat(JSON.parse(cities));
                }
                catch (error) {
                    parseCities = [];
                }
                return parseCities;
            });
        });
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    addCity(city) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!city) {
                throw new Error('City name is required');
            }
            const newCities = { name: city, id: (0, uuid_1.v4)() };
            return yield this.getCities()
                .then((cities) => {
                if (cities.find((index) => index.name === city)) {
                    return cities;
                }
                return [...cities, newCities];
            })
                .then((cities) => this.write(cities))
                .then(() => newCities);
        });
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    removeCity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getCities()
                .then((cities) => cities.filter((cities) => cities.id !== id))
                .then((filteredCities) => this.write(filteredCities));
        });
    }
}
exports.default = new HistoryService();
