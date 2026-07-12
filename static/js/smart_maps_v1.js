


/* ==========================================================
   CIVICAI - SMART MAPS
   PART 1
   PAGE INITIALIZATION
========================================================== */


/* ==========================================================
   WAIT UNTIL PAGE IS FULLY LOADED
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("======================================");
    console.log("CivicAI Smart Maps Loaded");
    console.log("======================================");

});


/* ==========================================================
   CIVICAI - SMART MAPS
   PART 2
   SELECT ALL REQUIRED HTML ELEMENTS
========================================================== */

    /* ======================================================
       ACTION BUTTONS
    ====================================================== */

    const locateBtn = document.getElementById("locate-btn");

    const view3DBtn = document.getElementById("view3d-btn");

    const satelliteBtn = document.getElementById("satellite-btn");

    const refreshBtn = document.getElementById("refresh-btn");

    const fullscreenBtn = document.getElementById("fullscreen-btn");

        /* ======================================================
       PAGE LOADED
    ====================================================== */

    console.log("Buttons Selected Successfully");


    /* ==========================================================
   PART 3
   GPS INFORMATION ELEMENTS
========================================================== */

    /* ======================================================
       CURRENT LOCATION
    ====================================================== */

    const latitudeValue = document.getElementById("latitude-value");

    const longitudeValue = document.getElementById("longitude-value");

    const cityValue = document.getElementById("city-value");

    const stateValue = document.getElementById("state-value");



    /* ======================================================
       GPS STATUS
    ====================================================== */

    const gpsConnection = document.getElementById("gps-connection");

    const gpsAccuracy = document.getElementById("gps-accuracy");

    const lastUpdated = document.getElementById("last-updated");

    /* ==========================================================
   PART 4
   LOCATE ME BUTTON
========================================================== */

    /* ======================================================
       LOCATE BUTTON CLICK
    ====================================================== */

    locateBtn.addEventListener("click", function () {

        console.log("Locate Me Button Clicked");

    });

/* ==========================================================
   PART 5
   CHECK GPS SUPPORT
========================================================== */

    /* ======================================================
       GET USER LOCATION
    ====================================================== */

    locateBtn.addEventListener("click", function () {

        console.log("Checking GPS Support...");

        if (navigator.geolocation) {

            console.log("GPS Supported");

        }

        else {

            console.log("GPS Not Supported");

            alert("Your browser does not support Geolocation.");

        }

    });
    


/* ============================================================
   CIVICAI - SMART MAPS
   PART 5
   LIVE GPS LOCATION
============================================================ */

locateBtn.addEventListener("click", () => {

    console.log("Locate Me Button Clicked");



    /* -----------------------------------------
       CHECK GPS SUPPORT
    ----------------------------------------- */

    if (!navigator.geolocation) {

        console.log("GPS Not Supported");

        alert("Your browser does not support GPS.");

        return;

    }



    console.log("Requesting Current Location...");



    /* -----------------------------------------
       GET CURRENT LOCATION
    ----------------------------------------- */

    navigator.geolocation.getCurrentPosition(

        function (position) {

            console.log("Location Received Successfully");



            /* ---------------------------------
               GET LATITUDE
            ---------------------------------- */

            const currentLatitude = position.coords.latitude;

            console.log("Latitude :", currentLatitude);



            /* ---------------------------------
               GET LONGITUDE
            ---------------------------------- */

            const currentLongitude = position.coords.longitude;

            console.log("Longitude :", currentLongitude);



            /* ---------------------------------
               GET ACCURACY
            ---------------------------------- */

            const currentAccuracy = position.coords.accuracy;

            console.log("Accuracy :", currentAccuracy);



            /* ---------------------------------
               UPDATE UI
            ---------------------------------- */

            latitude.textContent = currentLatitude.toFixed(6);

            longitude.textContent = currentLongitude.toFixed(6);

            accuracy.textContent = currentAccuracy.toFixed(1) + " m";



            console.log("Current Location Updated Successfully");

        },



        function (error) {

            console.log("Location Error");

            console.log(error);

            alert("Unable to fetch your current location.");

        }

    );

});