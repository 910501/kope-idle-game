//========================
// 開發模式
//========================

//========================
// 開發工具
//========================

const debug = {

    loadDebugSave() {

        const debugSave =
            createSaveData();

        debugSave.level = 50;

        debugSave.exp = 0;

        debugSave.expToNextLevel =
            999999;

        debugSave.money =
            999999;

        Object.keys(
            debugSave.materials
        ).forEach(

            function (materialId) {

                debugSave.materials[
                    materialId
                ] = 999;

            }

        );

        equipmentData.forEach(

            function (equipment) {

                debugSave.equipmentLevels[
                    equipment.id
                ] =
                equipment.levels.length;

            }

        );

        debugSave.discoveredAreas = [
            1,
            2,
            3,
            4,
            5
        ];

        applyPlayerData(
            debugSave
        );

        restoreGameState();

        updateUI();

        console.log(
            "已載入 Debug 存檔。"
        );

    },
	addMoney(amount) {

    player.money += amount;

    updateUI();

    console.log(
        "黑金晶片 +" +
        amount
    );

},
addExp(amount) {

    player.exp += amount;

    checkLevelUp();

    updateUI();

    console.log(
        "EXP +" +
        amount
    );

},
completeCurrentExploration() {

    if (!player.isExploring) {

        console.warn(
            "目前沒有進行中的探索。"
        );

        return;

    }

    finishExploration();

},
forceEvent() {

    // 之後實作

},
giveMaterial(
    materialId,
    amount
) {

    // 之後實作

}

};