//==========================================
// KO-PE Idle Demo
// Version 0.4.3
//
// 已完成：
// ✔ 玩家系統
// ✔ 地區系統
// ✔ UI 更新
// ✔ 探索按鈕
// ✔ 探索狀態
// ✔ 倒數計時
// ✔ 事件系統
// ✔ uiux設計
// ✔ 存檔系統
// ✔ 新素材與掉落表
// ✔ 角色立繪切換
// ✔ KO-PE 台詞系統
// ✔ 黑市商店系統
// 下一步：
// □ 基地升級
// □ 離線收益
// □ 圖鑑與成就
// □ 事件鏈與主線故事
// □ 音效、動畫與最終視覺優化
// □ 待增加
//========================
// 開發模式
//========================
const DEBUG = false;
// null = 使用正常機率
const DEBUG_EVENT_CHANCE = null;

//========================
// 遊戲公告
//========================

const gameInfoData = {

    announcement: {

        title: "系統公告",

        content: `
            <h3>KO-PE Idle Demo</h3>

            <p>
                歡迎遊玩 KO-PE Idle！
            </p>

            <p>
                目前版本仍在開發與測試階段，
                部分功能與數值可能持續調整。<br>
				回饋表單:https://reurl.cc/NOZoOn
			<P>

            <h3>目前版本</h3>

            <p>
                Version 0.4.3
            </p>
        `

    },

    credits: {

        title: "製作名單",

        content: `
            <h3>遊戲製作</h3>

            <p>
                企劃、程式、UI介面：
                sumime
            </p>

            <h3>原作</h3>
			<p>卿卿我我 科佩
			<p>
            <p>
                原作者：
                路人A
            </p>

            <p>
                本作已取得原作者授權製作。<br>
				場景及部分物件使用ai生成。
            </p>
        `

    },

    thanks: {

        title: "感謝名單",

        content: `
            <h3>特別感謝</h3>

            <p>
                原作者的授權與協助
            </p>

            <p>
                參與測試與提供意見的朋友
            </p>

            <p>
                所有遊玩 KO-PE Idle 的玩家
            </p>
        `

    }

};


function getSpecialShopItem(
    itemId
) {

    return specialShopItems.find(
        function (item) {

            return item.id ===
                itemId;

        }
    ) || null;

}
function purchaseSpecialShopItem(
    itemId
) {

    const item =
        getSpecialShopItem(
            itemId
        );

    if (!item) {

        console.warn(
            "找不到特殊商品：" +
            itemId
        );

        return false;

    }

    if (
        hasPurchasedSpecialItem(
            itemId
        )
    ) {

        addLog(
            "「" +
            item.name +
            "」已經購買。"
        );

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .stellarEnergyModule
                .alreadyPurchased
        );

        return false;

    }

    if (
        player.money <
        item.price
    ) {

        const missingMoney =
            item.price -
            player.money;

        addLog(
            "無法購買「" +
            item.name +
            "」，尚缺少 " +
            missingMoney.toLocaleString(
                "zh-TW"
            ) +
            " 黑金晶片。"
        );

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .stellarEnergyModule
                .notEnoughMoney
        );

        return false;

    }

    player.money -=
        item.price;

    player.specialPurchases[
        itemId
    ] = true;

    addLog(
        "已在黑市買下「" +
        item.name +
        "」。"
    );

    showRandomCharacterLine(
        characterDialogue
            .blackMarket
            .stellarEnergyModule
            .purchaseSuccess
    );

    saveGame();
    updateUI();

    return true;

}

function hasPurchasedSpecialItem(
    itemId
) {

    return (
        player.specialPurchases[
            itemId
        ] === true
    );

}
// 取得指定裝備資料
function getEquipment(
    equipmentId
) {

    return equipmentData.find(
        function (equipment) {

            return (
                equipment.id ===
                equipmentId
            );

        }
    );

}


// 取得玩家目前的裝備等級
function getEquipmentLevel(
    equipmentId
) {

    const level =
        player.equipmentLevels[
            equipmentId
        ];

    if (
        typeof level !== "number" ||
        !Number.isFinite(level)
    ) {

        return 1;

    }

    return level;

}


// 取得裝備目前等級的資料
function getCurrentEquipmentLevelData(
    equipmentId
) {

    const equipment =
        getEquipment(
            equipmentId
        );

    if (!equipment) {
        return null;
    }

    const currentLevel =
        getEquipmentLevel(
            equipmentId
        );

    return equipment.levels.find(
        function (levelData) {

            return (
                levelData.level ===
                currentLevel
            );

        }
    ) || null;

}


// 取得下一級裝備資料
function getNextEquipmentLevelData(
    equipmentId
) {

    const equipment =
        getEquipment(
            equipmentId
        );

    if (!equipment) {
        return null;
    }

    const currentLevel =
        getEquipmentLevel(
            equipmentId
        );

    return equipment.levels.find(
        function (levelData) {

            return (
                levelData.level ===
                currentLevel + 1
            );

        }
    ) || null;

}

