(function() {
	var componentName = 'mosaic-map';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row inputs">
				<div class="col-sm-12">
					<button @click="handleSelectImage" :class="{'show-anyway': !imagePath}" class="btn btn-default select-image-button">
						<span class="glyphicon glyphicon-camera"></span>
						<span class="watermark-label">Select Image</span>
					</button>
					<div  class="toolbar-component">
						<span>Cell Width</span><input type="number" step="1" v-model="cellWidth" />
					</div>
					<div  class="toolbar-component">
						<span>Cell Height</span><input type="number" step="1" v-model="cellHeight" />
					</div>
					<div  class="toolbar-component">
						<span>Sample Width</span><input type="number" step="1" v-model="sampleWidth" />
					</div>
					<div  class="toolbar-component">
						<span>Sample Height</span><input type="number" step="1" v-model="sampleHeight" />
					</div>
					<button :disabled="hasImagePath" @click="handleGenerateMosaic" class="btn btn-default">Mosaic (Preview)</button>
					<button :disabled="hasImagePath" @click="handleSaveAsSvg" class="btn btn-default">Save SVG</button>
				</div>
			</div>
			<div class="row image-preview">
				<div class="col-sm-2">
					<color-list></color-list>
				</div>
				<div class="col-sm-10">
					<img id="mosaic-target" :src="imagePath" />
				</div>
			</div>
			<div class="row mosaic-output">
				<div class="col-sm-12">
					<div class="mosaic-output">
						<svg></svg>
					</div>
				</div>
			</div>
			<pallette></pallette>
			<div class="inline-styles">
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			baseWidth: {
				get() {
					return store.state.baseWidth;
				},
				set(value) {
					this.$store.commit('setBaseWidth', value);
				}
			},
			cellHeight: {
				get() {
					return store.state.cellHeight;
				},
				set(value) {
					this.$store.commit('setCellHeight', value);
				}
			},
			cellWidth: {
				get() {
					return store.state.cellWidth;
				},
				set(value) {
					this.$store.commit('setCellWidth', value);
				}
			},
			hasImagePath: function() {
				return !Boolean(store.state.imagePath.length);
			},
			imagePath: function() {
				return store.state.imagePath;
			},
			sampleHeight: {
				get() {
					return store.state.sampleHeight;
				},
				set(value) {
					this.$store.commit('setSampleHeight', value);
				}
			},
			sampleWidth: {
				get() {
					return store.state.sampleWidth;
				},
				set(value) {
					this.$store.commit('setSampleWidth', value);
				}
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			generateMosaic: function(e) {
				console.log("HIT");
				/*
				var base = Number(this.baseWidth);
				var halfBase = base / 2;
				var baseSin = base * eqSin;
				var img = document.getElementById("mosaic-target");
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

				var widthSteps = Math.floor(img.width / halfBase);
				var heightSteps = Math.floor(img.height / baseSin);
				var overlapSize = 0.75;
				var pixelData, color, x, y, pointUp, hsl, a;
				var portWidth = img.width - base;
				var portHeight = img.height - baseSin;
				var s = '<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" x="0px" y="0px" viewBox="0 0 ' + portWidth + ' ' + portHeight + '" enable-background="new 0 0 ' + portWidth + ' ' + portHeight + '" xml:space="preserve"><g inkscape:groupmode="layer" inkscape:label="Layer 1"><g>';
				for(y = 0; y < heightSteps; y++) {
					for(x = 0; x < widthSteps; x++) {
						pixelData = averagePixelData(canvas.getContext('2d').getImageData(x * halfBase, y * baseSin, this.sampleSize, this.sampleSize).data);
						color = getHexColorFromData(pixelData);
						hsl = rgbToHsl(pixelData[0], pixelData[1], pixelData[2]);
						pointUp = (x + y) % 2 ? 'point-up' : '';
						a = [];
						s += '\n<polygon fill="' + color + '" ';
						if(pointUp) {
							a.push(Math.round((x * halfBase) - overlapSize - halfBase) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
							a.push(Math.round((x * halfBase) + base + overlapSize - halfBase) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
							a.push(Math.round((x * halfBase)) + "," + Math.round((y * baseSin) - overlapSize));
						} else {
							a.push(Math.round((x * halfBase) - overlapSize - halfBase) + "," + Math.round((y * baseSin) - overlapSize));
							a.push(Math.round(((x * halfBase) + base) + overlapSize - halfBase) + "," + Math.round((y * baseSin) - overlapSize));
							a.push(Math.round((x * halfBase)) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
						}
						s += 'points="' + (a.join(" ")) + '"';
						s += ' />';
					}
				}
				s += '\n</g></g></svg>';
				return s;
				*/
			},
			handleGenerateMosaic: function(e) {
				$(".mosaic-output").html(this.generateMosaic());
			},
			handleSaveAsSvg: function(e) {
				var path = dialog.showSaveDialog({ title: "Save Mosaic as SVG", defaultPath: store.state.defaultPath, filters: [{name: "SVG Vector Graphics", extensions: ['svg']}] });
				if(path) {
					path = path.split(".")[0] + ".svg";
					store.commit("setDefaultPath", path);
					fs.outputFile(path, this.generateMosaic(), function(err) {
						if(err) {
							console.error(err);
						}
					});
				}
			},
			handleSelectImage: function(e) {
				dialog.showOpenDialog({
					title: "Select Image File",
					buttonLabel: "Use Image",
					properties: ["openFile"],
					filters: [{name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif']}]
				}, (result) => {
					if(result) {
						store.commit("setImagePath", result[0]);
					}
				});
			}
		}
	});
})();
