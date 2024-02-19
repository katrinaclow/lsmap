// set page opening map view to location
var map = L.map('map', {
  center: [46.45236041353664, -63.302893192172775],
  zoom: 9,
  dragging: true, // Enables dragging the map with mouse/touch
  scrollWheelZoom: true // Enables zooming with the mouse wheel
});


// initialize control layers
var controlLayers = L.control
  .layers(null, null, { position: "topright", collapsed: false })
  .addTo(map);

// base map options
var OpenStreetMap = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);
controlLayers.addBaseLayer(OpenStreetMap, "Basic");

var OpenTopoMap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }
);
controlLayers.addBaseLayer(OpenTopoMap, "Topographical");

var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
  }
);
controlLayers.addBaseLayer(Esri_WorldImagery, "Satellite");

// defines marker icon parameters
var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  },
});

var completeIcon = L.icon({
  iconUrl:
    "https://clipart-library.com/images_k/red-check-mark-transparent-background/red-check-mark-transparent-background-22.png",
  iconSize: [20, 20],
});
// creates different marker icons
function createLeafIcon(iconUrl) {
  return new LeafIcon({ iconUrl });
}

// assigns marker icons
var redIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
);
orangeIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png"
);
yellowIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
);
greenIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
);
blueIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
);
purpleIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png"
);
greyIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png"
);
blackIcon = createLeafIcon(
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png"
);

function checkStatus(value) {
  const acceptedValues = ["yes", "y", "na"];

  return acceptedValues.includes(value.toLowerCase());
}

fetch("jobData.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Create an object to store layers by year
    var yearLayers = {};
    var completedLayer = L.layerGroup().addTo(map);

    L.geoJSON(data.features, {
      onEachFeature: function (feature, layer) {
        // Extract the year from the dateCreated property
        var icon = redIcon;
        var isComplete = false;
        var year = new Date(feature.properties.dateCreated).getFullYear();
        var complete = feature.properties.finalPlanSubmitted;
        var pinsSet = feature.properties.surveyMarkersSet;
        var fieldwork = feature.properties.initialFieldworkCompleted;

        // If the year layer doesn't exist, create it
        
        if (!yearLayers[year]) {
          yearLayers[year] = L.layerGroup().addTo(map);
        }

        if (checkStatus(fieldwork)) {
          icon = yellowIcon;
        }
        if (checkStatus(pinsSet)) {
          icon = orangeIcon;
        }
        if (checkStatus(complete)) {
          icon = completeIcon;
          isComplete = true;
        }

        // Add the marker to the corresponding year layer
        var popupContent =
          "<h1>" +
          feature.properties.jobNumber +
          "</h1><p>Client: " +
          feature.properties.client +
          "<p>Location: " +
          feature.properties.civic +
          " " +
          feature.properties.road +
          ", " +
          feature.properties.location +
          "</p><p>PID: " +
          feature.properties.pid +
          "</p><p>Initial Fieldwork Completed: " +
          fieldwork +
          "</p><p>Survey Markers Set: " +
          pinsSet +
          "</p><p>Completed: " +
          complete +
          "</p>";

        var marker = L.marker(layer.getLatLng(), { icon }).bindPopup(
          popupContent
        );

        // Add the marker to the corresponding year layer
        marker.addTo(yearLayers[year]);

        if (isComplete) {
          marker.addTo(completedLayer);
        }
      },
    });

    // Add a control to switch between year layers
    L.control.layers(null, yearLayers, { collapsed: true }).addTo(map);
    controlLayers.addOverlay(completedLayer, "Completed Jobs", {
      collapsed: false,
      // checked: true,
    });
  });

var monumentMarker = {
  radius: 4,
  fillColor: "#00bfff",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var monumentsLayer = L.layerGroup();

fetch("PEIControlMonuments.geojson")
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, monumentMarker);
      },
    }).addTo(monumentsLayer);
  });

// Add monuments layer to the control layers
controlLayers.addOverlay(monumentsLayer, "Monuments", {
  collapsed: false,
  checked: false,
});