// 購買下一級裝備改造
function upgradeEquipment(
    equipmentId
) {

    const equipment =
        getEquipment(
            equipmentId
        );

    if (!equipment) {

        console.warn(
            "找不到裝備：" +
            equipmentId
        );

        return false;

    }

    const nextLevelData =
        getNextEquipmentLevelData(
            equipmentId
        );

    if (!nextLevelData) {

        addLog(
            "「" +
            equipment.name +
            "」已達目前最高等級。"
        );

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .maxLevel
        );

        return false;

    }

    if (
        player.money <
        nextLevelData.price
    ) {

        addLog(
            "黑金晶片不足，無法改造「" +
            equipment.name +
            "」。"
        );

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .notEnoughMoney
        );

        return false;

    }

    player.money -=
        nextLevelData.price;

    player.equipmentLevels[
        equipmentId
    ] =
        nextLevelData.level;

    addLog(
        "裝備改造完成：「" +
        nextLevelData.name +
        "」。"
    );

    showRandomCharacterLine(
        characterDialogue
            .blackMarket
            .upgradeSuccess
    );

    saveGame();
    updateUI();

    return true;

}


function closeBlackMarket() {

    if (!blackMarketModal) {
        return;
    }

    blackMarketModal.hidden =
        true;

}
// 取得可出售的素材資料
function getSellableMaterials() {

    return materialData.filter(
        function (material) {

            return (
    typeof material.sellPrice === "number" &&
    material.sellPrice > 0
);

        }
    );

}


// 出售指定數量的素材
function sellMaterial(
    materialId,
    requestedAmount
) {

    const material =
        materialData.find(
            function (item) {

                return item.id ===
                    materialId;

            }
        );

    if (!material) {

        console.warn(
            "找不到要出售的素材：" +
            materialId
        );

        return false;

    }

    // 劇情道具不能出售
    if (
        material.category ===
        "keyItem" ||
        typeof material.sellPrice !==
            "number"
    ) {

        addLog(
            "「" +
            material.name +
            "」無法在黑市出售。"
        );

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .keyItem
        );

        return false;

    }

    const ownedAmount =
        player.materials[
            materialId
        ] || 0;

    const amount =
        Math.floor(
            Number(requestedAmount)
        );

    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        return false;

    }

    if (ownedAmount < amount) {

        addLog(
            "持有的「" +
            material.name +
            "」數量不足。"
        );

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .noMaterial
        );

        return false;

    }

    const earnedMoney =
        material.sellPrice *
        amount;

    player.materials[
        materialId
    ] -= amount;

    player.money +=
        earnedMoney;

    addLog(
        "在黑市出售「" +
        material.name +
        "」×" +
        amount +
        "，獲得黑金晶片 " +
        earnedMoney +
        "。"
    );

    showRandomCharacterLine(
        characterDialogue
            .blackMarket
            .sellSuccess
    );

    saveGame();
    updateUI();

    return true;

}
// 全部出售
function sellAllMaterial(
    materialId
) {

    const ownedAmount =
        player.materials[
            materialId
        ] || 0;

    if (ownedAmount <= 0) {

        showRandomCharacterLine(
            characterDialogue
                .blackMarket
                .noMaterial
        );

        return false;

    }

    return sellMaterial(
        materialId,
        ownedAmount
    );

}


// 地區功能
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
// 地區解鎖判定
function isAreaUnlocked(area) {

    const levelUnlocked =
        player.level >=
        area.levelRequired;

    if (!levelUnlocked) {
        return false;
    }

    // 沒有要求關鍵物時，只檢查等級
    if (!area.requiredItem) {
        return true;
    }

    return (
        player.materials[
            area.requiredItem
        ] || 0
    ) > 0;

}
function isAreaDiscovered(area) {

    if (!area.hiddenUntilDiscovered) {
        return true;
    }

    return player.discoveredAreas.includes(
        area.id
    );

}
function discoverArea(areaId) {

    const area =
        areas.find(function (area) {

            return area.id === areaId;

        });

    if (!area) {
        return false;
    }

    if (
        player.discoveredAreas.includes(
            areaId
        )
    ) {

        return false;

    }

    player.discoveredAreas.push(
        areaId
    );

    addLog(
        "地圖邊緣出現了一個新的未知訊號……"
    );

    saveGame();

    return true;

}

