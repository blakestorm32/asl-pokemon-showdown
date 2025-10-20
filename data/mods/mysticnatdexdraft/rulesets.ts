export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	terablastlegal: {
		inherit: true,
		onValidateSet(set) {
		// Allow 'Tera Blast' for everyone
			if (set.moves && !set.moves.includes("terablast")) {
			// no special check, just let validator skip
			}
		},
		onModifyLearnset(move, species) {
		// Add "Tera Blast" to everyone's legal learnset
			if (move.id === "terablast") return {type: "learnable"};
		},
}
