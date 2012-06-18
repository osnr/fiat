$(document).ready(function() {
	var State = function(civ) {
		this.structure = weightedChoice(STATE_POLITICAL_STRUCTURES);

		this.name = StateNames.generate(civ.culture,
										civ.tl,
										this.structure,
										$.map(civ.states, function(state, index) {
											return state.name; }));
		var stateBase = STATES[civ.culture][this.name];

		if (stateBase.generate_official_name) {
			this.officialName = stateBase.generate_official_name(civ, this.structure);
		} else {
			this.officialName = this.name;
		}
		
		this.display = function(disp) {
			disp.find(".official-name").text(this.officialName);
			disp.find(".name").text(this.name);
			disp.find(".structure").text(this.structure);
		};
	}
				
	var Civilization = function(world) {
		this.tl = world.tl;

		// TODO clean up scopage
		var culture = Cultures.generate(this.tl,
										 $.map(world.civs, function(civ, index) {
											 return civ.culture; }));
		this.culture = culture;

		var unity = Unities.generate(this.culture);
		this.unity = unity;
		
		this.states = [];
		var stateCount = 1;
		if (this.unity === "Bipolar") {
			stateCount = 2;
		} else if (this.unity === "Multipolar") {
			stateCount = rand(6) + 3;
		}

		for (var i = 0; i < stateCount; i++) {
			this.states.push(new State(this));
		}

		this.display = function(disp) {
			disp.find(".tl").text(this.tl);
			disp.find(".culture")
				.text(this.culture)
			
				.mouseover(function() {
					var descDisp = $('<div class="culture-desc"></div>').text(Cultures.describe(culture));
					disp.find(".culture").parent().append(descDisp);
				})
				.mouseout(function() {
					$(".culture-desc").remove();
				});

			disp.find(".unity")
				.text(this.unity)
			
				.mouseover(function() {
					var descDisp = $('<div class="unity-desc"></div>').text(Unities.describe(unity));
					disp.find(".unity").parent().append(descDisp);
				})
				.mouseout(function() {
					$(".unity-desc").remove();
				});

			$.each(this.states, function(index, state) {
				var stateDisp = disp.find(".state").first().clone();

				state.display(stateDisp);

				disp.append(stateDisp);
				stateDisp.show();
			});
			disp.find(".state").first().remove();
		};
		
		return this;
	}

	var World = function() {
		this.tl = TechLevels.generate();

		this.civs = [];
		var civCount = 3;
		for (var i = 0; i < civCount; i++) {
			this.civs.push(new Civilization(this));
		}

		this.display = function() {
			$("#world-tl").text(this.tl);

			$.each(this.civs, function(index, civ) {
				var civDisp = $(".civ").first().clone();

				civ.display(civDisp);
				
				$(".civ").parent().append(civDisp);
				civDisp.show();
			});
			$(".civ").first().remove();

			$(".civ-heading").first().text("Dominant civilization");
		};
		return this;
	};

	var world = new World();
	world.display();
});