// 切換玩家下一輪探索的地區
function changeArea(areaId) {

    const selectedArea =
        areas.find(function (area) {

            return area.id === areaId;

        });

    if (!selectedArea) {
        return;
    }

    if (!isAreaUnlocked(selectedArea)) {

    if (selectedArea.secretUnlock) {

        addLog(
            "這裡似乎隱藏著某個尚未發現的地點。"
        );

    } else {

        let requirementText =
            "需要 Lv." +
            selectedArea.levelRequired;

        if (selectedArea.requiredItem) {

            requirementText +=
                "，並持有「" +
                getMaterialName(
                    selectedArea.requiredItem
                ) +
                "」";

        }

        addLog(
            "尚未解鎖「" +
            selectedArea.name +
            "」。" +
            requirementText +
            "。"
        );

    }

    updateUI();

    return;
}

    player.currentArea =
        selectedArea.id;
	saveGame();
    addLog(
        "下一輪將前往「" +
        selectedArea.name +
        "」。"
    );

    updateUI();

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


// 將素材獎勵加入玩家背包
function giveMaterialRewards(rewards) {

    Object.entries(rewards).forEach(
        function ([materialId, amount]) {

            if (
                typeof amount !== "number" ||
                amount <= 0
            ) {
                return;
            }

            if (
                typeof player.materials[
                    materialId
                ] !== "number"
            ) {

                player.materials[
                    materialId
                ] = 0;

            }

            player.materials[
                materialId
            ] += amount;

        }
    );

}
//========================
// 通用事件獎勵系統
//========================

function giveEventRewards(rewards) {

    const obtainedRewards = [];

    if (!Array.isArray(rewards)) {
        return obtainedRewards;
    }

    rewards.forEach(function (reward) {

        if (!reward) {
		return;
}

        // 沒寫 chance 時，預設為 100%
        const chance =
            typeof reward.chance === "number"
                ? reward.chance
                : 1;

        // 判定這項獎勵是否掉落
        if (Math.random() >= chance) {
            return;
        }
	if (reward.money) {

    let amount;

    if (typeof reward.money === "number") {

        amount = reward.money;

    } else {

        amount = randomInteger(
            reward.money.min,
            reward.money.max
        );

    }

 player.money += amount;

addLog(
    "找到黑金晶片 ×" + amount
);

obtainedRewards.push({

    money: true,

    amount: amount

});

return;
}
        const currentAmount =
            player.materials[
                reward.material
            ] || 0;

        // 已經達到最大持有量
        if (
            typeof reward.maxOwned === "number" &&
            currentAmount >= reward.maxOwned
        ) {
            return;
        }

        let amount = 1;

        // 固定數量
        if (
            typeof reward.amount === "number"
        ) {

            amount = reward.amount;

        // 隨機數量
        } else if (
            typeof reward.min === "number" &&
            typeof reward.max === "number"
        ) {

            amount = randomInteger(
                reward.min,
                reward.max
            );

        }

        // 避免取得後超過最大持有量
        if (
            typeof reward.maxOwned === "number"
        ) {

            amount = Math.min(
                amount,
                reward.maxOwned -
                    currentAmount
            );

        }

        if (amount <= 0) {
            return;
        }

        giveMaterialRewards({
            [reward.material]: amount
        });

        // 取得地下設施秘鑰時，
        // 記錄第五區已經被發現
        if (
            reward.material ===
            "undergroundKey"
        ) {

            discoverArea(5);

        }

        obtainedRewards.push({

            material:
                reward.material,

            amount:
                amount,

            log:
                reward.log || ""

        });

    });

    return obtainedRewards;

}
//========================
// 特殊事件系統
//========================

// 嘗試觸發目前地區的特殊事件
function tryTriggerEvent(area) {

    const availableEvents =
        events.filter(function (event) {

            return event.areaIds.includes(
                area.id
            );

        });

    if (availableEvents.length === 0) {
        return false;
    }

    let eventChance =
        area.eventChance;

    if (
        DEBUG &&
        DEBUG_EVENT_CHANCE !== null
    ) {

        eventChance =
            DEBUG_EVENT_CHANCE;

    }

    const randomNumber =
        Math.random();

    if (randomNumber >= eventChance) {
        return false;
    }

    const randomIndex =
        Math.floor(
            Math.random() *
            availableEvents.length
        );

    player.activeEvent =
    availableEvents[randomIndex];

setCharacterState(
    "event"
);

showRandomCharacterLine(
    characterDialogue.event
);

addLog(
    "特殊事件發生：「" +
    player.activeEvent.title +
    "」"
);

    return true;

}
// 處理玩家選擇的事件選項
function resolveEvent(optionIndex) {

    if (!player.activeEvent) {
        return;
    }

    const selectedOption =
        player.activeEvent.options[
            optionIndex
        ];

    if (!selectedOption) {
        return;
    }

    const randomNumber =
        Math.random();

    let result;
    let resultPrefix;

    if (
    randomNumber <
    selectedOption.successChance
) {

    result =
        selectedOption.success;

    resultPrefix =
        "事件成功：";

    setCharacterState(
        "success"
    );

    showRandomCharacterLine(
        characterDialogue.success
    );

} else {

    result =
        selectedOption.failure;

    resultPrefix =
        "事件失敗：";

    setCharacterState(
        "failure"
    );

    showRandomCharacterLine(
        characterDialogue.failure
    );

}

if (result.log) {

    addLog(
        resultPrefix +
        result.log
    );

}


// 處理這個結果中的全部獎勵
const obtainedRewards =
    giveEventRewards(
        result.rewards
    );

    // 顯示實際取得的物品
    if (obtainedRewards.length > 0) {

        const rewardTexts =
    obtainedRewards.map(
        function (reward) {

            if (reward.money) {

    return formatRewardText(
        "黑金晶片",
        reward.amount
    );

}

	return formatRewardText(
		getMaterialName(
        reward.material
    ),
    reward.amount
);

        }
    );

        addLog(
            "事件獲得：" +
            rewardTexts.join("、")
        );

        // 顯示個別稀有獎勵訊息
        obtainedRewards.forEach(
            function (reward) {

                if (reward.log) {
                    addLog(reward.log);
                }

            }
        );

    } else {

        addLog(
            "這次沒有取得額外物品。"
        );

    }

    player.activeEvent = null;

    saveGame();
    updateUI();

    setTimeout(
        function () {

            startExploration();

        },
        2000
    );

}


//========================
// 遊戲資訊彈窗
//========================

function openInfoModal(pageId) {

    const modal =
        document.getElementById(
            "info-modal"
        );

    const modalTitle =
        document.getElementById(
            "info-modal-title"
        );

    const modalContent =
        document.getElementById(
            "info-modal-content"
        );

    const page =
        gameInfoData[pageId];

    if (
        !modal ||
        !modalTitle ||
        !modalContent ||
        !page
    ) {

        console.error(
            "無法開啟遊戲資訊彈窗。"
        );

        return;

    }

    modalTitle.textContent =
        page.title;

    modalContent.innerHTML =
        page.content;

    modal.hidden = false;

}
// 關閉彈窗
function closeInfoModal() {

    const modal =
        document.getElementById(
            "info-modal"
        );

    if (!modal) {
        return;
    }

    modal.hidden = true;

}
//========================
// KO-PE 台詞系統
//========================

let lastCharacterLine = "";

let explorationDialogueCounter = 0;

let nextExplorationDialogueCount =
    randomInteger(3, 10);
	// 探索台詞觸發時，使用地區專屬台詞的機率
const SPECIAL_EXPLORATION_DIALOGUE_CHANCE =
    0.3;
// 從指定台詞陣列隨機選出一句
function getRandomDialogue(lines) {

    if (
        !Array.isArray(lines) ||
        lines.length === 0
    ) {

        return "";

    }

    // 只有一句時直接使用
    if (lines.length === 1) {

        return lines[0];

    }

    let selectedLine = "";

    // 避免連續抽中同一句
    do {

        const randomIndex =
            Math.floor(
                Math.random() *
                lines.length
            );

        selectedLine =
            lines[randomIndex];

    } while (
        selectedLine ===
        lastCharacterLine
    );

    lastCharacterLine =
        selectedLine;

    return selectedLine;

}
// 將指定文字顯示到角色台詞區
function setCharacterLine(line) {

    const characterLineElement =
        document.getElementById(
            "character-line"
        );

    if (!characterLineElement) {

        console.error(
            '找不到 id="character-line" 的 HTML 元素。'
        );

        return;

    }

    if (
        typeof line !== "string" ||
        line.length === 0
    ) {

        return;

    }

    characterLineElement.textContent =
        line;

}
// 從指定分類中抽取並顯示一句台詞
function showRandomCharacterLine(lines) {

    const selectedLine =
        getRandomDialogue(lines);

    if (!selectedLine) {
        return;
    }

    setCharacterLine(
        selectedLine
    );

}


// 顯示常規或指定地區的專屬探索台詞
function showExplorationDialogue(area) {

    if (!area) {

        console.warn(
            "沒有提供探索台詞所需的地區資料。"
        );

        return;

    }

    const specialLines =
        characterDialogue
            .specialExploration[
                area.id
            ];

    const hasSpecialLines =
        Array.isArray(specialLines) &&
        specialLines.length > 0;

    const useSpecialDialogue =
        hasSpecialLines &&
        Math.random() <
            SPECIAL_EXPLORATION_DIALOGUE_CHANCE;

    if (useSpecialDialogue) {

        showRandomCharacterLine(
            specialLines
        );

        return;

    }

    showRandomCharacterLine(
        characterDialogue.exploration
    );

}
//========================
// 角色狀態切換
//========================

function setCharacterState(state) {

    if (!characterImages[state]) {

        console.warn(
            "找不到角色狀態：" +
            state
        );

        return;

    }

    player.characterState =
        state;

    updateCharacterUI();

}
//========================
// 畫面更新
//========================
function updateUI() {

    updatePlayerUI();

    updateAreaUI();

    updateMaterialUI();

    updateLogUI();

    updateExploreButtonUI();

    updateAreaSelectionUI();
	
	updateEventUI();
	
	updateCharacterUI();
	
	updateBlackMarketUI();
	
	updateEquipmentUpgradeUI();
	
	updateSpecialShopUI();
	
	updateBlackMarketMoneyUI();
}


function updatePlayerUI() {

    const levelElement =
        document.getElementById("level");

    const expElement =
        document.getElementById("exp");

    const moneyElement =
        document.getElementById("money");

    const expProgressElement =
        document.getElementById("exp-progress");


    levelElement.textContent =
        "等級：" + player.level;

    expElement.textContent =
        "EXP：" +
        player.exp +
        " / " +
        player.expToNextLevel;

    moneyElement.textContent =
    "黑金晶片：" + player.money;

if (expProgressElement) {

    const expPercentage =
        player.exp /
        player.expToNextLevel *
        100;

    expProgressElement.style.width =
        expPercentage + "%";

}
}


function updateAreaUI() {

    const currentArea =
        getCurrentArea();

    const areaNameElement =
        document.getElementById("area-name");

    const countdownElement =
        document.getElementById("countdown");

    const areaImageElement =
        document.getElementById("area-image");

    const explorationProgressElement =
        document.getElementById(
            "exploration-progress"
        );

    areaNameElement.textContent =
        currentArea.name;

    countdownElement.textContent =
        "剩餘時間：" +
        player.remainingTime +
        " 秒";

    if (areaImageElement) {

        areaImageElement.src =
            currentArea.image;

        areaImageElement.alt =
            currentArea.name;

    }

    if (explorationProgressElement) {

        let progressPercentage = 0;

        if (player.isExploring) {

            const exploredArea =
                areas.find(function (area) {

                    return area.id ===
                        player.exploringAreaId;

                });

            if (exploredArea) {

                const elapsedTime =
                    exploredArea.duration -
                    player.remainingTime;

                progressPercentage =
                    elapsedTime /
                    exploredArea.duration *
                    100;

            }

        }

        explorationProgressElement.style.width =
            progressPercentage + "%";

    }

}


function updateMaterialUI() {

    const materialsList =
        document.getElementById(
            "materials-list"
        );

    if (!materialsList) {

        console.error(
            '找不到 id="materials-list" 的 HTML 元素。'
        );

        return;

    }

    materialsList.innerHTML = "";

    materialData.forEach(
        function (material) {

            const materialRow =
                document.createElement("p");

            const amount =
                player.materials[
                    material.id
                ] || 0;

            materialRow.textContent =
                material.name +
                "：" +
                amount;

            materialsList.appendChild(
                materialRow
            );

        }
    );

}


function updateLogUI() {

    const logElement =
        document.getElementById("log");

    logElement.innerHTML =
        player.logs.join("<br>");

}


function updateExploreButtonUI() {

    if (!exploreToggleButton) {
        return;
    }

    exploreToggleButton.disabled =
        Boolean(player.activeEvent);

    if (player.isExploring) {

        exploreToggleButton.textContent =
            "⏸";

        exploreToggleButton.setAttribute(
            "aria-label",
            "停止探索"
        );

        exploreToggleButton.title =
            "停止探索";

    } else {

        exploreToggleButton.textContent =
            "▶";

        exploreToggleButton.setAttribute(
            "aria-label",
            "開始探索"
        );

        exploreToggleButton.title =
            "開始探索";

    }

}
	// 更新地區選擇按鈕
function updateAreaSelectionUI() {

    const areaListElement =
        document.getElementById("area-list");

    if (!areaListElement) {

        console.error(
            "找不到 id=\"area-list\" 的 HTML 元素。"
        );

        return;

    }

    areaListElement.innerHTML = "";

    areas.forEach(function (area) {

    if (!isAreaDiscovered(area)) {
        return;
    }

		const areaButton =
        document.createElement(
            "button"
        );

		const isUnlocked =
        isAreaUnlocked(area);

        const isSelected =
            player.currentArea === area.id;

        if (isUnlocked) {

    areaButton.textContent =
        area.name;

} else if (area.secretUnlock) {

    areaButton.textContent =
        "？？？";

} else {

    let unlockText =
        "Lv." +
        area.levelRequired;

    if (area.requiredItem) {

        unlockText +=
            "＋" +
            getMaterialName(
                area.requiredItem
            );

    }

    areaButton.textContent =
        area.name +
        "（需要 " +
        unlockText +
        "）";

}

        areaButton.disabled =
		isSelected;

        if (isSelected) {

            areaButton.textContent +=
                "【目前選擇】";

        }

        areaButton.addEventListener(
            "click",
            function () {

                changeArea(area.id);

            }
        );

        areaListElement.appendChild(
            areaButton
        );

    });
}
function updateEventUI() {

    const eventPanel =
        document.getElementById("event-panel");

    const eventTitle =
        document.getElementById("event-title");

    const eventDescription =
        document.getElementById("event-description");

    const eventOptions =
        document.getElementById("event-options");

    if (!eventPanel) {
        console.error(
            "找不到 id=\"event-panel\" 的 HTML 元素。"
        );

        return;
    }

    if (!player.activeEvent) {

        eventPanel.hidden = true;

        return;

    }

    eventPanel.hidden = false;

    eventTitle.textContent =
        player.activeEvent.title;

    eventDescription.textContent =
        player.activeEvent.description;

    eventOptions.innerHTML = "";

    player.activeEvent.options.forEach(
        function (option, optionIndex) {

            const optionButton =
                document.createElement("button");

            optionButton.textContent =
                option.text +
                "（成功率 " +
                option.successChance * 100 +
                "%）";

            optionButton.addEventListener(
                "click",
                function () {

                    resolveEvent(optionIndex);

                }
            );

            eventOptions.appendChild(
                optionButton
            );

        }
    );
}
	function updateBlackMarketUI() {

    const marketList =
        document.getElementById(
            "black-market-list"
        );

    if (!marketList) {
        return;
    }

    marketList.innerHTML = "";

    const sellableMaterials =
        getSellableMaterials();

    sellableMaterials.forEach(
        function (material) {

            const ownedAmount =
                player.materials[
                    material.id
                ] || 0;

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "black-market-row";

            const information =
                document.createElement(
                    "p"
                );

            information.textContent =
                material.name +
                "｜持有：" +
                ownedAmount +
                "｜單價：" +
                material.sellPrice +
                " 黑金晶片";

            const sellOneButton =
                document.createElement(
                    "button"
                );

            sellOneButton.textContent =
                "出售 1 個";

            sellOneButton.disabled =
                ownedAmount <= 0;

            sellOneButton.addEventListener(
                "click",
                function () {

                    sellMaterial(
                        material.id,
                        1
                    );

                }
            );

            const sellAllButton =
                document.createElement(
                    "button"
                );

            sellAllButton.textContent =
                "全部出售";

            sellAllButton.disabled =
                ownedAmount <= 0;

            sellAllButton.addEventListener(
                "click",
                function () {

                    sellAllMaterial(
                        material.id
                    );

                }
            );

            row.appendChild(
                information
            );

            row.appendChild(
                sellOneButton
            );

            row.appendChild(
                sellAllButton
            );

            marketList.appendChild(
                row
            );

        }
    );
	}
	function updateEquipmentUpgradeUI() {

    const equipmentList =
        document.getElementById(
            "equipment-upgrade-list"
        );

    if (!equipmentList) {
        return;
    }

    equipmentList.innerHTML = "";

    equipmentData.forEach(
        function (equipment) {

            const currentLevel =
                getEquipmentLevel(
                    equipment.id
                );

            const currentLevelData =
                getCurrentEquipmentLevelData(
                    equipment.id
                );

            const nextLevelData =
                getNextEquipmentLevelData(
                    equipment.id
                );

            if (!currentLevelData) {
                return;
            }

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "equipment-upgrade-row";

            const title =
                document.createElement(
                    "h4"
                );

            title.textContent =
                equipment.name +
                " Lv." +
                currentLevel;

            const currentName =
                document.createElement(
                    "p"
                );

            currentName.textContent =
                "目前裝備：" +
                currentLevelData.name;

            const currentEffect =
                document.createElement(
                    "p"
                );

            currentEffect.textContent =
                currentLevelData
                    .effectDescription;

            row.appendChild(
                title
            );

            row.appendChild(
                currentName
            );

            row.appendChild(
                currentEffect
            );

            const upgradeButton =
                document.createElement(
                    "button"
                );

            if (!nextLevelData) {

                upgradeButton.textContent =
                    "已達最高等級";

                upgradeButton.disabled =
                    true;

            } else {

                const nextInformation =
                    document.createElement(
                        "p"
                    );

                nextInformation.textContent =
                    "下一階段：" +
                    nextLevelData.name +
                    "｜" +
                    nextLevelData
                        .effectDescription;

                row.appendChild(
                    nextInformation
                );

                upgradeButton.textContent =
                    "改造｜" +
                    nextLevelData.price +
                    " 黑金晶片";

                upgradeButton.disabled =
                    player.money <
                    nextLevelData.price;

                upgradeButton.addEventListener(
                    "click",
                    function () {

                        upgradeEquipment(
                            equipment.id
                        );

                    }
                );

            }

            row.appendChild(
                upgradeButton
            );

            equipmentList.appendChild(
                row
            );

        }
    );
}
function updateBlackMarketMoneyUI() {

    const moneyElement =
        document.getElementById(
            "black-market-money"
        );

    if (!moneyElement) {
        return;
    }

    moneyElement.textContent =
        player.money;

}
function updateSpecialShopUI() {

    const specialShopList =
        document.getElementById(
            "special-shop-list"
        );

    if (!specialShopList) {
        return;
    }

    specialShopList.innerHTML = "";

    specialShopItems.forEach(
        function (item) {

            const purchased =
                hasPurchasedSpecialItem(
                    item.id
                );

            const missingMoney =
                Math.max(
                    0,
                    item.price -
                    player.money
                );

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "special-shop-item";

            const title =
                document.createElement(
                    "h4"
                );

            title.textContent =
                item.name;

            const description =
                document.createElement(
                    "p"
                );

            description.textContent =
                item.description;

            const purpose =
                document.createElement(
                    "p"
                );

            purpose.className =
                "special-shop-purpose";

            purpose.textContent =
                item.purpose;

            const price =
                document.createElement(
                    "p"
                );

            price.className =
                "special-shop-price";

            price.textContent =
                "價格：" +
                item.price.toLocaleString(
                    "zh-TW"
                ) +
                " 黑金晶片";

            const status =
                document.createElement(
                    "p"
                );

            status.className =
                "special-shop-status";

            if (purchased) {

                status.textContent =
                    "狀態：已購入";

            } else if (
                missingMoney > 0
            ) {

                status.textContent =
                    "距離目標尚差：" +
                    missingMoney.toLocaleString(
                        "zh-TW"
                    ) +
                    " 黑金晶片";

            } else {

                status.textContent =
                    "已具備購買所需資金。";

            }

            const buttonGroup =
                document.createElement(
                    "div"
                );

            buttonGroup.className =
                "special-shop-actions";

            const inspectButton =
                document.createElement(
                    "button"
                );

            inspectButton.type =
                "button";

            inspectButton.textContent =
                "查看";

            inspectButton.addEventListener(
                "click",
                function () {

                    inspectSpecialShopItem(
                        item.id
                    );

                }
            );

            const purchaseButton =
                document.createElement(
                    "button"
                );

            purchaseButton.type =
                "button";

            if (purchased) {

                purchaseButton.textContent =
                    "已購入";

                purchaseButton.disabled =
                    true;

            } else {

                purchaseButton.textContent =
                    "購買";

                /*
                 * 這裡刻意不因金額不足而停用。
                 * 玩家仍可按下，並聽見科佩的專屬台詞。
                 */
                purchaseButton.disabled =
                    false;

                purchaseButton.addEventListener(
                    "click",
                    function () {

                        purchaseSpecialShopItem(
                            item.id
                        );

                    }
                );

            }

            buttonGroup.appendChild(
                inspectButton
            );

            buttonGroup.appendChild(
                purchaseButton
            );

            card.appendChild(
                title
            );

            card.appendChild(
                description
            );

            card.appendChild(
                purpose
            );

            card.appendChild(
                price
            );

            card.appendChild(
                status
            );

            card.appendChild(
                buttonGroup
            );

            specialShopList.appendChild(
                card
            );

        }
    );

}
function openBlackMarket() {

    if (!blackMarketModal) {
        return;
    }

    blackMarketModal.hidden =
        false;

    showRandomCharacterLine(
        characterDialogue
            .blackMarket
            .open
    );

    updateBlackMarketUI();

    updateEquipmentUpgradeUI();

    updateSpecialShopUI();

    updateBlackMarketMoneyUI();

}
//========================
// 立繪切換
//========================
function updateCharacterUI() {

    const characterImageElement =
        document.getElementById(
            "character-image"
        );

    if (!characterImageElement) {
        return;
    }

    const imagePath =
        characterImages[
            player.characterState
        ];

    if (!imagePath) {
        return;
    }

    characterImageElement.src =
        imagePath;

    characterImageElement.alt =
        "KO-PE：" +
        player.characterState;

}
	
//========================
// 專門保存計時器的變數
//========================
let explorationTimer = null;
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

            updateUI();

            if (player.remainingTime <= 0) {

                clearInterval(explorationTimer);

                explorationTimer = null;

                finishExploration();

            }

        }, 1000);

}
//========================
// 經驗條
//========================

