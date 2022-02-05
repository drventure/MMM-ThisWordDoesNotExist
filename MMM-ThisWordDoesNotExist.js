Module.register("MMM-ThisWordDoesNotExist", {
	// Default module config.
	defaults: {
		updateInterval: 120000,
		headerText: "ThisWordDoesNotExist"
	},
	
	requiresVersion: "2.1.0",

	start: function() {
		this.dataNotification = null;
		this.getWord();

		var self = this;
        //Schedule updates
		console.log("ThisWordDoesNotExist-UpdateInterval: " + this.config.updateInterval);
        setInterval(function() {
            self.getWord();
            //self.updateDom();
        }, this.config.updateInterval);
	},
	
	getScripts: function() {
		return [
			//not used for ThisWordDoesNotExist
			//'xml2json.min.js',
		]
	},
	
	getStyles: function() {
		return [
			this.file('style.css'), // this file will be loaded straight from the module folder.
		]
	},
	
	//Contact node helper for solar data
	getWord: function() {
		console.log("WordGenius-getting word");

		this.sendSocketNotification("MMM_ThisWordDoesNotExist_GetWord", {
			config: this.config
		});
	},
	
	socketNotificationReceived: function (notification, payload) {
		console.log("ThisWordDoesNotExist-Got notification" + notification);
		if (notification === "MMM_ThisWordDoesNotExist_Result") {
			console.log("ThisWordDoesNotExist-Got notification");
			console.log(payload);
			this.dataNotification = payload;
			this.updateDom(self.config.animationSpeed);
		}
	},

	// Override dom generator.
	getDom: function() {
		console.log("ThisWordDoesNotExist-GetDOM");
		var wrapper = document.createElement("div");
		wrapper.setAttribute('class', 'thisworddoesnotexist');

		var wotd = document.createElement("div");
		wotd.setAttribute('class', 'thisworddoesnotexist-title');
		
		var headerLabel = document.createElement("header");
		headerLabel.setAttribute('class', 'thisworddoesnotexist-header module-header');
		headerLabel.innerHTML = "<span>" + this.config.headerText + "</span>";
		
		var partOfSpeech = document.createElement("span");
		partOfSpeech.setAttribute('class', 'thisworddoesnotexist-partofspeech');

		var pronunciation = document.createElement("span");
		pronunciation.setAttribute('class', 'thisworddoesnotexist-pronunciation');

		var definition = document.createElement("span");
		definition.setAttribute('class', 'thisworddoesnotexist-definition');

		console.log("ThisWordDoesNotExist-using object:");
		console.log(this.dataNotification);
		if (this.dataNotification) {
			wotd.innerHTML = this.dataNotification.word;
			partOfSpeech.innerHTML = this.dataNotification.partOfSpeech + "&nbsp;&middot;&nbsp;";
			pronunciation.innerHTML = this.dataNotification.pronunciation + "&nbsp;&middot;&nbsp;";

			var defs = this.dataNotification.definitions;
			var def = defs[0];
			def = def.replace("\n", "<br>");
			definition.innerHTML = def;
		}
		wrapper.appendChild(headerLabel);
		wrapper.appendChild(wotd);
		wrapper.appendChild(partOfSpeech);
		wrapper.appendChild(pronunciation);
		wrapper.appendChild(definition);
		return wrapper;
	},
});
