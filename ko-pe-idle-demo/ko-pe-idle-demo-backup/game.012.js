//==========================================
// KO-PE Idle Demo
// Version 0.1.2
//
// 已完成：
// ✔ 玩家系統
// ✔ 地區系統
// ✔ UI 更新
// ✔ 探索按鈕
// ✔ 探索狀態
// ✔ 倒數計時
// 下一步：
// □ 事件系統
//========================
// 開發模式
//========================

const DEBUG = false;
const DEBUG_EXP = 100;
const DEBUG_TIME = 1;
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

    isExploring: false,

    remainingTime: 0,
	
	logs: [
    "歡迎來到 KO-PE Idle！"
],

    materials: {

        scrap: 0,

        wire: 0

    }

};
//========================
// 地區資料
//========================
const areas = [

    {
        id: 1,
        name: "外圍廢墟",
        levelRequired: 1,
        duration: 2,
        expReward: 10,

        rewards: {
            scrap: 3,
            wire: 1
        },

        eventChance: 0.03
    },

    {
        id: 2,
        name: "廢棄街區",
        levelRequired: 3,
        duration: 4,
        expReward: 20,

        rewards: {
            scrap: 5,
            wire: 2
        },

        eventChance: 0.05
    }

];
//========================
// 地區功能
//========================

// 尋找玩家目前所在的地區
function getCurrentArea() {
    return areas.find(function (area) {
        return area.id === player.currentArea;
    });
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

    if (
        player.level <
        selectedArea.levelRequired
    ) {

        addLog(
            "尚未達到「" +
            selectedArea.name +
            "」的需求等級。"
        );

        updateUI();

        return;
    }

    player.currentArea =
        selectedArea.id;

    addLog(
        "下一輪將前往「" +
        selectedArea.name +
        "」。"
    );

    updateUI();

}
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

        return area.levelRequired ===
            player.level;

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
// 畫面更新
//========================
function updateUI() {

    updatePlayerUI();

    updateAreaUI();

    updateMaterialUI();

    updateLogUI();

    updateExploreButtonUI();

    updateAreaSelectionUI();

}


function updatePlayerUI() {

    const levelElement =
        document.getElementById("level");

    const expElement =
        document.getElementById("exp");

    const moneyElement =
        document.getElementById("money");

    levelElement.textContent =
        "等級：" + player.level;

    expElement.textContent =
        "EXP：" +
        player.exp +
        " / " +
        player.expToNextLevel;

    moneyElement.textContent =
        "黑金晶片：" + player.money;

}


function updateAreaUI() {

    const currentArea = getCurrentArea();

    const areaNameElement =
        document.getElementById("area-name");

    const countdownElement =
        document.getElementById("countdown");

    areaNameElement.textContent =
        currentArea.name;

    countdownElement.textContent =
        "剩餘時間：" +
        player.remainingTime +
        " 秒";

}


function updateMaterialUI() {

    const scrapElement =
        document.getElementById("scrap");

    const wireElement =
        document.getElementById("wire");

    scrapElement.textContent =
        "廢鐵：" +
        player.materials.scrap;

    wireElement.textContent =
        "破損電線：" +
        player.materials.wire;

}


function updateLogUI() {

    const logElement =
        document.getElementById("log");

    logElement.innerHTML =
        player.logs.join("<br>");

}


function updateExploreButtonUI() {

    exploreButton.disabled =
        player.isExploring;

    if (player.isExploring) {

        exploreButton.textContent =
            "探索中……";

    } else {

        exploreButton.textContent =
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

        const areaButton =
            document.createElement("button");

        const isUnlocked =
            player.level >= area.levelRequired;

        const isSelected =
            player.currentArea === area.id;

        if (isUnlocked) {

            areaButton.textContent =
                area.name;

        } else {

            areaButton.textContent =
                area.name +
                "（Lv." +
                area.levelRequired +
                " 解鎖）";

        }

        areaButton.disabled =
            !isUnlocked || isSelected;

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
//========================
// 專門保存計時器的變數
//========================
let explorationTimer = null;
//========================
// 探索系統
//========================
function startExploration() {

    if (player.isExploring) {
        return;
    }

    const currentArea = getCurrentArea();

    player.isExploring = true;

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
// 日誌系統
//========================

function addLog(message) {

    player.logs.unshift(message);

    if (player.logs.length > 20) {
        player.logs.pop();
    }

}
//========================
// 探索完成與獎勵
//========================
function finishExploration() {

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

    player.materials.scrap =
        player.materials.scrap +
        exploredArea.rewards.scrap;

    player.materials.wire =
        player.materials.wire +
        exploredArea.rewards.wire;

    addLog(
        "在「" +
        exploredArea.name +
        "」完成探索：EXP +" +
        expReward +
        "、廢鐵 +" +
        exploredArea.rewards.scrap +
        "、破損電線 +" +
        exploredArea.rewards.wire
    );

    checkLevelUp();

    player.isExploring = false;

    updateUI();

    startExploration();

}
//========================
// 遊戲開始
//========================

const exploreButton =
    document.getElementById("explore-btn");

exploreButton.addEventListener(
    "click",
    startExploration
);

updateUI();