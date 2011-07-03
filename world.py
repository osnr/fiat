from generators import weighted_choice, \
    StateNames, Cultures, Unities, TechLevels, \
    STATE_POLITICAL_STRUCTURES, STATES

class State:
    def __init__(self, civ):
        self.structure = weighted_choice(STATE_POLITICAL_STRUCTURES)
        
        self.name = StateNames.generate(civ.culture,
                                        civ.tl,
                                        self.structure,
                                        [state.name for state in civ.states])
        state_data = STATES[civ.culture][self.name]
        
        if "generate_official_name" in state_data:
            self.official_name = state_data["generate_official_name"](civ, self.structure)
        else:
            self.official_name = self.name

class Civilization:
    def __init__(self, world):
        self.tl = world.tl
        
        # TODO clean up scopage
        self.culture = Cultures.generate(self.tl,
                                         [civ.culture for civ in world.civs])
        self.culture_desc = Cultures.describe(self.culture)
        
        self.unity = Unities.generate(self.culture)
        self.unity_desc = Unities.describe(self.unity)
        
        self.states = []
        stateCount = 1
        if self.unity == "Bipolar":
            stateCount = 2
        elif self.unity == "Multipolar":
            stateCount = weighted_choice({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1}) + 3
            
        for i in range(stateCount):
            self.states.append(State(self))

class World:
    def __init__(self):
        self.tl = TechLevels.generate()
        
        self.civs = []
        civCount = 3
        for i in range(civCount):
            self.civs.append(Civilization(self))
