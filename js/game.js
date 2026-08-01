//==========================================
// KO-PE Idle Demo
// Version 0.4.5
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



//========================
// KO-PE 台詞系統
//========================
let lastCharacterLine = "";

let explorationDialogueCounter = 0;

let nextExplorationDialogueCount =
    randomInteger(3, 10);

	// 探索台詞觸發時，使用地區專屬台詞的機率
const SPECIAL_EXPLORATION_DIALOGUE_CHANCE =
    0.2;
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
        formatDialogue(line);

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
// 日誌系統
//========================

function addLog(message) {

    player.logs.unshift(message);

    if (player.logs.length > 20) {
        player.logs.pop();
    }

    updateLogUI();
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


	
window.addEventListener(
    "beforeunload",
    function () {

        saveGame();

    }
);

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeGame();

    }
);