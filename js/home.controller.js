function onLoad(){
    let {name} = loadSettings()
    let elUserName = document.querySelector('h1')
    elUserName.innerText = 'hello ' +  name
}