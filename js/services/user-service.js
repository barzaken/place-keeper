'use strict'
const STORAGE_KEY = 'userSettings'


function saveSettings(settings) {
    saveToStorage(STORAGE_KEY, settings)
}

function getSettings() {
    return loadFromStorage(STORAGE_KEY)
}


