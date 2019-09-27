(function() {
	var componentName = 'color-toolbar';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<button class="btn btn-default" @click="handleAddColor"><span class="glyphicon glyphicon-plus"></span> Add Color</button>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div v-for="color in colorList" class="color">
						<div class="swatch" :style="'background-color: ' + color"></div>
						<div class="label">{{ color }}</div>
						<button class="btn btn-danger remove-color-button" @click="handleRemoveColor(color)">
							<span class="glyphicon glyphicon-remove"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			colorList: function() {
				return store.state.colorList;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleAddColor: function(e) {
				store.commit("showAddColorView");
			},
			handleRemoveColor: function(color) {
				console.log(color);
			}
		}
	});
})();