//========================
// 日誌系統
//========================

function addLog(message) {

    player.logs.unshift(message);

    if (player.logs.length > 20) {
        player.logs.pop();
    }

    updateLogUI();
}
//========================
// 探索完成與獎勵
//========================
function finishExploration() {
	player.isExploring = false;
    const exploredArea =
        areas.find(function (area) {

            return area.id ===
                player.exploringAreaId;

        });

    // 先取得地區原本的經驗獎勵
    let expReward =
        exploredArea.expReward;

    // 開發模式開啟時，改用測試經驗值
    if (DEBUG) {

        expReward = 100;

    }

    player.exp =
        player.exp + expReward;

    const obtainedMaterials =
    rollAreaDrops(exploredArea);

giveMaterialRewards(
    obtainedMaterials
);

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

addLog(
    "在「" +
    exploredArea.name +
    "」完成探索：" +
    rewardTexts.join("、")
);
	updateExplorationDialogue(
    exploredArea
);
    checkLevelUp();
	saveGame();
const eventTriggered =
    tryTriggerEvent(exploredArea);

updateUI();

if (eventTriggered) {
    return;
}

startExploration();

}

const announcementButton =
    document.getElementById(
        "announcement-btn"
    );

const creditsButton =
    document.getElementById(
        "credits-btn"
    );

