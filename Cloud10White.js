// Cloud10White.js
// a script to output white on all universes for cloud 10, designed to run on a Windows PC
// copyright 2024 Drew Shipps, J Squared Systems

console.log('Running Cloud10White script...');
console.log('Written by Drew Shipps, J Squared Systems. Copyright 2024 J2');

var e131 = require('e131');
var UNIVERSES = 8;
var DELAY_MS = 500;

setInterval(function () {
	console.log('Output white to ' + UNIVERSES + ' universes on ' + DELAY_MS + 'ms interval...');

	// output all white to # of universes
	var clients = [];
	var packets = [];
	var slotsDatas = [];

	// loop thru each universe and set it up to output
	for (var i = 0; i < UNIVERSES; i++) {
		// create client
		clients[i] = new e131.Client(i+1);
		packets[i] = clients[i].createPacket(512);
		slotsDatas[i] = packets[i].getSlotsData();

		// configure packet
		packets[i].setSourceName('Attitude sACN Client');
		packets[i].setUniverse(i + 1);
		packets[i].setOption(packets[i].Options.PREVIEW, false);
		packets[i].setPriority(1);
	}

	// loop through each universe and set it to all white and push a packet out
	for (var u = 0; u < UNIVERSES; u++) {
		// set slots to white
		for (var i = 0; i < 512; i++) {
			slotsDatas[u][i] = 255;
		}

		// send over sACN
		clients[u].send(packets[u], function () {
			console.log('Packet sent! u = ' + u);
		});
	}
}, DELAY_MS);