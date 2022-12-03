let connected = false;
let ws;
const WS_URL = "wss://stingy-auspicious-era.glitch.me/";

function connectWs(userType, onReceiveMessage) {
    if (!connected) {
        connected = true;
        setInterval(() => tryConnectToWS(userType), 1000);

        function tryConnectToWS(userType) {
            if (ws == undefined || ws.readyState === ws.CLOSED) {
                ws = new WebSocket(WS_URL);
                ws.addEventListener("open", () => {
                    console.log("Connected WS at: " + new Date());
                    ws.send("Connect:" + userType);
                });

                ws.addEventListener("message", function (event) {
                    onReceiveMessage(event.data);
                });

                ws.addEventListener("error", function (event) {
                    console.log(event.data);
                });
            } else if (ws.readyState === ws.OPEN) {
                getState();
            }
        }
    }
}

function changeState(state) {
    ws.send("ChangeState:" + state);
}

function getState() {
    ws.send("GetState");
}