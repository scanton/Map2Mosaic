(function() {
	var componentName = 'add-color-ui';
	var s = `
		<div class="` + componentName + ` underlay" v-show="showAddColorView">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-12">
						<div class="modal-ui">
							<h1>Add Color</h1>
							<form>
								<div class="input-group">
									<input type="text" v-model="colorName" placeholder="color name (optional)" />
								</div>
								<div class="input-group">
									<input type="text" @keyup="handleColorChange" v-model="colorInput" placeholder="hex color (e.g. #FFCCAA)" />
								</div>
								<div class="button-container pull-right">
									<button class="btn btn-warning" @click="handleHideAddColorView">Cancel</button>
									<button class="btn btn-success" :disabled="!isValidColor" @click="handleAddColor">Add Color</button>
								</div>

							</form> 
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			showAddColorView: function() {
				return store.state.showAddColorView;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {
				colorInput: '',
				colorName: '',
				isValidColor: false,
				colorRegEx: /^#(?:[0-9a-f]{3}){1,2}$/i
			}
		},
		methods: {
			handleAddColor: function(e) {
				e.preventDefault();
				store.commit("addColor", this.colorInput);
				store.commit("hideAddColorView");
			},
			handleColorChange: function(e) {
				e.preventDefault();
				this.isValidColor = this.colorRegEx.test(e.target.value);
			},
			handleHideAddColorView: function(e) {
				e.preventDefault();
				store.commit("hideAddColorView");
			}
		}
	});
})();
