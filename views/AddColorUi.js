(function() {
	var componentName = 'add-color-ui';
	var s = `
		<div class="` + componentName + ` underlay" v-show="showAddColorView">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-12">
						<div class="modal-ui">
							<form>
								add color
								<input type="text" @keyup="handleColorChange" v-model="colorInput" />
								<button class="btn btn-warning" @click="handleHideAddColorView">Cancel</button>
								<button class="btn btn-success" :disabled="!isValidColor" @click="handleAddColor">Add Color</button>
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
