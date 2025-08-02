Hyderabad Safety Map
An interactive web application that displays safety ratings for different zones in Hyderabad, India. This initial version uses simulated data to showcase the core functionality. The map is designed to be fully interactive, allowing users to zoom and pan, with data points indicating the safety score of various locations.

Current Features
Interactive Map: Utilizes Leaflet.js to provide a smooth, interactive map experience.

Safety Data Visualization: Displays safety scores for different zones using color-coded circles (Green for safe, Yellow for moderate, Red for unsafe).

Responsive Design: The layout is optimized for both desktop and mobile devices.

Collapsible Info Panel: The information panel can be collapsed to provide a full-screen map view, which is especially useful on smaller screens.

Periodic Data Refresh: The application automatically refreshes the simulated data every 60 seconds.

Tech Stack
Frontend: HTML5, CSS3, JavaScript (ES6 Modules)

Mapping Library: Leaflet.js - A lightweight, open-source library for interactive maps.

Data Source: Currently uses a local, simulated dataset for demonstration purposes.

Project Structure
The project is organized into a clean and scalable structure to facilitate future development.

hyderabad-safety-map/
│
├── 📄 index.html         # Main HTML file
│
├── 📁 assets/
│   ├── 📁 css/
│   │   └── 📄 style.css   # All application styles
│   │
│   └── 📁 js/
│       ├── 📄 main.js    # Main application controller
│       ├── 📄 map.js     # Map-related logic
│       └── 📄 api.js     # Data fetching logic
│
└── 📄 README.md          # Project documentation

Setup and Installation
To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/<your-username>/hyderabad-safety-map.git

Navigate to the project directory:

cd hyderabad-safety-map

Run a local server:
Since the project uses JavaScript modules, you need to serve the files from a local web server to avoid CORS errors. A simple way to do this is with Python's built-in server.

If you have Python 3:

python -m http.server

If you have Python 2:

python -m SimpleHTTPServer

Open in browser:
Open your web browser and go to http://localhost:8000.

Roadmap & Future Enhancements
The following features are planned for future releases:

Live Data Integration: Replace the simulated data by integrating with the Indian Urban Data Exchange (IUDX) to fetch real-time SafetiPin data.

Additional Data Layers: Incorporate more data types, such as traffic information, public transport routes, and street lighting coverage.

User Contributions: Allow users to submit their own safety ratings and comments for different areas.

Advanced Controls: Implement features for filtering data and searching for specific locations.