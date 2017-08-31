
var wsUri = 'ws://echo.websocket.org/';
var output, input, wstestform, ws;

function init() {
    output = document.getElementById('output');
    input = document.getElementById('input');
    wstestform = document.getElementById('wstestform');
    wstestform.onsubmit = onSubmit;
    ws = setupWebSocket();
}

function onSubmit(evt) {
    evt.preventDefault();
    let inputMessage = input.value;
    input.value = '';
    doSend(inputMessage);
    onMessage({data: inputMessage}, 'Sent: ')
}

function setupWebSocket() {
    output.innerHTML = '';
    let ws = new WebSocket(wsUri);
    ws.onopen = function (evt) { onOpen(evt) };
    ws.onclose = function (evt) { onClose(evt) };
    ws.onmessage = function (evt) { onMessage(evt, 'Recieved: ') };
    ws.onerror = function (evt) { onError(evt) };
    return ws;
}

function onOpen(evt) {
    console.log('Websocket Opened')
}

function onClose(evt) {
    console.log('Websocket Closed')
}

function onMessage(evt, caller) {
    let pre = document.createElement('p');
    pre.style.wordWrap = 'break-word';
    pre.innerHTML = caller + evt.data;
    output.appendChild(pre);
    scrollOutput();
}

function onError(evt) {
    console.log('Websocket Error: ' + evt.data);
}

function doSend(message) {
    ws.send(message);
}

function scrollOutput() {
    output.scrollTop = output.scrollHeight;
}

window.addEventListener('resize',scrollOutput , false);

window.addEventListener('load', init, false);
