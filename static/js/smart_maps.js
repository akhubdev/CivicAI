

/* ==========================================================
                    CIVICAI
             SMART MAPS JAVASCRIPT
========================================================== */

/* ==========================================================
                    APPLICATION START
========================================================== */

document.addEventListener("DOMContentLoaded", startSmartMaps);



/* ==========================================================
                    DOM CONTROLLER
========================================================== */

const DOM = {

    latitude: document.getElementById("latitude"),

    longitude: document.getElementById("longitude"),

    city: document.getElementById("city"),

    state: document.getElementById("state"),

    gpsStatus: document.getElementById("gps-status"),

    gpsAccuracy: document.getElementById("gps-accuracy"),

    lastUpdate: document.getElementById("last-update"),

    locateButton: document.getElementById("locate-btn"),

    refreshButton: document.getElementById("refresh-btn"),

    fullscreenButton: document.getElementById("fullscreen-btn"),

    satelliteButton: document.getElementById("satellite-btn"),

    view3DButton: document.getElementById("view3d-btn"),

    mapContainer: document.getElementById("smart-map"),

    activityList: document.querySelector(".activity-list")

};

/* ==========================================================
                    MAP VARIABLES
========================================================== */

let civicMap = null;

let currentMarker = null;

let accuracyCircle = null;

/* ==========================================================
                APPLICATION START
========================================================== */

function startSmartMaps() {

    console.clear();

    console.log("======================================");
    console.log("🚀 CivicAI Smart Maps Started");
    console.log("======================================");

    initializeApplication();

}

/* ==========================================================
                GET CITY & STATE
========================================================== */

async function getAddress(latitude, longitude) {

    try {

        const url =
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        const response = await fetch(url);

        const data = await response.json();

        DOM.city.textContent =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

        DOM.state.textContent =
            data.address.state ||
            "Unknown";

    }

    catch (error) {

        console.log(error);

        DOM.city.textContent = "Unavailable";

        DOM.state.textContent = "Unavailable";

    }

}

/* ==========================================================
                ACTIVITY LOGGER
========================================================== */

function addActivity(message) {

    if (!DOM.activityList) return;

    const activity = document.createElement("div");

    activity.className = "activity-item";

    activity.innerHTML = "📍 " + message;

    DOM.activityList.prepend(activity);

}


/* ==========================================================
                INITIALIZE BUTTONS
========================================================== */

function initializeButtons() {

    if (DOM.locateButton) {

        DOM.locateButton.addEventListener("click", locateUser);

    }

    if (DOM.refreshButton) {

        DOM.refreshButton.addEventListener("click", refreshLocation);

    }

    if (DOM.fullscreenButton) {

        DOM.fullscreenButton.addEventListener(

            "click",

            toggleFullscreen

        );

    }

    if (DOM.satelliteButton) {

        DOM.satelliteButton.addEventListener(

            "click",

            satelliteMode

        );

    }

    if (DOM.view3DButton) {

        DOM.view3DButton.addEventListener(

            "click",

            view3DMode

        );

    }

    console.log("✅ Buttons Initialized");

}

/* ==========================================================
                MAP UTILITIES
========================================================== */

let userLatitude = null;

let userLongitude = null;

let userAccuracy = null;


/* ==========================================================
                SAVE LOCATION
========================================================== */

function saveLocation(position) {

    userLatitude = position.coords.latitude;

    userLongitude = position.coords.longitude;

    userAccuracy = position.coords.accuracy;

}



/* ==========================================================
                UPDATE LOCATION
========================================================== */

async function updateLocation(position) {

    saveLocation(position);

    DOM.latitude.textContent = userLatitude.toFixed(6);

    DOM.longitude.textContent = userLongitude.toFixed(6);

    DOM.gpsAccuracy.textContent =
        userAccuracy.toFixed(1) + " m";

    DOM.gpsStatus.textContent = "Connected";

    DOM.lastUpdate.textContent =
        new Date().toLocaleTimeString();

    await getAddress(userLatitude, userLongitude);

    addActivity("GPS Updated");

    // updateMap();
    /* ==========================================================
                UPDATE MAP MARKER
    ========================================================== */

    if (!civicMap) return;

    if (currentMarker) {

        civicMap.removeLayer(currentMarker);

    }

    if (accuracyCircle) {

        civicMap.removeLayer(accuracyCircle);

    }

    if (!civicMap) return;

    currentMarker = L.marker([userLatitude, userLongitude])
        .addTo(civicMap);

    accuracyCircle = L.circle(
        [userLatitude, userLongitude],

        {
            radius: userAccuracy,
            color: "#2563eb",
            fillColor: "#2563eb",
            fillOpacity: 0.15
        }
    ).addTo(civicMap);

    civicMap.setView([userLatitude, userLongitude], 16);

    currentMarker.bindPopup(`
    <b>📍 Your Current Location</b><br>
    Latitude : ${userLatitude.toFixed(6)}<br>
    Longitude : ${userLongitude.toFixed(6)}
    `).openPopup();

}



/* ==========================================================
                UPDATE MAP
========================================================== */

/*function updateMap() {

    if (!civicMap) return;

    civicMap.setView(
        [userLatitude, userLongitude],
        16
    );

}*/



/* ==========================================================
                BUTTON STATES
========================================================== */

