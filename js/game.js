//==========================================
// KO-PE Idle Demo
// Version 0.4.4
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
                Version 0.4.4
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
// 日誌系統
//========================

function addLog(message) {

    player.logs.unshift(message);

    if (player.logs.length > 20) {
        player.logs.pop();
    }

    updateLogUI();
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
rebuildAllEvents();
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
