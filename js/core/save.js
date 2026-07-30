//========================
// 存檔設定
//========================

const SAVE_KEY =
    "kopeIdleSave_v1";
//========================
// 初始化素材
//========================
function initializePlayerMaterials() {

    materialData.forEach(
        function (material) {

            const amount =
                player.materials[
                    material.id
                ];

            if (
                typeof amount !== "number" ||
                !Number.isFinite(amount)
            ) {

                player.materials[
                    material.id
                ] = 0;

            }

        }
    );

}
//========================
// 存檔驗證
//========================
function validateSaveData(
    saveData
) {

    if (
        !saveData ||
        typeof saveData !== "object"
    ) {

        return false;

    }

    return true;

}
//========================
// 套用玩家資料
//========================

function applyPlayerData(
    savedData
) {
	if (
            typeof savedData.level ===
            "number"
        ) {

            console.log(savedData);

			player.level =
			savedData.level;

        }

        if (
            typeof savedData.exp ===
            "number"
        ) {

            player.exp =
                savedData.exp;

        }

        if (
            typeof savedData.expToNextLevel ===
            "number"
        ) {

            player.expToNextLevel =
                savedData.expToNextLevel;

        }

        if (
            typeof savedData.money ===
            "number"
        ) {

            player.money =
                savedData.money;

        }

        if (
            typeof savedData.currentArea ===
            "number"
        ) {

            const savedAreaExists =
                areas.some(function (area) {

                    return area.id ===
                        savedData.currentArea;

                });

            if (savedAreaExists) {

                player.currentArea =
                    savedData.currentArea;

            }

        }

if (
    savedData.materials &&
    typeof savedData.materials ===
        "object"
) {

    player.materials = {
        ...player.materials,
        ...savedData.materials
    };

}
if (
    savedData.equipmentLevels &&
    typeof savedData.equipmentLevels ===
        "object"
) {

    player.equipmentLevels = {
        ...player.equipmentLevels,
        ...savedData.equipmentLevels
    };

}


if (
    savedData.specialPurchases &&
    typeof savedData.specialPurchases ===
        "object"
) {

    player.specialPurchases = {
        ...player.specialPurchases,
        ...savedData.specialPurchases
    };

}

if (
    Array.isArray(
        savedData.discoveredAreas
    )
) {

    player.discoveredAreas =
        savedData.discoveredAreas;
}
// 舊存檔相容處理：
// 已有地下設施秘鑰時，自動補上第五區發現紀錄
const hasUndergroundKey =
    (
        player.materials[
            "undergroundKey"
        ] || 0
    ) > 0;

const hasDiscoveredArea5 =
    player.discoveredAreas.includes(5);

if (
    hasUndergroundKey &&
    !hasDiscoveredArea5
) {

    player.discoveredAreas.push(5);

}
}
function restoreGameState() {
        player.isExploring = false;
        player.remainingTime = 0;
        player.exploringAreaId = null;
        player.activeEvent = null;

        player.logs = [
            "存檔載入完成，歡迎回來！"
        ];
}
//========================
// 建立存檔資料
//========================

function createSaveData() {

    return {

        game: "KO-PE Idle",

        saveVersion: 1,

        gameVersion: "0.4.41",

        version: 1,

        level: player.level,

        exp: player.exp,

        expToNextLevel:
            player.expToNextLevel,

        money: player.money,

        currentArea:
            player.currentArea,

        materials: {
            ...player.materials
        },

        equipmentLevels: {
            ...player.equipmentLevels
        },

        specialPurchases: {
            ...player.specialPurchases
        },

        discoveredAreas: [
            ...player.discoveredAreas
        ]

    };

}
//========================
// 存檔系統
//========================

function saveGame() {

	const saveData =
    createSaveData();

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );
console.log(
    "KO-PE Idle 存檔成功。"
);
}
function loadGame() {

    const savedText =
        localStorage.getItem(SAVE_KEY);

    if (!savedText) {

        console.log(
            "沒有找到存檔，開始新遊戲。"
        );

        return false;

    }

    try {

        const savedData =
            JSON.parse(savedText);
			if (
    !validateSaveData(
        savedData
    )
) {

    console.error(
        "存檔格式錯誤。"
    );

    return false;

}

if (
    savedData.game &&
    savedData.game !==
        "KO-PE Idle"
) {

    console.error(
        "不是 KO-PE Idle 的存檔。"
    );

    return false;

}
	applyPlayerData(
    savedData
);
restoreGameState();


        
        console.log(
            "KO-PE Idle 存檔載入成功。"
        );

        return true;

    } catch (error) {

        console.error(
            "讀取存檔失敗：",
            error
        );

        return false;

    }

}
// 匯出存檔
function exportSave() {

    const saveData =
        createSaveData();

    const json =
        JSON.stringify(
            saveData,
            null,
            2
        );

    downloadSaveFile(json);
	console.log("存檔已匯出。");

addLog("存檔已匯出。");
}

//========================
// 匯入存檔
//========================

function importSave(file) {

    if (!file) {
        return;
    }

    const reader =
        new FileReader();

    reader.onload = function (event) {

    try {

        const saveData =
            JSON.parse(
                event.target.result
            );

        if (
    !validateSaveData(saveData)
) {

    console.error(
        "存檔格式錯誤。"
    );

    return;

}

applyPlayerData(
    saveData
);

restoreGameState();

updateUI();

saveGame();

console.log(
    "KO-PE Idle 匯入成功。"
);

    } catch (error) {

        console.error(
            "JSON 格式錯誤：",
            error
        );

    }

};

    reader.readAsText(file);

}

function downloadSaveFile(
    json
) {

    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    const today =
        new Date();

    const fileName =
        "KOPE_Save_" +
        today.getFullYear() +
        "-" +
        String(
            today.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            today.getDate()
        ).padStart(2, "0") +
        ".json";

    link.href = url;

    link.download =
        fileName;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(
        url
    );

}