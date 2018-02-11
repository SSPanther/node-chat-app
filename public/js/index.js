var socket = io();

socket.on('connect', function () {
    console.log('Index connected');
});

socket.on('updateRoomList', function (rooms) {
    //<option value="volvo">Volvo</option>
    console.log('Update Room List');
    var selectRoom = jQuery('<select name="existingRoom"><option value="None">Select Existing</select>');

    rooms.sort().forEach(function (room) {
        console.log('Appending room:', room);
        selectRoom.append(jQuery(`<option value="${room}">${room}</option>`));
    });

    jQuery('#selectRoom').html(selectRoom);
});