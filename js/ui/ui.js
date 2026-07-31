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

    const currentImagePath =
    areaImageElement.getAttribute(
        "src"
    );

	if (
    currentImagePath !==
    currentArea.image
) {

    areaImageElement.src =
        currentArea.image;

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

function updateExplorationTimerUI() {

    const countdownElement =
        document.getElementById(
            "countdown"
        );

    const progressElement =
        document.getElementById(
            "exploration-progress"
        );

    if (countdownElement) {

        countdownElement.textContent =
            "剩餘時間：" +
            player.remainingTime +
            " 秒";

    }

    if (!progressElement) {
        return;
    }

    if (
        !player.isExploring ||
        player.exploringAreaId === null
    ) {

        progressElement.style.width =
            "0%";

        return;

    }

    const exploredArea =
        areas.find(
            function (area) {

                return (
                    area.id ===
                    player.exploringAreaId
                );

            }
        );

    if (!exploredArea) {

        progressElement.style.width =
            "0%";

        return;

    }

    const totalDuration =
        exploredArea.duration;

    const elapsedTime =
        totalDuration -
        player.remainingTime;

    const percentage =
        totalDuration > 0
            ? elapsedTime /
                totalDuration *
                100
            : 0;

    progressElement.style.width =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        ) + "%";

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

    const currentPath =
        characterImageElement.getAttribute(
            "src"
        );

     // 只有狀態真的改變時才更換圖片。
     // 否則 GIF 可能每次更新 UI 都重新載入，
     // 導致動畫反覆從第一格開始。
    if (currentPath !== imagePath) {

        characterImageElement.src =
            imagePath;

    }

    characterImageElement.alt =
        "KO-PE：" +
        player.characterState;

}
	