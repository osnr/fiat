$(document).ready(function() {
	$.get("/generateworld", function(world) {
		var display_state = function(state, disp) {
			disp.find(".official-name").text(state.official_name);
			disp.find(".name").text(state.name);
			disp.find(".structure").text(state.structure);
		};
		
		var display_civ = function(civ, disp) {
			disp.find(".tl").text(civ.tl);
			disp.find(".culture")
				.text(civ.culture)
			
				.mouseover(function() {
					var desc_disp = $('<div class="culture-desc"></div>').text(civ.culture_desc);
					disp.find(".culture").parent().append(desc_disp);
				})
				.mouseout(function() {
					$(".culture-desc").remove();
				});

			disp.find(".unity")
				.text(civ.unity)
			
				.mouseover(function() {
					var desc_disp = $('<div class="unity-desc"></div>').text(civ.unity_desc);
					disp.find(".unity").parent().append(desc_disp);
				})
				.mouseout(function() {
					$(".unity-desc").remove();
				});

			$.each(civ.states, function(index, state) {
				var state_disp = disp.find(".state").first().clone();

				display_state(state, state_disp);

				disp.append(state_disp);
				state_disp.show();
			});
			disp.find(".state").first().remove();
		};


		var display_world = function(world) {
			$("#world-tl").text(world.tl);

			$.each(world.civs, function(index, civ) {
				var civ_disp = $(".civ").first().clone();

				display_civ(civ, civ_disp);
				
				$(".civ").parent().append(civ_disp);
				civ_disp.show();
			});
			$(".civ").first().remove();

			$(".civ-heading").first().text("Dominant civilization");
		};

		world = eval("("+world+")");
		display_world(world);
	});
});