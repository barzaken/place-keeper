'use strict'

function renderPlaces() {
    const places = getPlaces()
    const strHTMLs = places.map(place => `
        <li class="place" onclick="onClickPlace('${place.id}')">
        <button class='delete-btn' onclick="onRemovePlace('${place.id}')">X</button>
        ${place.name}<br>
        </li>
    `)
    document.querySelector('.list-places').innerHTML = strHTMLs.join('')
}

function onClickPlace(id){
    goPlace(id)
}

function onRemovePlace(id){
    removePlace(id)
    renderPlaces()
}