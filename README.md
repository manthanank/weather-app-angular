# Angular Weather App

This is a weather application built with Angular that displays the weather forecast for the current day, the previous day, and the next day based on the user's current location or a specified city. The app fetches weather data from the OpenWeatherMap API and displays relevant weather details along with icons.

## Features

- Displays weather forecast for the current, previous, and next day
- Shows temperature, humidity, wind speed, and weather description
- Displays weather icons based on the weather condition
- Allows users to search for weather information by city
- Automatically fetches weather data based on the user's current location

## Prerequisites

- Node.js and npm installed
- Angular CLI installed
- OpenWeatherMap API key

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/manthanank/weather-app-angular.git
cd weather-app-angular
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Obtain OpenWeatherMap API Key

Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get your API key.

### 4. Set Up Environment Variables

Replace `YOUR_API_KEY` with your actual OpenWeatherMap API key in `weather.service.ts`:

```typescript
private apiKey = 'YOUR_API_KEY';
```

### 5. Run the Application

```sh
ng serve
```

Open your browser and navigate to `http://localhost:4200`.

## Project Structure

- `src/app/weather.service.ts`: Service to fetch weather data from OpenWeatherMap API
- `src/app/weather/weather.component.ts`: Component to display weather information
- `src/app/weather/weather.component.html`: Template for weather component
- `src/app/weather/weather.component.css`: Styles for weather component
- `src/app/weather.model.ts`: Interfaces for weather data

## Implementation Details

### weather.model.ts

Contains TypeScript interfaces for the weather data fetched from the OpenWeatherMap API.

### weather.service.ts

Service that provides methods to fetch weather data by city or by geographic coordinates using the OpenWeatherMap API.

### weather.component.ts

Component that handles the display of weather data. It includes methods to get the current location, process weather data, and calculate daily averages.

### weather.component.html

Template for displaying the weather data. Includes input for city search and displays weather information with icons for the current, previous, and next days.

### weather.component.css

CSS styles for the weather component. Includes styles for layout, buttons, and weather icons.

## Example

### Weather App Interface

![Weather App Interface](/public/screenshot.png)

### Weather Icons

Weather icons are fetched using the icon code provided by the OpenWeatherMap API. The icon URL format is: `https://openweathermap.org/img/wn/${icon}@2x.png`.

## License

This project is licensed under the MIT License.

---
