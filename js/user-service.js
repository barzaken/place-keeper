'use strict'

let gName 
let gBgColor
let gTxtColor
let gZoomFactor 
let gStartLocation


function onSavePrefs(ev) {
    ev.preventDefault()
    gName = document.getElementById('name').value
    gBgColor = document.getElementById('bg-color').value
    gTxtColor = document.getElementById('txt-color').value
    gZoomFactor = document.getElementById('zoom').value
    gStartLocation = document.getElementById('start-location').value
}

function showZoom(newVal) {
    document.getElementById('sZoom').innerHTML = newVal
}
