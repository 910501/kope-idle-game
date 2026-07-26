//==========================================
// KO-PE Idle Demo
// Version 0.0.6
//
// 已完成：
// ✔ 玩家系統
// ✔ 地區系統
// ✔ UI 更新
// ✔ 探索按鈕
// ✔ 探索狀態
//
// 下一步：
// □ 倒數計時

//========================
// 玩家資料
//========================
const player = {

    level: 1,

    exp: 0,

    expToNextLevel: 100,

    money: 0,

    currentArea: 1,

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
//========================
// 畫面更新
//========================


function updateUI() {
    const currentArea = getCurrentArea();

    const levelElement = document.getElementById("level");
    const expElement = document.getElementById("exp");
    const moneyElement = document.getElementById("money");
    const areaNameElement = document.getElementById("area-name");
    const countdownElement = document.getElementById("countdown");
    const scrapElement = document.getElementById("scrap");
    const wireElement = document.getElementById("wire");
    const logElement = document.getElementById("log");
	const exploreButton =
    document.getElementById("explore-btn");
	exploreButton.disabled = player.isExploring;

    levelElement.textContent =
        "等級：" + player.level;

    expElement.textContent =
        "EXP：" + player.exp + " / " + player.expToNextLevel;

    moneyElement.textContent =
        "黑金晶片：" + player.money;

    areaNameElement.textContent =
        currentArea.name;

    countdownElement.textContent =
	"剩餘時間：" + player.remainingTime + " 秒";

    scrapElement.textContent =
        "廢鐵：" + player.materials.scrap;

    wireElement.textContent =
        "破損電線：" + player.materials.wire;

    logElement.innerHTML =
		player.logs.join("<br>");

	if (player.isExploring) {

		exploreButton.textContent = "探索中……";

	} else {

		exploreButton.textContent = "開始探索";

}
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

    player.remainingTime = currentArea.duration;

    updateUI();

    explorationTimer = setInterval(function () {

        player.remainingTime = player.remainingTime - 1;

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

    const currentArea = getCurrentArea();

    player.exp =
        player.exp + currentArea.expReward;

    player.materials.scrap =
        player.materials.scrap + currentArea.rewards.scrap;

    player.materials.wire =
        player.materials.wire + currentArea.rewards.wire;

    addLog(
        "在「" +
        currentArea.name +
        "」完成探索：EXP +" +
        currentArea.expReward +
        "、廢鐵 +" +
        currentArea.rewards.scrap +
        "、破損電線 +" +
        currentArea.rewards.wire
    );

    player.isExploring = false;

    updateUI();

    // 立即開始下一輪，不再等待一秒
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