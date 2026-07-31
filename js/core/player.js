//========================
// 玩家資料
//========================
const player = {

    level: 1,

    exp: 0,

    expToNextLevel: 100,

    money: 0,

    currentArea: 1,

    exploringAreaId: null,

    materials: {},
	equipmentLevels: {

    recoveryTools: 1

},
specialPurchases: {

    stellarEnergyModule:
        false

},

    discoveredAreas: [],

    isExploring: false,

    remainingTime: 0,

    activeEvent: null,
	

    characterState: "idle",
	
	logs: [
    "歡迎來到 KO-PE Idle！"
],

settings: {

    eventSound: true,

    eventTitleNotification: true,

    autoScrollLog: true,

    showPlayerName: true

}

};
//========================
// 等級系統
//========================
// 計算下一級需要的經驗值
function calculateExpToNextLevel(level) {

    return 100 + (level - 1) * 50;

}
// 檢查玩家是否可以升級
function checkLevelUp() {

    while (player.exp >= player.expToNextLevel) {

        player.exp =
            player.exp - player.expToNextLevel;

        player.level =
            player.level + 1;

        player.expToNextLevel =
            calculateExpToNextLevel(player.level);

        addLog(
            "等級提升！KO-PE 現在是 Lv." +
            player.level +
            "！"
        );
		const newlyUnlockedAreas =
    areas.filter(function (area) {

        return (
            area.levelRequired ===
                player.level &&
            isAreaUnlocked(area) &&
            isAreaDiscovered(area)
        );

    });

newlyUnlockedAreas.forEach(
    function (area) {

        addLog(
            "新區域解鎖：「" +
            area.name +
            "」！"
        );

    }
);

    }

}

//========================
// 裝備效果計算
//========================

function getPlayerEffects() {

    const effects = {

        commonMaterialBonusChance:
            0,

        explorationSpeed:
            0,

        expBonus:
            0,

        eventSuccessBonus:
            0

    };

    equipmentData.forEach(
        function (equipment) {

            const currentLevelData =
                getCurrentEquipmentLevelData(
                    equipment.id
                );

            if (
                !currentLevelData ||
                !currentLevelData.effects
            ) {

                return;

            }

            Object.entries(
                currentLevelData.effects
            ).forEach(
                function (
                    [effectId, value]
                ) {

                    if (
                        typeof value !==
                        "number"
                    ) {

                        return;

                    }

                    if (
                        typeof effects[
                            effectId
                        ] !== "number"
                    ) {

                        effects[
                            effectId
                        ] = 0;

                    }

                    effects[
                        effectId
                    ] += value;

                }
            );

        }
    );

    return effects;

}