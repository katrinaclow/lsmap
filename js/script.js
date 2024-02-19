// // URL of the publicly accessible file in Google Drive
// const fileUrl = 'https://drive.google.com/uc?export=download&id=1L_MQUyLGuGfCthoAlB_pl2lHFr_0nxOi';

// // Fetch the file using the Fetch API
// fetch(fileUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json(); // Assuming the file is JSON data
//   })
//   .then(data => {
//     // Process the fetched data
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });

  // URL of the publicly accessible file in Google Drive
const fileUrl = 'https://drive.google.com/uc?export=download&id=1L_MQUyLGuGfCthoAlB_pl2lHFr_0nxOi)';

// Fetch the file using the Fetch API
fetch(fileUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob(); // Read the response as a Blob
  })
  .then(blob => {
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'jobData.geojson'; // Set desired filename
    downloadLink.click(); // Trigger the download
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



// const fs = require('fs');
// const path = require('path');
// const { GoogleAuth } = require('google-auth-library');
// const { google } = require('googleapis');

// /**
//  * Downloads a file from Google Drive to a specified location on the local file system.
//  * @param {string} realFileId The file ID on Google Drive.
//  * @param {string} destinationPath The destination path where the file should be saved.
//  * @returns {Promise<void>} A Promise that resolves when the file is successfully downloaded and saved.
//  */
// async function downloadFile(realFileId, destinationPath) {
//   try {
//     // Authenticate with Google Drive API
//     const auth = new GoogleAuth({
//       scopes: 'https://www.googleapis.com/auth/drive',
//     });
//     const drive = google.drive({ version: 'v3', auth });

//     // Download the file
//     const response = await drive.files.get({
//       fileId: realFileId,
//       alt: 'media',
//     }, { responseType: 'stream' });

//     // Create a writable stream to save the file to the destination path
//     const destStream = fs.createWriteStream(destinationPath);

//     // Pipe the file content from the API response stream to the destination stream
//     response.data.on('error', err => {
//       throw err;
//     }).pipe(destStream);

//     // Wait for the download to finish
//     await new Promise((resolve, reject) => {
//       destStream.on('finish', resolve);
//       destStream.on('error', reject);
//     });

//     console.log('File downloaded successfully to:', destinationPath);
//   } catch (err) {
//     console.error('Error downloading file:', err);
//     throw err;
//   }
// }

// // Example usage:
// const fileId = '1L_MQUyLGuGfCthoAlB_pl2lHFr_0nxOi';
// const destinationPath = '/Users/katrinaclow/jobData.geoJSON'; // Replace with your desired destination path
// downloadFile(fileId, destinationPath)
//   .then(() => console.log('Download completed.'))
//   .catch(err => console.error('Download failed:', err));


// set page opening map view to location
var map = L.map("map").setView([46.45236041353664, -63.302893192172775], 9);

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

