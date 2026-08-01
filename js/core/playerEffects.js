function getPlayerEffects() {

    const effects = {

        commonMaterialBonusChance: 0,

        rareMaterialBonusChance: 0,

        explorationSpeed: 0,

        expMultiplier: 0,

        eventSuccessBonus: 0,

        specialEventChance: 0,
		
		blackGoldBonus: 0,

		materialSellBonus: 0,

        lossReduction: 0

    };

    equipmentData.forEach(function (equipment) {

        const currentLevel =
            getCurrentEquipmentLevelData(
                equipment.id
            );

        if (
            !currentLevel ||
            !currentLevel.effects
        ) {

            return;

        }

        Object.entries(
            currentLevel.effects
        ).forEach(function ([key, value]) {

            if (
                typeof effects[key] === "number"
            ) {

                effects[key] += value;

            }

        });

    });

    return effects;

}