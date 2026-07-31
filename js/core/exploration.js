//========================
// 專門保存計時器的變數
//========================
let explorationTimer = null;
//========================
// 地區描述系統
//========================
let areaDescriptionCounter = 0;

let nextAreaDescriptionCount =
    randomInteger(3, 5);
//========================
// 各地區最後一次顯示的描述
//========================
const lastAreaDescriptions = {};
//========================
// 探索系統
//========================
function stopExploration() {

    if (!player.isExploring) {
        return;
    }

    clearInterval(
        explorationTimer
    );

    explorationTimer = null;

    player.isExploring = false;

    player.remainingTime = 0;

    player.exploringAreaId = null;

    setCharacterState(
        "idle"
    );

    addLog(
        "探索已停止。"
    );

    updateUI();

}
// 尋找玩家目前所在的地區
function getCurrentArea() {
    return areas.find(function (area) {
        return area.id === player.currentArea;
    });
}

// 地區產生包含最小值與最大值的隨機整數
function randomInteger(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

// 計算一次探索獲得的隨機素材
function rollAreaDrops(area) {

    const obtainedMaterials = {};

    const playerEffects =
        getPlayerEffects();

    area.drops.forEach(
        function (drop) {

        const randomNumber =
            Math.random();

        if (randomNumber < drop.chance) {

            const amount =
                randomInteger(
                    drop.min,
                    drop.max
                );

            // 第一次取得這種素材時，先建立為 0
            if (
                typeof obtainedMaterials[
                    drop.material
                ] !== "number"
            ) {

                obtainedMaterials[
                    drop.material
                ] = 0;

            }

            obtainedMaterials[
    drop.material
] += amount;


// 一般素材裝備加成
const material =
    materialData.find(
        function (item) {

            return (
                item.id ===
                drop.material
            );

        }
    );

const isCommonMaterial =
    material &&
    material.category ===
        "common";

if (
    isCommonMaterial &&
    Math.random() <
        playerEffects
            .commonMaterialBonusChance
) {

    obtainedMaterials[
        drop.material
    ] += 1;

}

        }

    });

    // 如果這輪完全沒有掉落，
    // 至少給予掉落表中的第一種素材
    if (
        Object.keys(
            obtainedMaterials
        ).length === 0 &&
        area.drops.length > 0
    ) {

        const guaranteedDrop =
            area.drops[0];

        obtainedMaterials[
            guaranteedDrop.material
        ] = guaranteedDrop.min;

    }

    return obtainedMaterials;

}

//========================
// 探索系統
//========================
function startExploration() {

    if (
        player.isExploring ||
        player.activeEvent
    ) {

        return;

    }

    const currentArea = getCurrentArea();

    player.isExploring = true;
	setCharacterState(
    "exploring"
);
    player.exploringAreaId =
        currentArea.id;

    player.remainingTime =
        currentArea.duration;

    updateUI();

    explorationTimer =
        setInterval(function () {

            player.remainingTime =
                player.remainingTime - 1;

            updateExplorationTimerUI();

            if (player.remainingTime <= 0) {

                clearInterval(explorationTimer);

                explorationTimer = null;

                finishExploration();

            }

        }, 1000);

}

function toggleExploration() {

    if (player.isExploring) {

        stopExploration();

    } else {

        startExploration();

    }

}

//========================
// 探索完成與獎勵
//========================
function finishExploration() {

    player.isExploring = false;

    const exploredArea =
        areas.find(function (area) {

            return (
                area.id ===
                player.exploringAreaId
            );

        });

    //========================
    // 經驗值
    //========================

    let expReward =
        exploredArea.expReward;

    if (DEBUG) {

        expReward = 100;

    }

    player.exp += expReward;

    //========================
    // 素材掉落
    //========================

    const obtainedMaterials =
        rollAreaDrops(
            exploredArea
        );

    giveMaterialRewards(
        obtainedMaterials
    );

    //========================
    // 整理獎勵文字
    //========================

    const rewardTexts = [

        "EXP +" + expReward

    ];

    Object.entries(
        obtainedMaterials
    ).forEach(

        function ([materialId, amount]) {

            if (
                typeof amount !== "number" ||
                amount <= 0
            ) {
                return;
            }

            rewardTexts.push(

                formatRewardText(

                    getMaterialName(
                        materialId
                    ),

                    amount

                )

            );

        }

    );

    //========================
    // 顯示探索結果
    //========================

    addLog(

        "在「" +

        exploredArea.name +

        "」完成探索：" +

        rewardTexts.join("、")

    );

    //========================
    // 地區描述（3~5 次一次）
    //========================

    areaDescriptionCounter++;

    if (

        areaDescriptionCounter >=
        nextAreaDescriptionCount

    ) {

        showAreaDescription(
            exploredArea
        );

        areaDescriptionCounter = 0;

        nextAreaDescriptionCount =
            randomInteger(3, 5);

    }

    //========================
    // 常規探索台詞
    //========================

    updateExplorationDialogue(
        exploredArea
    );

    //========================
    // 升級
    //========================

    checkLevelUp();

    //========================
    // 存檔
    //========================

    saveGame();

    //========================
    // 特殊事件
    //========================

    const eventTriggered =

        tryTriggerEvent(
            exploredArea
        );

    updateUI();

    if (eventTriggered) {

        return;

    }

    //========================
    // 下一輪探索
    //========================

    startExploration();

}

// 完成探索時，檢查是否需要更換常規探索台詞
function updateExplorationDialogue(area) {

    explorationDialogueCounter += 1;

    if (
        explorationDialogueCounter <
        nextExplorationDialogueCount
    ) {

        return;

    }

    showExplorationDialogue(
        area
    );

    explorationDialogueCounter = 0;

    nextExplorationDialogueCount =
        randomInteger(3, 10);

}

function showAreaDescription(area) {

    const descriptions =
        areaDescriptions[
            area.id
        ];

    if (
        !descriptions ||
        descriptions.length === 0
    ) {

        return;

    }

    const lastDescription =
        lastAreaDescriptions[
            area.id
        ];

    let description;

    // 如果只有一句，就不用重抽
    if (descriptions.length === 1) {

        description =
            descriptions[0];

    } else {

        do {

            description =
                randomText(
                    descriptions
                );

        } while (
            description ===
            lastDescription
        );

    }

    // 記住這個地區最後一次顯示的描述
    lastAreaDescriptions[
        area.id
    ] = description;

    addLog("");

    addLog(
        description
    );

}