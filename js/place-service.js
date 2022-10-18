'use strict'
var gMap
var gPlaces = []
var gMarkers = []

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude)
}


function getPlaces(){
    return gPlaces
}

function goPlace(id){
    let place = gPlaces.find(place => place.id === id)  
    let {lat} = place
    let {lng} = place
    gMap.setCenter(new google.maps.LatLng(lat,lng))
}


function removePlace(id){
    let idx = gPlaces.findIndex(place => place.id === id)
    gPlaces.splice(idx,1)
    let markerIdx = gMarkers.findIndex(marker => marker.id === id)
    gMarkers[markerIdx].setMap(null)
}

function initMap(lat, lng) {
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: gZoomFactor || 8
    }

    gMap = new google.maps.Map(
        elMap,
        options
    )

    // var marker = new google.maps.Marker({
    //     map: gMap,
    //     position: { lat, lng },
    //     title: 'Positions'
    // })

    gMap.addListener('click', function (e) {
        let placeName = prompt('Enter Location Name')
        let id = makeId()
        addPlace(e.latLng, placeName,id)
        addMarker(e.latLng, placeName,id);
    })
}


function addPlace(latLng, placeName,id) {
    let coords =  JSON.stringify(latLng.toJSON())
    let {lat} = JSON.parse(coords)
    let {lng} = JSON.parse(coords)
    gPlaces.push({
        id,
        lat,
        lng,
        name: placeName
    })
}

function addMarker(latLng, placeName,id) {
    let marker = new google.maps.Marker({
        id,
        map: gMap,
        position: latLng,
        draggable: true,
        title: placeName,
    })
    gMarkers.push(marker)
    renderPlaces()
}




function handleLocationError(error) {
    var locationError = document.getElementById("locationError")

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}