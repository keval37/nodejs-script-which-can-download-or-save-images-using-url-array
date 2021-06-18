//Load HTTP module
const http = require("http");
var fs = require("fs"),
	request = require("request");
const axios = require("axios");
const path = require("path");
const hostname = "127.0.0.1";
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
	//Set the response HTTP header with HTTP status and Content type
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello World\n");
});

let data = [
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-cabo-wabo-anejo-e9899365450aaa74.png",
		abv: 40,
		region: "Mexico",
		brandName: "Cabo Wabo",
		title:
			"Cabo Wabo Añejo is a thick cut tequila with a richer taste. After maturing in American oak barrels for at least 12 months, Cabo Añejo becomes even bolder with flavor.",
		volume: 750,
		volumeUnits: "ml",
		itemName: "Cabo Wabo Añejo",
		id: "0720815910539",
		mainCategory: "Liquor",
		subCategory: "Tequila",
		variant: "Anejo Tequila",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-titos-handmade-vodka-428578e099bc0444.png",
		abv: 40,
		region: "Texas",
		brandName: "Tito's",
		title:
			"Tito’s Handmade Vodka was founded by sixth-generation Texan, Bert “Tito” Beveridge. In the mid-nineties, inspired and driven to do something he loved, Tito obtained the first legal permit to distill in the state of Texas. On a plot of land in rural Austin, he built a one-room shack, rigged a pot still with spare parts, and created Tito’s Handmade Vodka. Tito’s corn-based vodka is certified gluten-free. Tito’s Handmade Vodka is distilled and bottled by Fifth Generation, Inc. in Austin, Texas, and is available in Liter, 1.75L, 750ml, 375ml, 200ml, and 50ml sizes. For more information, visit www.titosvodka.com. ",

		volume: 1,
		volumeUnits: "L",
		itemName: "Tito's Handmade Vodka",
		id: "619947000013",
		mainCategory: "Liquor",
		subCategory: "Vodka",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-sunkist-strawberry-lemonade-24181ed2dff9a811.jpeg",
		abv: null,
		region: "United States",
		brandName: "Sunkist",
		title: null,

		volume: null,
		volumeUnits: null,
		itemName: "Sunkist Strawberry Lemonade",
		id: "078000031805",
		mainCategory: "Extras",
		subCategory: "Soda, Water, & Soft Beverages",
		variant: "Juice",
		subVariant: "Lemonade",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-andre-peach-moscato-champagne-90f6b0397ceb9a30.png",
		abv: 7.2,
		region: "California",
		brandName: "Andre",
		title:
			"Andre Peach Moscato Champagne  Our André Peach Passion California champagne is deliciously sweet with flavors of ripe fruit, hints of orange blossom, with a muscat-type varietal flavor.    Titratable Acidity: 0.5g/100ml  pH: 2.9  Alcohol Level: 7.2%  Residual Sugar: 9.5g/100ml  Wine Description  A sweet sparkling wine with flavors of ripe  peach, peaches and cream, and hints of  orange with a crisp, balanced mouthfeel.",

		volume: 750,
		volumeUnits: "ml",
		itemName: "Andre Peach Moscato",
		id: "085000012680",
		mainCategory: "Wine",
		subCategory: "Champagne & Sparkling Wine",
		variant: "American Sparkling",
		subVariant: "Champagne Blend",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-kirkland-cranberry-juice-cocktail-27564b84cb2959fb.jpeg",
		abv: null,
		region: null,
		brandName: "Kirkland",
		title: null,

		volume: 2,
		volumeUnits: "L",
		itemName: "Kirkland Cranberry Juice Cocktail",
		id: "096619409549",
		mainCategory: "Extras",
		subCategory: "Soda, Water, & Soft Beverages",
		variant: "Juice",
		subVariant: "Cranberry Juice",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-j-b-rare-scotch-476ad8e136d8f10b.jpeg",
		abv: 40,
		region: "Scotland",
		brandName: "J&B",
		title:
			"Sip the smooth and complex flavor of J&B Rare Blended Scotch Whisky. At the heart of J&B Rare are malt whiskies from Speyside, a region recognized as the superior area in Scotland for making single malt whisky. With a fruity, fresh quality to its taste, this is what also gives J&B its light color. Added to that are some of the finest grain whiskies Scotland has to offer, helping reveal the individual flavors of the various malts and the smooth character of J&B Rare. Perfect on its own or in a cocktail, mix with cola and pour over ice for a classic drink.\n\nThis spirit brings together 42 single malt and grain whiskies and carefully blends them to create a subtle, smooth and complex flavor. It’s this delicate balance that gives J&B Rare its distinctive character. Please drink responsibly.",

		volume: 750,
		volumeUnits: "ml",
		itemName: "J&B Rare Blended Scotch",
		id: "088110985042",
		mainCategory: "Liquor",
		subCategory: "Whiskey",
		variant: "Scotch Whisky",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-sutter-home-sauvingnon-blanc-3a13c357ae1ab47b.png",
		abv: 13.5,
		region: "California",
		brandName: "Sutter Home",
		title:
			"Lively and inviting, this is a great all-purpose wine. Fresh honeydew melon, grapefruit, and passion fruit aromas beg you to continue sipping, because there's more. Yes, a bit of spice to end it all, and your choice is affirmed. Very food friendly, this wine pairs beautifully with shellfish, herb-roasted chicken, Caesar salad, mild cheeses, and vegetarian fare. A Sauvignon Blanc wine like no other.",

		volume: null,
		volumeUnits: null,
		itemName: "Sutter Home Sauvignon Blanc",
		id: "085200718740",
		mainCategory: "Wine",
		subCategory: "White Wine",
		variant: "Sauvignon Blanc",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-fever-tree-club-soda-2dd5d6304675898b.jpeg",
		abv: null,
		region: "United Kingdom",
		brandName: "Fever-Tree",
		title:
			"Fever-Tree Club Soda; Our soft English spring water is infused with only a touch of minerality, then highly carbonated to release a huge number of long-lasting, ultrafine bubbles. Similar to an aged Champagne with a finer fizz, this long-lasting gentle effervescence truly accentuates the flavor of the spirit & doesn’t over-power the sensory experience. Non-GMO certified. Gluten Free. Naturally sourced ingredients, no artificial sweeteners.",

		volume: null,
		volumeUnits: null,
		itemName: "Fever-Tree Premium Club Soda",
		id: "898195001489",
		mainCategory: "Extras",
		subCategory: "Soda, Water, & Soft Beverages",
		variant: "Soda & Sparkling Beverages",
		subVariant: "Club Soda",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-bacardi-classic-cocktails-strawberry-daiquiri-6f640cebb3ae28e8.jpeg",
		abv: 15,
		region: "Puerto Rico",
		brandName: "Bacardi",
		title:
			"Since its creation in 1862, BACARDÍ has inspired the world's favorite cocktails, including the strawberry daiquiri. Experience the delicious and natural taste of BACARDÍ Strawberry Daiquiri. Simply pour over ice and add your personal twist with garnish of lime or strawberry.",

		volume: 1,
		volumeUnits: "L",
		itemName: "BACARDÍ Classic Cocktails Strawberry Daiquiri",
		id: "080480002138",
		mainCategory: "Liquor",
		subCategory: "Ready-to-Drink",
		variant: "Ready-to-Drink",
		subVariant: "Daiquiri Ready-to-Drink",
	},
	{
		imageUrl:
			"https://dydza6t6xitx6.cloudfront.net/ci-st-remy-xo-brandy-95282f2f5123a470.jpeg",
		abv: 40,
		region: "France",
		brandName: "St Remy",
		title:
			"St-Rémy XO illustrates the legacy of our previous Master Blender, Martine Pain.\nShe created a complex and rich brandy, her interpretation of French aromatic\nintensity while remaining true to the style of the House. In the past decades,\nSt-Rémy XO became an obvious trade-up in the category.\n\nThe satisfaction of a generous superior taste for the savvy, bon vivant ones.\nSt-Rémy XO is a brandy of character with complex aromas and a robust taste.\nIt is recognised for its elegance, roundness and ability to linger on the palate.\n\nOffering multiple layers of flavours that make it remarkable to critics and\nconnoisseurs alike, St-Rémy XO can be enjoyed neat, on ice or in classic cocktails. ",

		volume: 750,
		volumeUnits: "ml",
		itemName: "St-Rémy XO",
		id: "088352118062",
		mainCategory: "Liquor",
		subCategory: "Brandy",
	},
];

