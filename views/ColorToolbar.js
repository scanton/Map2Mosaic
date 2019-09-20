(function() {
	var componentName = 'color-toolbar';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<button class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add Color</button>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			
		}
	});
})();
