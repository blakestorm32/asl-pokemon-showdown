export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	terablastlegal: {
		inherit: true,
		onModifyLearnset(move, species) {
		const allowedMoves = ["terablast"]; // etc.
		if (allowedMoves.includes(move.id)) {
			return {type: "learnable"}; // Treat as legal
		}
	},
}
