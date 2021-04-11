# ECS/POS Printer Server
This services will handle your printing services with only http request. This project use [node-escpos](https://github.com/song940/node-escpos) as the printer module, so if you have any problem check that project.

# How to use?
1. Clone this repo
2. Install the dependencies `npm install` or `yarn install`
3. Run the services `node server.js`
4. Do http request to `http:localhost:3000/print` with post method

this is the example payload request
```
{
	"products": [
		{
			"name": "Coca Cola",
			"qty": 2,
			"price": 5000,
			"unit": "pcs"
		},
		{
			"name": "Sprite",
			"qty": 1,
			"price": 5000,
			"unit": "pcs"
		}
	],
	"cash": 20000
}
```
Note: if you are running on Linux/Mac you need admin privilege

