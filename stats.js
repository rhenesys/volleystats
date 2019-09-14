var fs = require("fs");

let playersNumber = 1;
const maxPlayers = 14;
let countPlayers = 0;

function displayDiv(btnId) {
  switch (btnId) {
    case "myteambutton":
      document.getElementById("myteamdiv").style.display = "block";
      document.getElementById("scoreboarddiv").style.display = "none";
      document.getElementById("courtdiv").style.display = "none";
      buildMyTeam();
      break;
    case "scoreboardbutton":
      document.getElementById("myteamdiv").style.display = "none";
      document.getElementById("scoreboarddiv").style.display = "block";
      document.getElementById("courtdiv").style.display = "none";
      break;
    case "courtbutton":
      document.getElementById("myteamdiv").style.display = "none";
      document.getElementById("scoreboarddiv").style.display = "none";
      document.getElementById("courtdiv").style.display = "block";
      buildCourt();
      break;
  }
}

function buildCourt() {
  document.getElementById("courtdiv").innerHTML =
    "<svg width='100%' height='100%'>" +
    "<rect width='400px' height='600px' style='fill:#2288fc;stroke:#000000' />" +
    "<line x1='0' y1= '200' x2='400' y2='200' stroke='black' />" +
    "<line x1='0' y1= '300' x2='400' y2='300' stroke='black' />" +
    "<line x1='0' y1= '400' x2='400' y2='400' stroke='black' />" +
    "</svg>";
}

function buildMyTeam() {
  document.getElementById("myteamdiv").innerHTML =
    "<button class='btnClass fadeIn' style='margin-right: 5px;' onclick='addPlayer()'>Add Player</button><button class='btnClass fadeIn' id='savePlayers' onclick='savePlayers()'>Save</button>";
}

function addPlayer() {
  if (countPlayers < maxPlayers) {
    var playerElement = document.createElement("div");
    playerElement.id = "playerdiv" + playersNumber;
    playerElement.className = "playerDiv";
    playerElement.style = "margin-top:10px;margin-bottom:10px";
    playerElement.innerHTML =
      "<input type='text' class='playerName' id='playerName' placeholder='player' /><input type='text' class='playerNumber' id='playerNumber' placeholder='number' /><button class='btnRemove' onclick='removePlayer(this)'>-</button>";
    document.getElementById("myteamdiv").appendChild(playerElement);
    playersNumber += 1;
    countPlayers += 1;
  } else {
    alert("No more players allowed.");
  }
}

function removePlayer(btnRemovePlayer) {
  document.getElementById("myteamdiv").removeChild(btnRemovePlayer.parentNode);
  countPlayers -= 1;
}

function loadPlayers() {
  
}

function savePlayers() {
  document.getElementById("savePlayers").addEventListener("click", function() {
    let playersCSV = '';

    let playersDiv = document.getElementById('myteamdiv').getElementsByTagName('div');

    for(pN = 0; pN < playersDiv.length; pN++){
      if(playersDiv[pN].childNodes[0].value !== ''){
        playersCSV += playersDiv[pN].childNodes[0].value + ";";
      }

      if(playersDiv[pN].childNodes[1].value !== ''){
        playersCSV += playersDiv[pN].childNodes[1].value + ";";
      }
      playersCSV += "\n";
    }

    fs.unlink('players.csv',function(err){
      if(err) throw err;
    });

    fs.writeFile('players.csv', playersCSV, function (err) {
      if (err) throw err;
      alert("Team saved/updated successfully");
    });
  });
}
