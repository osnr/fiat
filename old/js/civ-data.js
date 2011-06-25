var weightedChoice = function(weights, pastChoices) {
	var totalWeight = 0, rnd, pick;

	for (var choice in weights) {
		totalWeight += weights[choice];
	}

	do {
		rnd = Math.random() * totalWeight;

		for (choice in weights) {
			if (rnd < weights[choice]) {
				pick = choice;
				break;
			}
			rnd = rnd - weights[choice];
		}
	} while (pastChoices && $.inArray(choice, pastChoices) > -1);
	return pick;
};

var rand = function(max) {
	return Math.floor(Math.random() * max);
};

var TechLevels = {
	generate: function() {
		return weightedChoice({
			"1": .155, // .465% / 3
			"2": .155,
			"3": .155,

			"4": 4.16,

			"5": 4.65,

			"6": 28.26,

			"7": 53.22,

			"8": 7.38,

			"9": 1.86
		});
	}
};

var Cultures = {
	generate: function(tl, usedCultures) {
		var culture;
		
		switch (tl) {
		case "0":
		case "1":
			culture = weightedChoice({
				"Andean": 0.465,

				"Hittite": 4.16,

				"Chinese": 21.31,

				"Egyptian": 24.09,

				"Mesopotamian": 33.81,

				"Indus Valley": 6.93,

				"Minoan": 7.38,

				"Mesoamerican": 1.40,

				"Retrogression": 0.462
			}, usedCultures);
			if (culture === "Retrogression") {
				culture = Cultures.generate("2", usedCultures);
			}
			break;

		case "2":
			culture = weightedChoice({
				"Mississippian": 0.465,

				"Andean": 0.696,
				"Mesoamerican": 0.696,

				"Celtic": 2.77,

				"Bactrian": 4.65,

				"Indic": 6.92,

				"Iranic": 9.73,

				"Hellenic": 11.61,

				"Chinese": 25.00,

				"Roman": 21.29,

				"Steppe": 6.93,

				"Mesopotamian": 4.63,

				"West African": 2.75,

				"Survival": 1.86
			}, usedCultures);
			if (culture === "Survival") {
				culture = Cultures.generate("1", usedCultures);
			}
			break;

		case "3":
		case "4":
			culture = weightedChoice({
				"Mississippian": 0.155,
				"Andean": 0.155,
				"Mesoamerican": 0.155,

				"Malay": 1.39,

				"Japanese": 2.77,

				"Norse": 4.65,

				"Indic": 6.92,

				"Orthodox": 9.73,

				"Chinese": 24.09,

				"Islamic": 12.52,

				"Western": 21.29,

				"Steppe": 6.93,

				"Roman": 4.63,

				"Survival": 4.15,

				"West African": 0.462
			}, usedCultures);
			if (culture === "Survival") {
				culture = Cultures.generate(2, usedCultures);
			}
			break;

		case "5":
		case "6":
			culture = weightedChoice({
				"Malay": 0.93,
				"West African": 0.93,

				"Japanese": 2.77,

				"Indic": 11.58,

				"Chinese": 21.34,

				"Western": 36.55,

				"Islamic": 9.74,

				"Orthodox": 11.56,

				"Survival": 4.61
			}, usedCultures);
			if (culture === "Survival") {
				culture = Cultures.generate("4", usedCultures);
			}
			break;

		case "7":
		case "8":
		case "9":
			culture = weightedChoice({
				"Malay": 0.93,
				"West African": 0.93,

				"Indic": 14.35,

				"Chinese": 10.67,
				"Japanese": 10.67,

				"Western": 36.55,

				"Orthodox": 9.74,

				"Islamic": 15.70,

				"Survival": 0.462
			}, usedCultures);
			if (culture === "Survival") {
				culture = Cultures.generate("4", usedCultures);
			}
		}
		return culture;
	},

	describe: function(culture) {
		return CULTURE_DESCRIPTIONS[culture];
	}
};

