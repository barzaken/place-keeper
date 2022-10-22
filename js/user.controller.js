'use strict'


function onSavePrefs(ev) {
    ev.preventDefault()
    const elForm = ev.target
    const formData = new FormData(elForm)
    const userSettings = Object.fromEntries(formData)
    saveSettings(userSettings)
}

function loadSettings(){
    let settings = getSettings()
    if(!settings) return 
    console.log(settings)
    const { bgColor, textColor } = settings
    console.log(textColor)
    const elBody = document.querySelector('body');
    elBody.style.backgroundColor = bgColor
    elBody.style.color = textColor
    return settings
}

function showZoom(newVal) {
    document.getElementById('sZoom').innerHTML = newVal
}

function onChangeBgColor(color){
    const elBody = document.querySelector('body');
    elBody.style.backgroundColor = color
}
function onChangeTxtColor(color){
    const elBody = document.querySelector('body');
    elBody.style.color = color
}