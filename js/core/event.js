
//========================
// 特殊事件系統
//========================
let allEvents = [

    ...commonEvents,

    ...area1Events,
    ...area2Events,
    ...area3Events,
    ...area4Events,
    ...area5Events

];

function rebuildAllEvents() {

    allEvents = [

        ...commonEvents,

        ...area1Events,
        ...area2Events,
        ...area3Events,
        ...area4Events,
        ...area5Events

    ];

}
// 嘗試觸發目前地區的特殊事件
function tryTriggerEvent(area) {

    const availableEvents =
        allEvents.filter(function (event) {

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
    "【特殊事件】" +
    player.activeEvent.title
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

if (
    randomNumber <
    selectedOption.successChance
) {

    result =
        selectedOption.success;

    setCharacterState(
        "success"
    );

    showRandomCharacterLine(
        characterDialogue.success
    );

} else {

    result =
        selectedOption.failure;

    setCharacterState(
        "failure"
    );

    showRandomCharacterLine(
        characterDialogue.failure
    );

}

if (result.log) {

    addLog(
        "【事件結果】" +
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

                const prefix =
                    reward.amount >= 0
                    ? "獲得 "
                    : "失去 ";

                const amount =
                    Math.abs(
                        reward.amount
                    );

                if (reward.money) {

                    return (
                        prefix +
                        formatRewardText(
                            "黑金晶片",
                            amount
                        )
                    );

                }

                return (
                    prefix +
                    formatRewardText(
                        getMaterialName(
                            reward.material
                        ),
                        amount
                    )
                );

            }
        );

    addLog(
    rewardTexts.join("、")
	);

    // 顯示個別稀有獎勵訊息
    obtainedRewards.forEach(
        function (reward) {

            if (reward.log) {

                addLog(
                    reward.log
                );

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

