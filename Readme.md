# Weather Dashboard

## Description
This Weather Dashboard application allows users to retrieve and view weather forecasts for multiple cities. The application utilizes the OpenWeather API to fetch real-time weather data and displays both current conditions and a 5-day forecast. The application also stores a history of searched cities, enabling users to revisit previous searches easily.

## Features
- Search for a city's weather conditions.
- View current weather conditions including:
  - City name
  - Date
  - Weather icon with description
  - Temperature
  - Humidity
  - Wind speed
- View a 5-day forecast with:
  - Date
  - Weather icon with description
  - Temperature
  - Wind speed
  - Humidity
- Save searched cities in the search history.
- Click on a city in the search history to retrieve its weather data again.
- Backend functionality to store and retrieve search history.

## Technologies Used
- Node.js
- Express.js
- OpenWeather API
- JSON for storing search history
- Fetch API for making HTTP requests
- HTML, CSS, and JavaScript for frontend development

## API Usage
This application retrieves weather data using the OpenWeather API. The API call follows this structure:

https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

- Users must register for an API key.
- Geographical coordinates are required to fetch weather data.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/weather-dashboard.git

Navigate to the project directory:

- cd weather-dashboard

Install Dependencies:

- npm install

Obtain an OpenWeather API key and store it in a .env file:

- API_KEY=your_api_key_here

Run the server:

- node server.js

Open index.html in a browser or access http://localhost:3000.

## Usage

- Enter a city name in the search input field.

- Click "Search" to retrieve weather data.

- View the current weather conditions and 5-day forecast.

- Click on a previously searched city to reload its weather data.

- Cities remain saved in search history until manually deleted.

Future Enhancements

- Improve UI with additional styling.

- Implement error handling for invalid city searches.

- Add user authentication for personalized search history.

- Implement caching to reduce API call frequency.

License

This project is open-source and available under the MIT License.

## Display Example 

![Screenshot of Weather Dashboard](/client/src/imgs/screenshot.png)

## Contact

For any questions or support, feel free to reach out. 
- Email: karinag.000@gmail.com
- GitHub: https://github.com/karinuhgarcia
- LinkedIn: https://www.linkedin.com/in/-karinagarcia/
