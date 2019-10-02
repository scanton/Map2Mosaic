const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const fs = require('fs-extra');

require('./custom_modules/utils/enableContextMenu.js')();

const stripObservers = function(obj) {
	return JSON.parse(JSON.stringify(obj, null, 4));
}
const toDegrees = function (rad) {
	return rad * (180 / Math.PI);
}
const toRadians = function (deg) {
	return deg * (Math.PI / 180);
}
const svgTag = function (tag, attrs) {
	var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs) {
		el.setAttribute(k, attrs[k]);
	}
	return el;
}
const averagePixelData = function(arr) {
	var l = arr.length;
	var count = 0;
	var r = 0;
	var g = 0;
	var b = 0;
	var a = 0
	for(var i = 0; i < l; i+= 4) {
		r += arr[i];
		g += arr[i + 1];
		b += arr[i + 2];
		a += arr[i + 3];
		++count;
	}
	return [Math.floor(r/count), Math.floor(g/count), Math.floor(b/count), Math.floor(a/count)];
}
const rgbToHsl = function(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0;
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: 
				h = (g - b) / d + (g < b ? 6 : 0); 
				break;
			case g: 
				h = (b - r) / d + 2; 
				break;
			case b: 
				h = (r - g) / d + 4; 
				break;
		}
		h /= 6;
	}
	return [h, s, l];
}

const getColorFromData = function(data) {
	return 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
}
const componentToHex = function (c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
const getHexColorFromData = function(data) {
	return '#' + componentToHex(data[0]) + componentToHex(data[1]) + componentToHex(data[2]);
}
const hexToRgba = function(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16),
		1
	] : [255, 255, 255, 1];
}

const eqRad = toRadians(60);
const eqSin = Math.sin(eqRad);
const eqCos = Math.cos(eqRad);

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		cellWidth: 20,
		cellHeight: 50,
		sampleWidth: 20,
		sampleHeight: 50,
		colorList: ['#FFFFFF', '#000000', '#ffdb8f', '#7966b0', '#ffe558', '#ffd200', '#f57729', '#e60f31', '#00acf2', '#0066b4', '#0053a7', '#003c81', '#00a94c', '#008367', '#009391', '#004f5c', '#9a002c', '#a60046', '#f14a91', '#f58faf', '#663600', '#7f8084', '#b79955', '#a8a9ad'],
		imagePath: '',
		defaultPath: 'map2mosaic.svg',
		totalCells: 0,
		showAddColorView: false
	},
	mutations: {
		addColor: function(state, value) {
			state.colorList.push(value);
		},
		colorList: function(state, list) {
			state.colorList = list;
		},
		hideAddColorView: function(state) {
			state.showAddColorView = false;
		},
		setDefaultPath: function(state, value) {
			state.defaultPath = value;
		},
		setImagePath: function(state, path) {
			state.imagePath = path;
		},
		setCellHeight: function(state, value) {
			state.cellHeight = value;
		},
		setCellWidth: function(state, value) {
			state.cellWidth = value;
		},
		setSampleHeight: function(state, value) {
			state.sampleHeight = value;
		},
		setSampleWidth: function(state, value) {
			state.sampleWidth = value;
		},
		setTotalCells: function(state, value) {
			state.totalCells = value;
		},
		showAddColorView: function(state) {
			state.showAddColorView = true;
		},
		removeColor: function(state, value) {
			var l = state.colorList.length;
			while(l--) {
				if(state.colorList[l] == value) {
					state.colorList.splice(l, 1);
				}
			}
		}
	}
});

const vm = new Vue({
	el: '#main-app',
	store: store
});
