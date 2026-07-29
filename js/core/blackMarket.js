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

function closeBlackMarket() {

    if (!blackMarketModal) {
        return;
    }

    blackMarketModal.hidden =
        true;

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