const infoModal =
    document.getElementById(
        "info-modal"
    );

const infoModalCloseButton =
    document.getElementById(
        "info-modal-close"
    );

const infoTabButtons =
    document.querySelectorAll(
        "[data-info-page]"
    );
	if (announcementButton) {

    announcementButton.addEventListener(
        "click",
        function () {

            openInfoModal(
                "announcement"
            );

        }
    );

}
if (creditsButton) {

    creditsButton.addEventListener(
        "click",
        function () {

            openInfoModal(
                "credits"
            );

        }
    );

}
if (infoModalCloseButton) {

    infoModalCloseButton.addEventListener(
        "click",
        closeInfoModal
    );

}
infoTabButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const pageId =
                    button.dataset.infoPage;

                openInfoModal(
                    pageId
                );

            }
        );

    }
);
if (infoModal) {

    infoModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                infoModal
            ) {

                closeInfoModal();

            }

        }
    );

}
document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeInfoModal();
			closeBlackMarket();
			closeDeveloperTools();
			closeSaveManager();
        }

    }
);
function toggleExploration() {

    if (player.isExploring) {

        stopExploration();

    } else {

        startExploration();

    }

}
//========================
// 遊戲開始
//========================

const exploreToggleButton =
    document.getElementById(
        "explore-toggle-btn"
    );