var CULTURE_DESCRIPTIONS = {
	"Andean": "A series of increasingly complex cultures in western South America from the Chavin (c. 850 B.C.) to the Inca, who fell to plague and Western conquest in 1533.",

	"Bactrian": "A polyglot, possibly multiracial, urban trading and horsebreeding civilization arose in the seventh century B.C. in Central Asia and maintained a precarious existence despite numerous conquests until it became the battleground between the Islamic and Chinese civilizations in 750 A.D.",

	"Celtic": "Celtic civilization (building hill-towns by 550 B.C.) was almost entirely assimilated by the Roman civilization by 100 A.D. Increasingly Westernized outliers survived in Ireland and northern Britain until the 13th century.",

	"Chinese": "The oldest civilization still in existence, the culture that began with Lao Tzu and Confucius in the seventh and sixth centuries B.C. still predominates in East Asia from Timor to Tibet.",

	"Egyptian": "Egyptian civilization spread along the Nile from 3100 B.C. until its absorption into the Hellenic civilization by Alexander the Great in 330 B.C.",

	"Hellenic": "The barbaric successors to Minoan civilization created their own urbanized, adventurous, quarrelsome culture after 800 B.C. that eventually spread from southern Italy to Afghanistan. It fell to the Roman civilization in the second century B.C., but strongly influenced its conquerors.",

	"Hittite": "Hittite civilization arose in Anatolia around 1800 B.C. The Hittite Empire fell around 1200 B.C., and the Iranic and Hellenic civilizations absorbed its successor states by 550 B.C.",

	"Indic": "After a lengthy period of chaos and religious ferment, a common civilization extended across all of India by 320 B.C. and the rise of the Maurya Empire. It has withstood several invasions by the Islamic civilization, and conquest by the Steppe and Western civilizations.",

	"Indus Valley": "Very little is known about this civilization, centered on Harappa and Mohenjo-Daro between 2500 and 1500 B.C. It may have traded with Mesopotamia, and may have fallen to barbarian invasion, but neither is certain.",
	
	"Iranic": "The same “Arya” barbarian invaders who produced Indic civilization built Iranic civilization in Persia in the sixth century B.C. It rapidly conquered everything from the Nile to the Indus. Although its influences spread even farther, wars with the Hellenic and Roman civilizations reduced it to its core territory until it fell to the Islamic civilization in 640 A.D.	Its	assimilation	remains imperfect to this day.",

	"Islamic": "Although it began as a puritanical, leveling culture in the seventh century A.D., its conquest of lands from Spain to Bengal produced a sophisticated, even discursive civilization that remains dominant in north Africa, central Asia, and the Middle East today despite Western influences and pressures.",

	"Japanese": "An outlier of Chinese civilization developed its own combination of aesthetics and brutality in the Heian period (794-1192). Since the mid-19th century, it has been slowly assimilating into Western civilization.",

	"Malay": "A vibrant, hybrid trading civilization grew from Chinese, Islamic, and Indic outliers in the Malay peninsula and Indonesia, starting with the kingdom of Srivijaya in 700 A.D. Since the mid-17th century, it has been assimilating into Chinese and Western civilization.",

	"Mesoamerican": "A number of small city-states spread from central Mexico and Yucatan into a common civilization by 200 B.C., but never unified politically.	The	various	MesoAmerican cultures all fell to Western conquerors during the 16th century.",

	"Mesopotamian": "Urban civilization was born with the Sumerian culture around 3500 B.C. Its ritual and political structures continued (with the occasional dark age) through the Akkadian, Babylonian, Assyrian, and Chaldean cultures that followed until being imperfectly assimilated into the Iranic civilization in the sixth century B.C. Islamic conquest wiped out its last remnants.",

	"Minoan": "Little is known about this bull-obsessed civilization centered on Crete. It may have founded the Mycenean pirate kingdoms or been destroyed by them, or both. It flourished between 2600 and 1400 B.C.; the Myceneans themselves fell to barbarians by 1100 B.C.",

	"Mississippian": "A loose multi-tribal trading network rose along the Mississippi-Ohio Valley in North America by 800 A.D.; it may still have been too diffuse to be a true civilization by the time its main centers collapsed in ecological exhaustion around 1350. Its final outliers fell to Western settlers in the 18th century. For game purposes, the GM can add Algonquin and Siouan confederacies like Pontiac, Tecumseh, or the Iroquois to this civilization.",

	"Norse": "The last vigorous, expanding pagan civilization probably arose in the sixth century A.D., but became thoroughly Westernized and Christian by 1100.",

	"Roman": "Began around 600 B.C.	with the Etruscan League of Cities, and built a unified empire and expanded over Europe, northern Africa, and the Middle East. Religious disputes, plagues, and barbarian invasions compounded the stresses of empire, and it collapsed around 450 A.D.",

	"Orthodox": "The successor state to Roman civilization incubated in its eastern half (Greece, the Balkans, and the Middle East) around 330 A.D. In the 10th century A.D., it successfully spread to Russia, which became its new center after the conquest of its old core by the Islamic civilization. Survives in Russia and the Balkans today.",

	"Steppe": "Only seldom urbanized, save for caravanserais, the steppe tribes (of many cultures and ethnicities from Scythians to Mongols) shared characteristics (especially military tactics) driven by their nomadic lifestyle and common environment. Independent steppe civilizations existed from 600 B.C. or before; by 1650 the last of them had been subdued by the Orthodox Russians or fully assimilated by their “subject” civilizations in Mogul India and Manchu China.",

	"West African": "Iron-working, goldmining, industrious traders spread along the Niger, Volta, and Senegal Rivers during the seventh century A.D. By 1700 A.D., their urban centers (which eventually reached the Congo and Sudan) had all fallen to Islamic or Western conquest, although successors resisted assimilation until the late 1880s.",

	"Western": "Born by 550 A.D. out of the mix of German invaders and the fallen Roman civilization, Western civilization fought off a series of invasions and then began expanding out of western Europe. By 1100, it had reached the borders of Russia and invaded Asia; by 1500, it was planted in Africa, India, and the Americas. It has dominated the globe since the 19th century."
}

