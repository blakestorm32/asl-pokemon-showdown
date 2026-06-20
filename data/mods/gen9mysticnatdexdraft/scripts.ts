export const Scripts: ModdedBattleScriptsData = {
	gen: 9,

	clearVolatile(includeSwitchFlags) {
			this.boosts = {
				atk: 0,
				def: 0,
				spa: 0,
				spd: 0,
				spe: 0,
				accuracy: 0,
				evasion: 0,
			};

			this.moveSlots = this.baseMoveSlots.slice();

			this.transformed = false;
			this.ability = this.baseAbility;
			this.hpType = this.baseHpType;
			this.hpPower = this.baseHpPower;
			if (this.canTerastallize === false) this.canTerastallize = this.teraType;
			for (const i in this.volatiles) {
				if (this.volatiles[i].linkedStatus) {
					this.removeLinkedVolatiles(this.volatiles[i].linkedStatus, this.volatiles[i].linkedPokemon);
				}
			}
			if (this.species.name === 'Eternatus-Eternamax' && this.volatiles['dynamax']) {
				this.volatiles = { dynamax: this.volatiles['dynamax'] };
			} else {
				this.volatiles = {};
			}
			if (includeSwitchFlags) {
				this.switchFlag = false;
				this.forceSwitchFlag = false;
			}

			this.lastMove = null;
			this.lastMoveEncore = null;
			this.lastMoveUsed = null;
			this.moveThisTurn = '';
			this.moveLastTurnResult = undefined;
			this.moveThisTurnResult = undefined;

			this.lastDamage = 0;
			this.attackedBy = [];
			this.hurtThisTurn = null;
			this.newlySwitched = true;
			this.beingCalledBack = false;
			this.timesAttacked = 0;

			this.volatileStaleness = undefined;

			delete this.abilityState.started;
			delete this.itemState.started;

			this.setSpecies(this.baseSpecies);
		},
};