const blackMarketOpenButton =
    document.getElementById(
        "black-market-open-btn"
    );

const blackMarketCloseButton =
    document.getElementById(
        "black-market-close-btn"
    );

const blackMarketModal =
    document.getElementById(
        "black-market-modal"
    );
	if (blackMarketOpenButton) {

    blackMarketOpenButton.addEventListener(
        "click",
        openBlackMarket
    );

}
//========================
// Save Manager
//========================
const saveManagerButton =
    document.getElementById(
        "save-manager-btn"
    );

const saveManagerModal =
    document.getElementById(
        "save-manager-modal"
    );

const saveManagerCloseButton =
    document.getElementById(
        "save-manager-close-btn"
    );
//========================
// Developer Tools
//========================
const developerButton =
    document.getElementById(
        "developer-btn"
    );

const developerModal =
    document.getElementById(
        "developer-modal"
    );

const developerCloseButton =
    document.getElementById(
        "developer-close-btn"
    );
	function openDeveloperTools() {
	if (!developerModal) {
        return;
    }
    developerModal.hidden = false;

}
function openSaveManager() {

    if (!saveManagerModal) {
        return;
    }

    saveManagerModal.hidden = false;

}

function closeSaveManager() {

    if (!saveManagerModal) {
        return;
    }

    saveManagerModal.hidden = true;

}
//========================
// Save Manager Events
//========================
if (saveManagerButton) {

    saveManagerButton.addEventListener(
        "click",
        openSaveManager
    );

}
if (saveManagerCloseButton) {

    saveManagerCloseButton.addEventListener(
        "click",
        closeSaveManager
    );

}
const debugSaveButton =
    document.getElementById(
        "debug-save-btn"
    );
