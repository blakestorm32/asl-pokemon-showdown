// data/mods/gen9aslnatdexdraft/index.ts
export const Scripts: ModdedBattleScriptsData = {
	init() {
		// Base Gen 9 data
		Object.assign(this.data.Moves, Dex.mod('gen9').data.Moves);
		Object.assign(this.data.Learnsets, Dex.mod('gen9').data.Learnsets);
		Object.assign(this.data.Pokedex, Dex.mod('gen9').data.Pokedex);

		// Merge older generations for National Dex behavior
		this.includeModData('gen8');
		this.includeModData('gen7');
		this.includeModData('gen6');
		this.includeModData('gen5');
		this.includeModData('gen4');
		this.includeModData('gen3');
		this.includeModData('gen2');
		this.includeModData('gen1');
	},
};