function disableButtons() {

    if (DOM.locateButton)
        DOM.locateButton.disabled = true;

    if (DOM.refreshButton)
        DOM.refreshButton.disabled = true;

}



/* ==========================================================
                ENABLE BUTTONS
========================================================== */

function enableButtons() {

    if (DOM.locateButton)
        DOM.locateButton.disabled = false;

    if (DOM.refreshButton)
        DOM.refreshButton.disabled = false;

}



/* ==========================================================
                LOADING START
========================================================== */

function startLoading() {

    disableButtons();

    DOM.gpsStatus.textContent =
        "Connecting...";

}



/* ==========================================================
                LOADING END
========================================================== */

function stopLoading() {

    enableButtons();

}



/* ==========================================================
                UPDATE SUCCESS
========================================================== */


async function locationSuccess(position) {

    stopLoading();

    await updateLocation(position);

}



/* ==========================================================
                UPDATE ERROR
========================================================== */

function locationError(error) {

    stopLoading();

    console.log(error);

    if (error.code === 3) {
        console.log("GPS Timeout - Keeping Previous Location");
        return;
    }

    DOM.gpsStatus.textContent = "Disconnected";
    DOM.gpsAccuracy.textContent = "-- m";
    DOM.lastUpdate.textContent = "Failed";

    addActivity("GPS Failed");
}





/* ==========================================================
                REFRESH
========================================================== */

function refreshLocation() {

    startLoading();

    locateUser();

}



/* ==========================================================
                LOCATE USER
========================================================== */

function locateUser() {

    if (!navigator.geolocation) {

        alert("Geolocation Not Supported");

        return;

    }

    startLoading();

    navigator.geolocation.getCurrentPosition(

        locationSuccess,

        locationError,

        {

            enableHighAccuracy: false,

            timeout: 30000,

            maximumAge: 0

        }

    );

}



/* ==========================================================
                FUTURE FEATURES
========================================================== */

function satelliteMode() {

    addActivity("Satellite Mode");

    console.log("Satellite Mode");

}



function view3DMode() {

    addActivity("3D View");

    console.log("3D View");

}



/* ==========================================================
                FULL SCREEN
========================================================== */

function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    }

    else {

        document.exitFullscreen();

    }

}


/* ==========================================================
            APPLICATION INITIALIZER
========================================================== */

function initializeApplication() {

    console.log("Initializing Smart Maps...");

    initializeMap();

    initializeButtons();

    addActivity("Application Started");

    autoLocate();

    startLiveTracking();

}

/* ==========================================================
                INITIALIZE LEAFLET MAP
========================================================== */

function initializeMap() {


    if (typeof L === "undefined") {

        console.error("Leaflet library not loaded.");

        return;

    }

    if (civicMap) return;

    civicMap = L.map("smart-map").setView([20.2961, 85.8245], 7);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap Contributors"
        }
    ).addTo(civicMap);

    console.log("🗺️ Smart Map Initialized");

    addActivity("🗺️ Smart Map Initialized");

    addIssueMarkers();

}

/* ==========================================================
                ISSUE MARKERS
========================================================== */

const civicIssues = [

{
    title: "Garbage Overflow",
    lat: 21.8595,
    lng: 84.0112,
    severity: "High",
    icon: "🗑️"
},

{
    title: "Pothole",
    lat: 21.8550,
    lng: 84.0180,
    severity: "Medium",
    icon: "🕳️"
},

{
    title: "Broken Street Light",
    lat: 21.8615,
    lng: 84.0065,
    severity: "Low",
    icon: "💡"
}

];
function addIssueMarkers() {

    if (!civicMap) return;

    civicIssues.forEach(issue => {

        let color = "green";

        if (issue.severity === "High") color = "red";
        else if (issue.severity === "Medium") color = "orange";

        const customIcon = L.divIcon({

            html: `<div style="
                font-size:26px;
                text-align:center;
            ">${issue.icon}</div>`,

            className: "",

            iconSize: [30, 30]

        });

        L.marker([issue.lat, issue.lng], {

            icon: customIcon

        })
        .addTo(civicMap)
        .bindPopup(`
            <h3>${issue.icon} ${issue.title}</h3>
            <b>Severity:</b> ${issue.severity}
        `);

    });

}


/* ==========================================================
                PAGE AUTO LOCATION
========================================================== */

function autoLocate() {

    console.log("Auto Detecting Location...");

    locateUser();

}


/* ==========================================================
                LIVE WATCH LOCATION
========================================================== */

let watchID = null;



function startLiveTracking() {

    if (!navigator.geolocation) return;

    watchID = navigator.geolocation.watchPosition(

        locationSuccess,

        locationError,

        {

            enableHighAccuracy: true,

            maximumAge: 0,

            timeout: 30000

        }

    );



    addActivity("Live Tracking Started");

}



function stopLiveTracking() {

    if (watchID != null) {

        navigator.geolocation.clearWatch(watchID);

    }



    addActivity("Live Tracking Stopped");

}

/* ==========================================================
                CLEANUP
========================================================== */

window.addEventListener(

    "beforeunload",

    () => {

        stopLiveTracking();

    }

);



/* ==========================================================
                FINISHED
========================================================== */

console.log("======================================");

console.log("✅ Smart Maps JavaScript Loaded");

console.log("======================================");