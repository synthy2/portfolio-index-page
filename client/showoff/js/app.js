$(document).ready(function(){
	// assuming page has loaded...
	Home.init();
});


// i love namespaces!
var Home = {

	rootUrl : "http://localhost:1337",
	//rootUrl : "http://intheon.uk",

	init: function(){
		this.loadPages();
		this.makePanelsScrollable();
		this.makeNavigationItemsClickable();
	},

	makePanelsScrollable: function(){

		// allow snapping scrolling
		$.scrollify({
			section: 		".content-area",
			sectionName: 	"name",
			easing: 		"easeOutExpo",
			scrollSpeed: 	1000,
			offset : 		0,
			scrollbars: 	false,
			before: 		function(event){
				// event is just the number of the panel
				var integer = event;
				$(".nav-link").removeClass("active-link");

				switch (integer)
				{
					case 0:
						$("#home-link").addClass("active-link");
					break;
					case 1:
						$("#portfolio-link").addClass("active-link");

						setTimeout(function(){
							$("#portfolio-header").addClass("goes-smaller");
						},900);
					break;
					case 2:
						$("#about-link").addClass("active-link");
					break;
					case 3:
						$("#contact-link").addClass("active-link");
					break;
					default:
						console.log("hardflips are hard");
					break;
				}
			}
		});
	},

	loadPages: function(){
		// if you land on this site from its room domain, add a bit of styling
		if (!window.location.hash) {
			$("#home-link").addClass("active-link");
		}

		// home
		$("#home-section .inner").load(Home.rootUrl + "/showoff/pages/home.html", function(){
			// a callback for the animation
			Home.animateFirstPage();
		});

		// portfolio
		$("#portfolio-section .inner").load(Home.rootUrl + "/showoff/pages/portfolio.html", function(){
			Home.setUpPortfolio();
		});

		// about
		$("#about-section .inner").load(Home.rootUrl + "/showoff/pages/about.html");

		// contact
		$("#contact-section .inner").load(Home.rootUrl + "/showoff/pages/contact.html", function(){
			// make the form interactive
			Home.makeContactFormInteractive();
		});

	},

	makeNavigationItemsClickable: function(){
		$(".nav-link").click(function(event){
			var id = this.id.split("-")[0]
			$.scrollify.move("#" + id);
		});
	},

	animateFirstPage: function(){
		$(".home-line-one").addClass("anim");

		setTimeout(function(){
			$(".home-line-two").addClass("anim");

			setTimeout(function(){
				$(".home-line-three").addClass("anim");

				setTimeout(function(){
					$(".home-line-four").addClass("anim");

					setTimeout(function(){
						$(".home-line-five").addClass("anim");
					},400);

				},400);

			},400);

		},400);
	},

	makeContactFormInteractive: function(){

		$("#contact-form-submit").click(function(){

			var message = {
				message: $("#contact-form-message").val(),
				from: $("#contact-form-from").val(),
				email: $("#contact-form-email").val()
			}

			if (!message.message || !message.from || !message.email){
				Home.createNotification("Please fill out the fields!!")
			}
			else {
				Home.sendMessage(message);
			}

		});

	},

	sendMessage: function(message){


		$.ajax({
			url: Home.rootUrl + "/showoff/php/mailer.php",
			type: "POST",
			data: message,
			success: function(response){
				console.log(response);
				if (response == "success"){
					Home.createNotification("Thank you! Your message was sent!");
					Home.clearFields();
				}

			}
		})


	},

	clearFields: function(){
		$("#contact-form-message").val("");
		$("#contact-form-from").val("");
		$("#contact-form-email").val("");
	},

	createNotification: function(message){
		// set the message
		$(".message-container").text(message);

		// show the message
		$(".message-container").addClass("show-message");

		// hide the message
		setTimeout(function(){
			$(".message-container").removeClass("show-message");
		},2000)

	},

	setUpPortfolio: function(){
		// there are a finite number of things i want to show off, all with it's own title, link, metadata etc
		// rather than repeating the HTML, lets make it dynamically generated!

		var portfolioItems = [
			{
				title: "skateLocate",
				desc: [
					"A pretty modern website as far as the technology is concerned.",
					"Add, view, and filter skateparks in your area of interest",
					"Built with the MEAN stack, bundled with JSPM, Cloudinary for images, Leaflet/Mapbox for the map engine."
				],
				bigImage: "roll-circle.png",
				iconImage: "portfolio-skate-icon.png",
				siteLink: "http://intheon.uk/skatelocate",
				features: [
					"100% Javascript on front and backend",
					"MongoDB for persistance, and lots of 2 way data binding to make it snappy",
					"Add skateparks, filter by tag or string, see most recently added and voted",
					"Deployed to Heroku, and live for all!"
				]
			},
			{
				title: "Ed Hall Audio",
				desc: [
					"Created this for a buddy of mine who runs his own recording studio and mixing service.",
					"Ed works crazy hard so if you're a musician who needs some recording help give him a shout!"
				],
				bigImage: "ed-circle.png",
				iconImage: "portfolio-guitar-icon.png",
				siteLink: "http://intheon.uk/ed",
				features: [
					"Responsive Design",
					"Instagram and Soundcloud feeds",
					"Contact form",
					"Lightweight, uses only jQuery and Semantic UI"
				]
			},/*
			{
				title: "Roll Up North",
				desc: [
					"A promotional page for a skate film my friend Nathan put together this winter.",
					"All of us have been skating for ages so thought it would be funny to make a little skate video",
					"We're always finding new spots, so I put together a skate map to allow peeps to log their own spots"
				],
				bigImage: "roll-circle.png",
				iconImage: "portfolio-skate-icon.png",
				siteLink: "http://intheon.uk/roll",
				features: [
					"Google Maps integration - Allows users to input the long/lat of their chosen skate spot into a MySQL DB via ajax",
					"Full page video background - Gotta follow those trends!",
					"Pulls in the main video from YouTube",
					"A quick promo piece"
				]
			},*/
			{
				title: "My Dashboard",
				desc: [
					"Google used to offer a personalised dashboard called iGoogle but discontinued it, so I made my own.",
					"Most complex piece of software I've written from scratch, allows you to have persistent modules that each have their own unique state. You can view your emails, todo's, keep track of your spending etc!"
				],
				bigImage: "homepage-circle.png",
				iconImage: "portfolio-homepage-icon.png",
				siteLink: "http://intheon.uk/home",
				features: [
					"REST API Backend to interact with database",
					"Multi-user system with states for each widget",
					"Heavy use of JavaScript and PHP for some wizardry",
					"Semantic UI to make it look pretty"
				]
			},
			{
				title: "Semantic Twitter",
				desc: [
					"An example of what happens when you mash up web API's",
					"Asks the user for a string, and uses the Twitter API to retreive that from their DB, then crams it through 'Semantic API' to tell you what the users feeling is."
				],
				bigImage: "twitter-circle.png",
				iconImage: "portfolio-twitter-icon.png",
				siteLink: "http://intheon.uk/twitter",
				features: [
					"Ajax based system which uses the Twitter API, and Semantic UI",
					"Displays users results as soon as they have been parsed"
				]
			},
			{
				title: "Promo Codes Generator",
				desc: [
					"I needed to generate promo codes for a client so they could distribute out free log in's for their magazine.",
					"Rather than user excel, i made this service as I no doubt will need it again"
				],
				bigImage: "promo-circle.png",
				iconImage: "portfolio-promo-icon.png",
				siteLink: "http://intheon.uk/promo",
				features: [
					"Random code generator using chance.js",
					"Allows selection of quantity of codes",
					"Some wizardry to allow the user to download to a csv"
				]
			}
		];

		Home.DrawPortfolioSlide(portfolioItems[0]);

		var currentSlide = 0;

		$(".next-column img").click(function(){

			currentSlide++;

			if (currentSlide < portfolioItems.length)
			{
				Home.DrawPortfolioSlide(portfolioItems[currentSlide]);
			}
			else
			{
				currentSlide = 0;
				Home.DrawPortfolioSlide(portfolioItems[currentSlide]);
			}

		});

	},

	DrawPortfolioSlide: function(slideMeta){
		$(".slide .image-column img").attr("src", Home.rootUrl + "/showoff/img/" + slideMeta.bigImage);
		$(".details-column header").html(slideMeta.title);

		var description = "";

		$.each(slideMeta.desc, function(i, v){
			description += "<p>"+ v +"</p>";
		});

		$(".details-column .portfolio-description").html(description);

		$(".blue-button").off("click");

		$(".blue-button").click(function(){
			window.open(slideMeta.siteLink, "_blank");
		});

		$(".features-icon img").attr("src", Home.rootUrl + "/showoff/img/" + slideMeta.iconImage);

		var features = "";

		$.each(slideMeta.features, function(i, v){
			features += "<li>" +v+ "</li>";
		});

		$(".features-list ul").html(features);

	}
}
