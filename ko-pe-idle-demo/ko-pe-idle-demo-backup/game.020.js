//==========================================
// KO-PE Idle Demo
// Version 0.2.0
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
const DEBUG_EVENT_CHANCE = null;
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
	activeEvent: null,
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
// 特殊事件資料
//========================

const events = [

    {
        id: 1,

        title: "半埋的工具箱",

        description:
            "科佩在碎石下發現一只生鏽的工具箱。" +
            "箱蓋卡得很緊，旁邊還纏著幾條可疑的電線。",

        areaIds: [1],

        options: [

            {
                text: "直接撬開",

                successChance: 0.65,

                success: {
                    log:
                        "科佩成功撬開工具箱，裡面的零件大致完好！",

                    scrap: 5,

                    wire: 2
                },

                failure: {
                    log:
                        "工具箱突然短路。科佩帶回了一些冒煙的廢鐵。",

                    scrap: 1,

                    wire: 0
                }
            },

            {
                text: "小心拆除電線",

                successChance: 0.9,

                success: {
                    log:
                        "科佩拆除了老舊線路，安全取出了箱內物資。",

                    scrap: 3,

                    wire: 4
                },

                failure: {
                    log:
                        "其中一條電線碎成了粉末，只留下少量材料。",

                    scrap: 1,

                    wire: 1
                }
            },

            {
                text: "直接離開",

                successChance: 1,

                success: {
                    log:
                        "科佩依依不捨地放棄了工具箱。至少這次沒有爆炸。",

                    scrap: 0,

                    wire: 0
                },

                failure: {
                    log: "",

                    scrap: 0,

                    wire: 0
                }
            }

        ]
    },
	{
    id: 2,

    title: "故障的服務機器人",

    description:
        "街角倒著一台舊式服務機器人。" +
        "它的指示燈仍在閃爍，並不斷重複播放一句模糊的歡迎詞。" +
        "科佩看起來非常想把它叫醒。",

    areaIds: [2],

    options: [

        {
            text: "嘗試重新啟動",

            successChance: 0.5,

            success: {
                log:
                    "機器人短暫恢復運作，替科佩指出了一處零件儲藏點！",

                scrap: 6,

                wire: 3
            },

            failure: {
                log:
                    "機器人突然發出刺耳警報，接著徹底斷電。",

                scrap: 1,

                wire: 1
            }
        },

        {
            text: "拆下可用零件",

            successChance: 0.85,

            success: {
                log:
                    "科佩熟練地拆下了尚未腐蝕的零件。機器人最後說了一聲「謝謝惠顧」。",

                scrap: 4,

                wire: 5
            },

            failure: {
                log:
                    "機器人的內部結構比預想中脆弱，只留下少量可用材料。",

                scrap: 2,

                wire: 1
            }
        },

        {
            text: "不去打擾它",

            successChance: 1,

            success: {
                log:
                    "科佩盯著機器人看了很久，最後勉強同意離開。",

                scrap: 0,

                wire: 0
            },

            failure: {
                log: "",

                scrap: 0,

                wire: 0
            }
        }

    ]
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

    const randomNumber =
        Math.random();

    let result;

    if (
        randomNumber <
        selectedOption.successChance
    ) {

        result =
            selectedOption.success;

        addLog(
            "事件成功：" +
            result.log
        );

    } else {

        result =
            selectedOption.failure;

        addLog(
            "事件失敗：" +
            result.log
        );

    }

    player.materials.scrap +=
        result.scrap;

    player.materials.wire +=
        result.wire;

    player.activeEvent = null;

    updateUI();

    startExploration();

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
	
	updateEventUI();

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

const eventTriggered =
    tryTriggerEvent(exploredArea);

updateUI();

if (eventTriggered) {
    return;
}

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