(function() {
	var componentName = 'color-list';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<color-toolbar></color-toolbar>
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
