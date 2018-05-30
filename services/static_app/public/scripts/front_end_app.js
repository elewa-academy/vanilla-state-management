
var frontend_store = {
	state: {0: "i am frontend"},
	nextID: 1,
	api_connectio: {},
	create (message) {
		this.state[this.nextID] = message;
		this.nextID++;
		this.update_api();
	},
	read_one (id) {
		return this.state[id];
	},
	read_all () {
		this.api_connection.get('/get') // axios call to get the data
			.then((response) => {
				this.state = response.data; // rerender dom with new data
				app.render_display({
					backend: response.data,
					frontend: frontend_store.state
				}
					)
			})
			.catch((error) => {
				if(error) {	
					console.log(error);
				}
			});
	},
	update (id, newEntry) {
		this.state[id] = newEntry;
	},
	remove (id) {
		delete this.state[id];
		this.update_api()
	},
	update_api () {
		this.api_connection.post('/update', {
			state: this.state
		}) // axios call to get the data
				.then((response) => {
					app.render_display("backend & frontend state updated" );
				})
				.catch((error) => {
					if(error) {	
						console.log(error);
					}
				});
	},

}

var app = {
	api_connection: {},
	// react doesn't provide you these methods
	//	controller and routes
	read_local: function() {
		var state = frontend_store.read_all();
		app.render_display(state);
		// comment so the method collapses
	},
	update_local: function() {
		var text_input = document.getElementById('text_input');
		var new_message = text_input.value;
		frontend_store.create(new_message);		
	},
	// react does these things
	//	view stuff
	initialize: function() {
		console.log('hi');		
		frontend_store.api_connection = axios.create({
			baseURL: 'http://localhost:3001'
		});
		this.render_input();
	},
	render_display: function (state_object) {
		var display_component = document.getElementById('display_component');

		if (display_component == null) {

			var container = document.getElementById('container');
			var display_component = document.createElement('DIV');
			display_component.id = 'display_component';

			var data_div = document.createElement('DIV');
			data_div.id = 'data_div';
			display_component.appendChild(data_div);

			var read_local = document.createElement('BUTTON');
			read_local.id = 'submit_global_button';
			read_local.onclick = this.read_local;
			read_local.innerHTML = 'read frontend state';
			display_component.appendChild(read_local);

			container.appendChild(display_component);
		};

		var new_text = JSON.stringify(state_object);
		var data_div =  document.getElementById('data_div');
		data_div.innerHTML = new_text;
	},
	render_input: function () {
		var input_component = document.getElementById('input_component');
		
		if (input_component == null) {

			var container = document.getElementById('container');
			var input_component = document.createElement('DIV');
			input_component.id = 'input_component';

			var text_input = document.createElement("INPUT");
			text_input.id = 'text_input';
			text_input.value = 'phht';
			input_component.appendChild(text_input);

			var submit_local = document.createElement('BUTTON');
			submit_local.id = 'submit_local';
			submit_local.onclick = this.update_local;
			submit_local.innerHTML = 'update frontend state';
			input_component.appendChild(submit_local);

			container.appendChild(input_component);

		};
	}
};












