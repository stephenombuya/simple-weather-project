# **Weather Dashboard 🌤️**
This project is a simple Weather Dashboard that allows users to search for current weather information by city. The application displays real-time weather data based on the user’s input.



### **Features**
- **City-Based Weather Search**: Users can enter a city name and view current weather data.
- **Dynamic Weather Display**: Weather information is fetched dynamically and displayed without refreshing the page.
- **Responsive Design**: The layout adapts to various screen sizes for an optimal user experience on both desktop and mobile devices.



### **Technologies Used**
- **HTML5**: Provides the basic structure of the webpage.
- **CSS3**: Adds styling to the webpage for a visually appealing interface.
- **JavaScript**: Handles the functionality, including user input and fetching weather data.
- **OpenWeatherMap API** (optional): You can integrate a weather API like OpenWeatherMap to fetch real-time weather data.



### **Live Demo**
[Website](https://steveproject.netlify.app/)



### **Project Structure**

```
Weather-Dashboard/
│
├── index.html        # Main HTML structure
├── styles.css        # CSS file for styling the dashboard
├── app.js            # JavaScript file for search functionality and API calls
└── README.md         # Project documentation
```



### **How to Use**
1. Clone the repository:

```
git clone https://github.com/stephenombuya/simple-weather-project/tree/main
```

2. Navigate to the project directory:

```
cd simple-weather-project
```

3. Open the index.html file in a web browser:

```
open index.html
```

4. Enter a city name in the search bar and click "Search" to get the current weather.



### **Setting up an API (Optional)**
To fetch real-time weather data, you need to integrate the OpenWeatherMap API or a similar weather API. Follow these steps:

- Sign up for an API key from **OpenWeatherMap**.
Modify the app.js file to include your API key and make an API request to get weather data:

```
const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Process and display weather data here
  });
```



### **Future Enhancements**
1. **Weather Forecast**: Display a 5-day weather forecast in addition to current weather data.
2. **Geolocation**: Automatically detect the user's location and display local weather.
3. **Weather Icons**: Include dynamic icons that represent the current weather (e.g., sun, clouds, rain).
4. **Error Handling**: Add better error messages for invalid or misspelled city names.
5. **Favorites**: Allow users to save their favorite cities for quick access.




### **Customization**
You can easily customize the Weather Dashboard by:

- **Changing the layout**: Modify the styles.css to change the look and feel of the dashboard.
- **API Data**: Add more weather parameters (e.g., humidity, wind speed) to display detailed weather information.



### **Browser Support**
This project is supported on modern browsers like Chrome, Firefox, Safari, and Edge.



### **Contributing**
Contributions are welcome! If you'd like to add new features, improve the design, or optimize the code, feel free to submit a pull request or open an issue.



### **License**
This project is licensed under the GNU License. See the [LICENSE](https://github.com/stephenombuya/simple-weather-project/blob/main/LICENSE) file for details.