const exportSaveButton =
    document.getElementById(
        "export-save-btn"
    );

const importSaveButton =
    document.getElementById(
        "import-save-btn"
    );

const importSaveInput =
    document.getElementById(
        "import-save-input"
    );
if (exportSaveButton) {

    exportSaveButton.addEventListener(
        "click",
        exportSave
    );

}
if (importSaveButton) {

    importSaveButton.addEventListener(
        "click",
        function () {

            importSaveInput.click();

        }
    );

}
if (importSaveInput) {

    importSaveInput.addEventListener(
        "change",
        function () {

            const file =
                importSaveInput.files[0];

            importSave(file);

        }
    );

}
//========================
// Developer Events
//========================
if (debugSaveButton) {

    debugSaveButton.addEventListener(
        "click",
        function () {

            debug.loadDebugSave();

            closeDeveloperTools();

        }
    );

}

function closeDeveloperTools() {

    if (!developerModal) {
        return;
    }
    developerModal.hidden = true;

}
if (DEBUG) {

    developerButton.hidden = false;

    developerButton.addEventListener(
        "click",
        openDeveloperTools
    );

}

if (developerCloseButton) {

    developerCloseButton.addEventListener(
        "click",
        closeDeveloperTools
    );

}

if (blackMarketCloseButton) {

    blackMarketCloseButton.addEventListener(
        "click",
        closeBlackMarket
    );

}
if (blackMarketModal) {

    blackMarketModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                blackMarketModal
            ) {

                closeBlackMarket();

            }

        }
    );

}
if (exploreToggleButton) {

    exploreToggleButton.addEventListener(
        "click",
        toggleExploration
    );

}

window.addEventListener(
    "beforeunload",
    function () {

        saveGame();

    }
);
initializePlayerMaterials();

loadGame();

// 為舊存檔補上新增素材
initializePlayerMaterials();

setCharacterState(
    "idle"
);

updateUI();

showRandomCharacterLine(
    characterDialogue.greeting
);
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