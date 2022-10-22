'use strict'

const PLACES_KEY = 'places'

let gMap
const {zoomFactor} = loadSettings()
let gZoomFactor = +zoomFactor
let gPlaces = loadFromStorage(PLACES_KEY) || []

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
    _savePlaces()
    renderPlaces()
}
function _savePlaces(){
    saveToStorage(PLACES_KEY,gPlaces)
}

function initMap(lat, lng) {
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: gZoomFactor
    }

    gMap = new google.maps.Map(
        elMap,
        options
    )

    gMap.addListener('click', function (e) {
        let placeName = prompt('Enter Location Name')
        addPlace(e.latLng, placeName)
        _savePlaces()
    })
    renderPlaces()
}


function addPlace(latLng, placeName,id) {
    let coords =  JSON.stringify(latLng.toJSON())
    let {lat} = JSON.parse(coords)
    let {lng} = JSON.parse(coords)
    gPlaces.push({
        id : makeId(),
        lat,
        lng,
        name: placeName,
    })
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