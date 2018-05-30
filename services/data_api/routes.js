var express = require('express');
var router = express.Router();

var backend_store = {
	state: {0: "i am frontend"},
	nextID: 1,
	create (message) {
		this.state[this.nextID] = message;
		this.nextID++;
	},
	read_one (id) {
		return this.state[id];
	},
	read_all () {
		return this.state;
	},
	update (id, newEntry) {
		this.state[id] = newEntry;
	},
	remove (id) {
		delete this.state[id];
	}
}

router.get('/get', (req, res) => {
    res.json(backend_store.state)
});

router.post('/update', (req, res) => {
    console.log(backend_store.state)
    backend_store.state = req.body.state;
    console.log(backend_store.state)
    res.json({message: 'global state updated'});
});

router.use((req, res, next) => {
    res.json({404: 'no such route'})
});

module.exports = router;