var Unities = {
	generate: function(culture) {
		// Kind of a messy translation from GURPS 2d + modifiers
		var dieRoll;

		do {
			dieRoll = parseFloat(weightedChoice({
				2: 2.78,

				3: 5.53,
				4: 8.29,

				5: 11.1,
				6: 13.88,

				7: 16.66,

				8: 13.94,

				9: 11.19,
				10: 8.33,
				11: 5.54,

				12: 2.76
			}));

			dieRoll = modifyUnityRoll(dieRoll, culture);
		} while (dieRoll < 1 || dieRoll > 12);

		switch (dieRoll) {
		case 2:
			return "Unitary";

		case 3:
		case 4:
			return "Empire";

		case 5:
		case 6:
			return "Empire with satellite states";

		case 7:
			return "Empire with rivals";

		case 8:
			return "Bipolar";

		case 9:
		case 10:
		case 11:
			return "Multipolar";

		case 12:
			return "Diffuse";
		}
	},

	describe: function(unity) {
		return CIV_UNITY_DESCRIPTIONS[unity];
	}
};

var CIV_UNITY_DESCRIPTIONS = {
	"Unitary": "This civilization consists of one, essentially homogeneous, state. Although powerful and advanced, it has no significant colonies in other civilizations' territory. The Japanese civilization has usually been unitary, except for a brief period from 1890 to 1945.",
	"Empire": "This civilization is unified under one state, which has conquered all the other states in this civilization. An empire usually has colonies or military bases in other civilizations' territory, but not always: the Chinese empire seldom has, except for Tibet and occasional forays into the steppes of Central Asia.",
	"Empire with satellite states": "Some of the states under the empire's umbrella maintain local independence, but do not (or cannot) chart independent foreign policies. The Roman and Soviet empires both used this model.",
	"Empire with rivals": "Although the empire is by far the most powerful state within the civilization, other states retain considerable independence and might conceivably ally against it, or back other civilizations' empires against it diplomatically or militarily. Imperial states are not necessarily dictatorships; the United States, under this definition, has been a democratic empire with rivals dominating Western civilization since 1945.",
	"Bipolar": "The civilization is divided between two great powers, with lesser states unable to chart separate courses.",
	"Multipolar": "There are a number of great power states within this civilization with substantial capacity for independent action against other civilizations, or other lesser states in their own civilization.",
	"Diffuse": "This civilization has no central concentration of power; its individual states (if any) set their own course and run their own risks. Steppe civilizations, or collections of city-states, usually fluctuate between diffusion and empires."
}

