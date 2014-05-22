var minecraftServers = {
  "servers": []
};

var minecraftServerStartup = [
  '[14:59:29] [Server thread/INFO]: Starting minecraft server version 1.7.9',
  '[14:59:29] [Server thread/INFO]: Loading properties',
  '[14:59:29] [Server thread/INFO]: Default game type: SURVIVAL',
  '[14:59:29] [Server thread/INFO]: Generating keypair',
  '[14:59:29] [Server thread/INFO]: Starting Minecraft server on *:25565',
  '[14:59:29] [Server thread/INFO]: Preparing level "world"',
  '[14:59:29] [Server thread/INFO]: Preparing start region for level 0',
  '[15:00:30] [Server thread/INFO]: Preparing spawn area: 10%',
  '[15:00:31] [Server thread/INFO]: Preparing spawn area: 22%',
  '[15:00:32] [Server thread/INFO]: Preparing spawn area: 33%',
  '[15:00:33] [Server thread/INFO]: Preparing spawn area: 49%',
  '[15:00:34] [Server thread/INFO]: Preparing spawn area: 65%',
  '[15:00:35] [Server thread/INFO]: Preparing spawn area: 88%',
  '[14:59:30] [Server thread/INFO]: Done (0.847s)! For help, type "help" or "?"'
]

function addMinecraftServer() {
  if(minecraftServers.servers.length == 0) {
    // Remove if first row]
    $('#minecraft-data-table tr:last').remove();
  }

  numUsers = minecraftServers.servers.length > 0 ? 0 : 4

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
                                           '</td><td>' + newServer.numUsers +
                                           '</td><td id="status" class="server-starting">' + newServer.status +
                                           '</td>'+
                                           '<td><a href="#"><i class="fa fa-terminal console-icon"></i></a></td>' +
                                           '<td><a href="#"><i class="fa fa-times x-icon"></i></a></td></tr>');
  clearConsole();
  playConsole();
}

function clearConsole() {
  $('#console').empty();
}

function viewConsole() {

}

function goToBottomOfConsole() {
  var objDiv = document.getElementById("console");
  objDiv.scrollTop = objDiv.scrollHeight;
}


function playConsole() { 
  console = $('#console')
  $.each(minecraftServerStartup, function() {
    console.append('<div>' + this + '</div>');
    goToBottomOfConsole();
  });


  // Set the status to running
  $("#status").removeClass('server-starting').addClass('server-running');
  //
  $("#status").html('Running');

  // TODO: Make number of users go up slowly
}

$(document).ready(function () {
  $("#add-server-button").click(function(){
    addMinecraftServer();
  });
});