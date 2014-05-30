var minecraftServers = {
  "servers": []
};

var MINECRAFT_SERVER_STARTUP = [
  '[Server thread/INFO]: Starting minecraft server version 1.7.9',
  '[Server thread/INFO]: Loading properties',
  '[Server thread/INFO]: Default game type: SURVIVAL',
  '[Server thread/INFO]: Generating keypair',
  '[Server thread/INFO]: Starting Minecraft server on *:25565',
  '[Server thread/INFO]: Preparing level "world"',
  '[Server thread/INFO]: Preparing start region for level 0',
  '[Server thread/INFO]: Preparing spawn area: 10%',
  '[Server thread/INFO]: Preparing spawn area: 22%',
  '[Server thread/INFO]: Preparing spawn area: 33%',
  '[Server thread/INFO]: Preparing spawn area: 49%',
  '[Server thread/INFO]: Preparing spawn area: 65%',
  '[Server thread/INFO]: Preparing spawn area: 88%',
  '[Server thread/INFO]: Done (1.847s)! For help, type "help" or "?"'
]

function addMinecraftServer() {
  if(minecraftServers.servers.length == 0) {
    // Remove if first row]
    $('#minecraft-data-table tr:last').remove();
  }

  numUsers = 0

  // Add row for new server
  var newServer = {
    "name": "US Minecraft Server " + (minecraftServers.servers.length+1),
    "host": "mcserver-" + (minecraftServers.servers.length+1) + ".ng.bluemix.net",
    "numUsers" : numUsers,
    "status" : "Starting"
  };

  minecraftServers.servers.push(newServer);

  $('#minecraft-data-table tr:last').after('<tr><td>' + newServer.name +
                                           '</td><td>' + newServer.host + 
                                           '</td><td id="numUsers" >' + newServer.numUsers +
                                           '</td><td id="status" class="server-starting">' + newServer.status +
                                           '</td>'+
                                           '<td><a href="#"><i class="fa fa-terminal console-icon"></i></a></td>' +
                                           '<td><a href="#"><i class="fa fa-times x-icon"></i></a></td></tr>');
  clearConsole();
  playConsole();
}





/*
 * Console Functions
 */
function playConsole() { 
  writeConsoleLine(0);
}

function writeConsoleLine(lineNumber) { 
  addConsoleLine(MINECRAFT_SERVER_STARTUP[lineNumber]);

  // Is there more lines?
  if (lineNumber < MINECRAFT_SERVER_STARTUP.length-1) {
    // Wait some time and call again
    setTimeout(function(){writeConsoleLine(lineNumber + 1)}, Math.random() * 500);
  }
  else {
    finishPlayConsole();
  }
}

function addConsoleLine(str) {
  $('#console').append('<div>' + str + '</div>');
  goToBottomOfConsole();
}

function finishPlayConsole() {
  // Set the status to running
  $("#status").removeClass('server-starting').addClass('server-running');
  $("#status").html('Running');

  setTimeout(function(){incrementServerUsers(1)}, 1000);
}

function incrementServerUsers(num) { 
  $('#numUsers').html(num);
  addConsoleLine("[Server thread/INFO]: Added player (" + num + ")");

  // Is there more lines?
  if (num < 5) {
    // Wait some time and call again
    setTimeout(function(){incrementServerUsers(num + 1)}, Math.random() * 5000);
  }
}

function goToBottomOfConsole() {
  var objDiv = document.getElementById("console");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function clearConsole() {
  $('#console').empty();
}

/*
 * Initial Start
 */
$(document).ready(function () {
  $("#add-server-button").click(function(){
    addMinecraftServer();
  });
});