var randomString = function (length, chars) {
	var result = "";
	for (var i = length; i > 0; --i)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

let i = 0;
let error_arr = [];
var download = async function (url, filename) {
	return new Promise(async (resolve, reject) => {
		// const { url, out, name } = target;
		const request = {
			url,
			method: "GET",
			responseType: "stream",
		};

		try {
			const response = axios(request);
			let output;

			const file = path.resolve("upload/", filename);
			output = fs.createWriteStream(file);

			response
				.then(function (response) {
					const stream = response.data
						.pipe(output)
						.on("finish", () => {
							resolve();
							i++; //  increment the counter
							if (i < data.length) {
								//  if the counter < data.length, call the loop function
								const image_name = `${data[i].itemName
									.replace(/[^a-zA-Z0-9]/g, " ")
									.toLowerCase()
									.replace(/ /g, "-")}-${randomString(
									12,
									"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
								)}.${data[i].imageUrl.substr(
									data[i].imageUrl.lastIndexOf(".") + 1
								)}`;

								download(data[i].imageUrl, image_name); //..  again which will trigger another

								//update the data array object
								data[
									i
								].imageUrl = `https://dydza6t6xitx6.cloudfront.net/${image_name}`;
							}
						})
						.on("error", reject);
				})
				.catch(function (error) {
					error_arr.push(data[i]);
					console.log(error_arr);
					resolve();
					i++; //  increment the counter
					if (i < data.length) {
						//  if the counter < data.length, call the loop function
						const image_name = `${data[i].itemName
							.replace(/[^a-zA-Z0-9]/g, " ")
							.toLowerCase()
							.replace(/ /g, "-")}-${randomString(
							12,
							"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
						)}.${data[i].imageUrl.substr(
							data[i].imageUrl.lastIndexOf(".") + 1
						)}`;

						download(data[i].imageUrl, image_name); //..  again which will trigger another

						//update the data array object
						data[
							i
						].imageUrl = `https://dydza6t6xitx6.cloudfront.net/${image_name}`;
					}
				});
		} catch (err) {
			reject(err);
		}
	});
};

const image_name = `${data[i].itemName
	.replace(/[^a-zA-Z0-9]/g, " ")
	.toLowerCase()
	.replace(/ /g, "-")}-${randomString(
	12,
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
)}.${data[i].imageUrl.substr(data[i].imageUrl.lastIndexOf(".") + 1)}`;

download(data[i].imageUrl, image_name); //..  trigger on load

//update the data array object
data[i].imageUrl = `https://dydza6t6xitx6.cloudfront.net/${image_name}`;

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