var CIV_UNITY_MODIFIERS = {
	"Japanese": -4,
	"Andean": -4,

	"Egyptian": -2,
	"Orthodox": -2,

	"Chinese": -1,
	"Roman": -1,

	"Islamic": 1,

	"Western": 2,
	"Bactrian": 2,
	"Hellenic": 2,
	"Indic": 2,

	"Celtic": 4,
	"Norse": 4
};

var modifyUnityRoll = function(unityRoll, culture) {
	if (CIV_UNITY_MODIFIERS[culture]) {
		return unityRoll + CIV_UNITY_MODIFIERS[culture];
	} else {
		return unityRoll;
	}
};

var STATES = {
	"Andean": {"Chavin": {},
			   "Moche": {},
			   "Tihuanaco": {},
			   "Inca Empire": {},
			   "Amaru Republic": {}},

	"Bactrian":	{"Ferghana": {},
				 "Sogdia": {},
				 "Bactria": {},
				 "Tocharia": {},
				 "Kushan Empire": {},
				 "Bokhara": {},
				 "Balkh": {},
				 "Samarqand": {}},

	"Celtic": {"Cisalpine Gaul": {},
			   "Galatia": {},
			   "Nervii": {},
			   "Vercingetorix's league": {},
			   "Iceni": {},
			   "Camelot": {},
			   "Eire": {}},

	"Chinese": {"Han": {},
				"Ming": {
					weight_by_tl: {
						"1": 2,
						"2": 3,
						"3": 7,
						"4": 8,
						"5": 7,
						"6": 4,
						"7": 3,
						"8": 2,
						"9": 1
					}
				},
				"Jin": {},
				"Funan": {},
				"Champa": {},
				"Korea": {},
				"Khitai": {},
				"Manchu": {
					weight_by_tl: {
						"0": 1,
						"1": 1,
						"2": 2,
						"3": 3,
						"4": 8,
						"5": 10,
						"6": 12,
						"7": 7,
						"8": 3,
						"9": 1
					},
					generate_official_name: function(civ, structure) {
						switch (structure) {
						case "Anarchy":
						case "Tribal":
							return "Manchu";

						case "Representative democracy":
						case "Athenian democracy":
							return "Manchu Republic";

						default:
							return "Empire of the Great Qing";
						}	
					},
					generate_capital: function(civ, structure) {
						return "Peking";
					}
				},
				"Taiping Holy Empire": {},
				"China": { // Modern China
					weight_by_tl: {

					},
					generate_official_name: function(civ, structure) {
						return "Republic of China";
					}
				},
				"Communist China": { // Communist China
					weight_by_tl: {

					},
					generate_official_name: function(civ, structure) {
						return weightedChoice({
							"People's Republic of China": 0.9,
							"Chinese Soviet Republic": 0.01
						});
					},
					generate_capital: function(civ, structure) {
						return "Beijing";
					}
				},
				"Hongkong LLC": {}},

	"Egyptian": {"Khemet (ancient Egypt)": {},
				 "Upper and Lower Egypt": {},
				 "Canaan": {},
				 "Keftiu": {},
				 "Kush": {},
				 "Aigyptos": {},
				 "Coptic Sun Kingdom": {}},

	"Hellenic": {"Athens": {},
				 "Sparta": {},
				 "Syracuse": {},
				 "Thebes": {},
				 "Ionia": {},
				 "Magna Graecia": {},
				 "Macedonian Empire": {},
				 "Alexandrian Oikoumene": {},
				 "Seleucid Syria": {},
				 "Ptolemaic Egypt": {},
				 "Greco-Bactria": {}},

	"Hittite": {"Old and New Hittite Empires": {},
				"Hurrian Empire": {},
				"Mitanni": {},
				"Aram": {},
				"Urartu": {}},

	"Indic": {"Maurya Empire": {},
			  "Malwa": {},
			  "Gupta Empire": {},
			  "Maharashtra": {},
			  "Chola": {},
			  "Delhi": {},
			  "Bengal": {},
			  "Mogul Empire": {},
			  "Mahratta League": {},
			  "Punjab": {},
			  "United India": {},
			  "India": {}},

	"Indus Valley": {"Harappa": {},
					 "Mohenjo-Daro": {},
					 "Dilmun": {}},

	"Iranic": {"Elam": {},
			   "Persia": {},
			   "Media": {},
			   "Achaemenid Empire": {},
			   "Scythian Bosporus": {},
			   "Chorasmia": {},
			   "Parthia": {},
			   "Sassanid Empire": {},
			   "Safavid Empire": {}},

	"Islamic": {"Umayyad Caliphate": {},
				"Abbasid Caliphate": {},
				"Buwayhid Empire": {},
				"Ghaznavid Empire": {},
				"Andalus": {},
				"Almohade Empire": {},
				"Fatimid Egypt": {},
				"Khwarizm": {},
				"Sultanate of Delhi": {},
				"Ottoman Empire": {},
				"United Arab Republic": {},
				"Caliphate": {}},

	"Japanese": {"Empire of Greater Japan": {},
				 "Greater East Asia Co-Prosperity Sphere": {},
				 "Japan": {
					 generate_official_name: function(civ, structure) {
						 switch (structure) {
						 case "Caste":
						 case "Feudal":
							 return "Japanese Shogunate";

						 default:
							 return "Japan";
						 }
					 }
				 }},

	"Malay": {"Srivijaya": {},
			  "Majapahit": {},
			  "Javanese Empire": {},
			  "Malacca": {},
			  "Indonesia": {}},

	"Mesoamerican": {"Teotihuacan": {},
					 "Zapotecs": {},
					 "Mixtecs": {},
					 "Maya": {},
					 "Toltecs": {},
					 "Aztecs": {
						 generate_official_name: function(civ, structure) {
							 switch(structure) {
							 case "Anarchy": return "Mexica Peoples";
							 case "Representative democracy": return "United Mexican States";
							 default: return "Aztec Triple Alliance";
							 }
						 }
					 }},
	
	"Mesopotamian": {"Sumer": {},
					 "Ugarit": {},
					 "Akkad": {},
					 "Amor": {},
					 "Babylon": {},
					 "Assyria": {},
					 "Chaldea": {}},

	"Minoan": {"Knossos": {},
			   "Mycenae": {},
			   "Troy": {}},

	"Mississippian": {"Adena": {},
					  "Hopewell Indians": {},
					  "Tuskegee": {},
					  "Muskogea": {},
					  "Cahokia": {},
					  "Natchez": {}},

	"Norse": {"Norway": {},
			  "Denmark": {},
			  "Sweden": {},
			  "Holmgard": {},
			  "Koenugard": {},
			  "Iceland": {},
			  "Vinland": {},
			  "England": {},
			  "Scotland": {},
			  "Ireland": {}},

	"Orthodox": {"Byzantium": {},
				 "Bulgaria": {},
				 "Kievan Rus": {},
				 "Serbia": {},
				 "Muscovy": {},
				 "Russia": {
					 generate_official_name: function(civ, structure) {
						 switch (civ.unity) {
						 case "Empire":
						 case "Empire with satellite states":
						 case "Empire with rivals":
							 return "Russian Empire";

						 default:
							 return "Tsardom of Russia";
						 }
					 }
				 },
				 "Soviet Union": {
					 generate_official_name: function(civ, structure) {
						 switch (civ.unity) {
						 case "Empire":
						 case "Empire with satellite states":
						 case "Empire with rivals":
							 return "Union of Soviet Socialist Republics";

						 default:
							 return "Russian Soviet Federative Republic";
						 }
					 }
				 },
				 "Russian Republic": {},
				 "Ukraine": {}},

	"Roman": {"Etruria": {},
			  "Roman Republic": {},
			  "Sertorian Spain": {},
			  "Roman Empire": {},
			  "Kingdom of Syagrius": {},
			  "Arthurian Britain": {}},

	"Steppe": {"Scythia": {},
			   "Saka": {},
			   "Sarmatia": {},
			   "Yueh-Chih": {},
			   "Hunnic Empire": {},
			   "Khazar Khanate": {},
			   "Seljuk Empire": {},
			   "Mongols": {
				   weight_by_tl: {
					   "0": 3,
					   "1": 3,
					   "2": 8,
					   "3": 9,
					   "4": 12,
					   "5": 1,
					   "6": 1,
					   "7": 1,
					   "8": 1,
					   "9": 1
				   },
				   
				   generate_official_name: function(civ, structure) {
					   switch (structure) {
					   case "Anarchy":
					   case "Tribal":
						   return "Mongol Tribes";

					   case "Representative democracy":
					   case "Athenian democracy":
						   return "Republic of Mongolia";

					   default:
						   return "Mongol Khaganate";
					   }
				   },
				   
			   },
			   "Golden Horde": {},
			   "Timurid Empire": {}
			  },

	"West African": {"Ghana": {},
					 "Mali": {},
					 "Audoghast": {},
					 "Dahomey": {},
					 "Yoruba": {},
					 "Hausa": {},
					 "Kongo": {}},

	"Western": {"Holy Roman Empire": {},
				"Venice": {},
				"France": {},
				"Poland": {},
				"Crusader states": {},
				"Portugal": {},
				"Austria": {},
				"Dutch": {},
				"Prussia": {},
				"Great Britain": {},
				"United States of America": {},
				"Mexico": {
					
				},
				"Empire of Brazil": {},
				"Confederate States of America": {},
				"Germany": {},
				"European Union": {
					weight_by_tl: {
						"0": 0,
						"1": 0,
						"2": 0,
						"3": 0.5,
						"4": 0.6,
						"5": 1,
						"6": 2,
						"7": 5,
						"8": 10,
						"9": 12
					}
				}}
};

var StateNames = {
	generate: function(culture, tl, structure, usedNames) {
		var stateChoices = STATES[culture],
		nameWeights = {};

		$.each(stateChoices, function(name, props) {
			nameWeights[name] = !props.weight_by_tl ? 1 :
				(props.weight_by_tl[tl] ? props.weight_by_tl[tl] : 1);
		});

		return weightedChoice(nameWeights, usedNames);
	}
};

var STATE_POLITICAL_STRUCTURES = {
	"Anarchy": 0.465,

	"Technocracy": 1.39,

	"Caste": 2.77,

	"Feudal": 14.35,

	"Dictatorship": 36.61,

	"Oligarchy": 11.60,

	"Representative democracy": 9.72,

	"Tribal": 11.51,

	"Theocracy": 2.79,

	"Corporate state": 1.39,

	"Athenian democracy": 0.462
};