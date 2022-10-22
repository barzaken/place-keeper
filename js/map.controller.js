'use strict'
let gMarkers = []



function renderPlaces() {
    const places = getPlaces()
    const strHTMLs = places.map(place => `
        <li class="place" onclick="onClickPlace('${place.id}')">
        <button class='delete-btn' onclick="onRemovePlace('${place.id}')">X</button>
        ${place.name}<br>
        </li>
    `)
    document.querySelector('.list-places').innerHTML = strHTMLs.join('')
    renderMarkers()
}


function renderMarkers(){
        const places = getPlaces()
        gMarkers.forEach(marker => marker.setMap(null))
        gMarkers = places.map(({ lat, lng, name }) => {
            const coord = { lat, lng }
            return new google.maps.Marker({
                position: coord,
                map: gMap,
                title: name
            })
        })
}

function onClickPlace(id){
    goPlace(id)
}

function onRemovePlace(id){
    removePlace(id)
    renderPlaces()
}

