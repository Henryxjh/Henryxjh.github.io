const socket = new WebSocket("ws://119.45.12.243/ws/status")
socket.addEventListener("open", (event) => { socket.send("status") })

socket.onmessage = function (event) {
    if (document.readyState == "complete") {
        const data = JSON.parse(event.data)
        if (!data.status) {
            document.getElementById("statusPanel").style.visibility = "hidden"
            document.getElementById("status").innerHTML = "已停止"
            document.getElementById("status").style.color = "red"
        } else {
            document.getElementById("statusPanel").style.visibility = "visible"
            document.getElementById("status").innerHTML = "正在运行"
            document.getElementById("status").style.color = "green"
            document.getElementById("upTime").innerHTML = data.upTime
            var players = ""
            data.playerList.forEach(playerName => {
                players += "<p>" + playerName + "</p>"
            });
            document.getElementById("playerList").innerHTML = players
            var date = new Date(data.startTime)
            document.getElementById("startDate").innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 8)
        }
    }
}
