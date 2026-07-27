//==========================================
// KO-PE Idle Demo
// Version 0.4.0
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
// 下一步：
// □ 基地升級或簡單商店
// □ 離線收益
// □ 圖鑑與成就
// □ 事件鏈與主線故事
// □ 音效、動畫與最終視覺優化
// □ 待增加
//========================
// 開發模式
//========================
const DEBUG = false;
const DEBUG_EXP = 100;
const DEBUG_TIME = 1;
const DEBUG_EVENT_CHANCE = 1;
//========================
// 存檔設定
//========================

const SAVE_KEY =
    "kopeIdleSave_v1";
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

    materials: {},
	equipmentLevels: {

    recoveryTools: 1

},

    discoveredAreas: [],

    isExploring: false,

    remainingTime: 0,

    activeEvent: null,

    characterState: "idle",

    logs: [
        "歡迎來到 KO-PE Idle！"
    ]

};

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
// 存檔系統
//========================

function saveGame() {

    const saveData = {

    version: 1,

    level:
        player.level,

    exp:
        player.exp,

    expToNextLevel:
        player.expToNextLevel,

    money:
        player.money,

    currentArea:
        player.currentArea,

    materials: {
    ...player.materials
},

equipmentLevels: {
    ...player.equipmentLevels
},

discoveredAreas: [
    ...player.discoveredAreas
]

};

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
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
            typeof savedData.level ===
            "number"
        ) {

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

        // 每次載入都重設暫時狀態
        player.isExploring = false;
        player.remainingTime = 0;
        player.exploringAreaId = null;
        player.activeEvent = null;

        player.logs = [
            "存檔載入完成，歡迎回來！"
        ];

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
                Version 0.4.0
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
//========================
// 素材資料
//========================

const materialData = [

    //====================
    // 基礎回收物
    //====================

    {
        id: "scrap",
    name: "銹蝕廢金屬",
    category: "common",

    sellPrice: 2,

    description:
        "被銹霧侵蝕的金屬碎片。" +
        "經過重新熔煉後，仍可作為基礎維修材料。"
    },

    {
        id: "wire",
        name: "老化導線",
        category: "common",
		sellPrice: 3,
        description:
            "從建築與廢棄設備中拆下的導線。" +
            "外層已經脆化，但內部金屬仍有回收價值。"
    },

    {
        id: "polymer",
        name: "耐蝕聚合物",
        category: "common",
		sellPrice: 3,
        description:
            "舊時代使用的合成材料。" +
            "能用於修補防護服、面罩與裝備外殼。"
    },

    {
        id: "metalPlate",
        name: "變形合金板",
        category: "common",
		sellPrice: 5,
        description:
            "從建築外牆與機械外殼拆下的合金板。" +
            "表面變形，但仍可重新加工。"
    },

    {
        id: "filterFiber",
        name: "污染過濾纖維",
        category: "common",
		sellPrice: 6,
        description:
            "殘留於舊型空氣過濾設備中的特殊纖維。" +
            "清理後可用於維修呼吸裝備。"
    },

    //====================
    // 機械與電子零件
    //====================

    {
        id: "battery",
        name: "衰退蓄能電池",
        category: "uncommon",
		sellPrice: 10,
        description:
            "容量嚴重下降的舊式電池。" +
            "部分單元仍能保存少量能源。"
    },

    {
        id: "circuit",
        name: "受蝕電路模組",
        category: "uncommon",
		sellPrice: 14,
        description:
            "遭到銹霧侵蝕的電子模組。" +
            "其中仍可能保留可用的控制元件。"
    },

    {
        id: "motor",
        name: "微型驅動核心",
        category: "uncommon",
		sellPrice: 18,
        description:
            "從自動門、輸送設備或智械中拆下的驅動裝置。" +
            "維修後仍可重新運轉。"
    },

    {
        id: "sensor",
        name: "感應器組件",
        category: "uncommon",
		sellPrice: 20,
        description:
            "舊文明設備使用的環境感應器。" +
            "可偵測溫度、動作或空氣成分。"
    },

    //====================
    // 稀有回收物
    //====================

    {
        id: "foodPack",
        name: "密封合成食品",
        category: "uncommon",
		sellPrice: 12,
        description:
            "包裝尚未破損的舊時代合成食品。" +
            "是否還能食用，通常取決於科佩有多勇敢。"
    },

    {
        id: "energyCrystal",
        name: "微型能源結晶",
        category: "rare",
		sellPrice: 80,
        description:
            "能夠穩定儲存高密度能源的人工結晶。" +
            "是光譜層維修能源設備的重要材料。"
    },

    {
        id: "intactChip",
        name: "完整運算晶片",
        category: "rare",
		sellPrice: 100,
        description:
            "少數未被銹霧破壞的舊文明晶片。" +
            "可用於精密設備與智械系統。"
    },

    {
        id: "dataCarrier",
        name: "舊文明資料載體",
        category: "rare",
		sellPrice: 150,
        description:
            "保存舊時代資料的儲存裝置。" +
            "內容可能是重要研究紀錄，也可能只是三百年前的購物清單。"
    },

    {
        id: "blackBox",
        name: "密封黑盒",
        category: "rare",
		sellPrice: 250,
        description:
            "具有高強度外殼的舊文明資料裝置。" +
            "通常記錄著設備最後運作時的資訊。"
    },

    {
        id: "machineCore",
        name: "智械控制核心",
        category: "rare",
		sellPrice: 400,
        description:
            "失控智械的主要控制模組。" +
            "具有極高回收價值，也可能仍在偷偷運算。"
    },
//========================
// 劇情物品
//========================
	{
    id: "rareSupplyMap",
    name: "稀有物資座標",
    category: "keyItem"
},

{
    id: "undergroundKey",
    name: "地下設施秘鑰",
    category: "keyItem"
}

];
//========================
// 裝備改造資料
//========================

const equipmentData = [

    {
        id: "recoveryTools",

        category: "recovery",

        name: "回收工具組",

        description:
            "科佩用來拆解機械、回收零件與處理危險物的工具組。",

        levels: [

            {
                level: 1,

                name:
                    "拼裝式回收工具",

                price: 0,

                effectDescription:
                    "目前沒有額外回收加成。",

                effects: {

                    commonMaterialBonusChance:
                        0

                }
            },

            {
                level: 2,

                name:
                    "磁吸拆解工具",

                price: 100,

                effectDescription:
                    "取得一般素材時，有 10% 機率額外獲得 1 個。",

                effects: {

                    commonMaterialBonusChance:
                        0.1

                }
            },

            {
                level: 3,

                name:
                    "精密回收工具組",

                price: 350,

                effectDescription:
                    "取得一般素材時，有 20% 機率額外獲得 1 個。",

                effects: {

                    commonMaterialBonusChance:
                        0.2

                }
            }

        ]

    }

];
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
//========================
// 裝備效果計算
//========================

function getPlayerEffects() {

    const effects = {

        commonMaterialBonusChance:
            0,

        explorationSpeed:
            0,

        expBonus:
            0,

        eventSuccessBonus:
            0

    };

    equipmentData.forEach(
        function (equipment) {

            const currentLevelData =
                getCurrentEquipmentLevelData(
                    equipment.id
                );

            if (
                !currentLevelData ||
                !currentLevelData.effects
            ) {

                return;

            }

            Object.entries(
                currentLevelData.effects
            ).forEach(
                function (
                    [effectId, value]
                ) {

                    if (
                        typeof value !==
                        "number"
                    ) {

                        return;

                    }

                    if (
                        typeof effects[
                            effectId
                        ] !== "number"
                    ) {

                        effects[
                            effectId
                        ] = 0;

                    }

                    effects[
                        effectId
                    ] += value;

                }
            );

        }
    );

    return effects;

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
//========================
// 黑市交易系統
//========================
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
                material.category !==
                    "keyItem" &&
                typeof material.sellPrice ===
                    "number" &&
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

//========================
// 地區資料
//========================
const areas = [

   {
    id: 1,
    name: "外圍廢墟",
    levelRequired: 1,
    duration: 5,
    expReward: 2,

    image:
        "images/areas/outer-ruins.jpg",

    drops: [

    // 保底素材
    {
        material: "scrap",
        chance: 0.8,
        min: 1,
        max: 3
    },

    {
        material: "wire",
        chance: 0.45,
        min: 1,
        max: 2
    },

    {
        material: "polymer",
        chance: 0.3,
        min: 1,
        max: 2
    },

    {
        material: "filterFiber",
        chance: 0.12,
        min: 1,
        max: 1
    }

],

    eventChance: 0.02
	},

    {
    id: 2,
    name: "廢棄街區",
    levelRequired: 3,
    duration: 8,
    expReward: 5,

    image:
        "images/areas/abandoned-street.jpg",

    drops: [

    // 保底素材
    {
        material: "scrap",
        chance: 0.9,
        min: 2,
        max: 5
    },

    {
        material: "metalPlate",
        chance: 0.55,
        min: 1,
        max: 3
    },

    {
        material: "wire",
        chance: 0.5,
        min: 1,
        max: 3
    },

    {
        material: "battery",
        chance: 0.25,
        min: 1,
        max: 2
    },

    {
        material: "circuit",
        chance: 0.12,
        min: 1,
        max: 1
    },

    {
        material: "intactChip",
        chance: 0.015,
        min: 1,
        max: 1
    }

],
    eventChance: 0.03
},
{
    id: 3,

    name: "舊商場",

    levelRequired: 6,

    duration: 10,

    expReward: 10,

    image:
        "images/areas/Old shopping mall.jpg",

    drops: [

    // 保底素材
    {
        material: "polymer",
        chance: 0.85,
        min: 2,
        max: 5
    },

    {
        material: "battery",
        chance: 0.55,
        min: 1,
        max: 3
    },

    {
        material: "circuit",
        chance: 0.4,
        min: 1,
        max: 2
    },

    {
        material: "motor",
        chance: 0.25,
        min: 1,
        max: 2
    },

    {
        material: "foodPack",
        chance: 0.18,
        min: 1,
        max: 2
    },

    {
        material: "sensor",
        chance: 0.1,
        min: 1,
        max: 1
    },

    {
        material: "energyCrystal",
        chance: 0.025,
        min: 1,
        max: 1
    },

    {
        material: "dataCarrier",
        chance: 0.01,
        min: 1,
        max: 1
    }

],
    eventChance: 0.04
},
{
    id: 4,

    name: "地下通道",

    levelRequired: 12,

    duration: 15,

    expReward: 30,

    image:
        "images/areas/Underpass.jpg",

    drops: [

    // 保底素材
    {
        material: "metalPlate",
        chance: 0.9,
        min: 2,
        max: 5
    },

    {
        material: "filterFiber",
        chance: 0.6,
        min: 1,
        max: 3
    },

    {
        material: "wire",
        chance: 0.5,
        min: 2,
        max: 4
    },

    {
        material: "motor",
        chance: 0.4,
        min: 1,
        max: 2
    },

    {
        material: "sensor",
        chance: 0.3,
        min: 1,
        max: 2
    },

    {
        material: "circuit",
        chance: 0.25,
        min: 1,
        max: 2
    },

    {
        material: "energyCrystal",
        chance: 0.05,
        min: 1,
        max: 1
    },

    {
        material: "intactChip",
        chance: 0.03,
        min: 1,
        max: 1
    },

    {
        material: "blackBox",
        chance: 0.01,
        min: 1,
        max: 1
    },

    {
        material: "machineCore",
        chance: 0.005,
        min: 1,
        max: 1
    }

],
    eventChance: 0.06
},
{
    id: 5,

    name: "封鎖的地下設施",

    levelRequired: 10,

    requiredItem:
        "undergroundKey",
		
	secretUnlock: true,
	
	hiddenUntilDiscovered: true,
	
    duration: 20,

    expReward: 50,

    image:
        "images/areas/underground-facility.jpg",

    drops: [
        {
            material: "circuit",
            chance: 0.7,
            min: 1,
            max: 3
        }
		
    ],

    eventChance: 0.08
}
];

//========================
// 角色立繪資料
//========================

const characterImages = {

    idle:
        "images/kope/idle.png",

    exploring:
        "images/kope/exploring.png",

    event:
        "images/kope/event.png",

    success:
        "images/kope/success.png",

    failure:
        "images/kope/failure.png"

};
//========================
// KO-PE 台詞資料
//========================

const characterDialogue = {

    // 載入遊戲時隨機抽取一句
    greeting: [

        "「嘿！朋友，今天去哪裡？」",

        "「你終於來啦！我已經準備好出發了。」",

        "「今天也要一起去找些好東西嗎？」",
		
		"「喂喂？喂～～聽得到嗎？喂喂！這裡是大天才科佩在跟你說話哦！訊號還行吧？」",
		
		"「霧潮開始下降了，現在正是衝進去撿寶貝的黃金時間！記得看時間，不然神仙也救不了你！」",

        "「嘿，別只是站著像個當機的伺服器！舊時代的寶藏正等著我們呢！」"

    ],

    // 一般探索途中使用
    exploration: [

        "「這附近一定還藏著能用的東西。」",

        "「小心腳下，這裡的地板看起來不太可靠。」",
		
		"「全能嚮導從不迷路！我們只是在探索一條地圖上沒有記載的新路線！」",
		
		"「在這個爛透了的世界，能找到一個陪我這麽瘋的人，比在垃圾堆裡挖到黑金晶片還難。」",

        "「我知道你在想什麼，『科佩，這太危險了，輻射值還有點高』一一拜託，快樂本身就是一種高風險投資！」"

    ],

    // 各地區的專屬探索台詞
    specialExploration: {

        1: [
            "「外圍廢墟雖然破，但總能翻出些基礎材料。」"
        ],

        2: [
            "「這條街以前一定很熱鬧……現在也挺熱鬧的，只是沒有人。」"
        ],

        3: [
            "「商場裡會不會還留著沒過期的零食？」"
        ],

        4: [
            "「地下通道的回音聽起來怪怪的，朋友，跟緊我。」"
        ],

        5: [
            "「這裡不像普通的廢墟。有人刻意把它藏起來了。」",
			"「這可是禁區！非常危險、非常致命——所以報酬應該也非常不錯吧！」"
        ]

    },

    // 特殊事件剛發生時
    event: [

        "「等等，我好像發現了什麼！」",

        "「朋友，你覺得這東西安全嗎？」",

        "「這種時候，就該展現嚮導的判斷力了！」"

    ],

    // 事件成功
    success: [

        "「我就知道這個方法行得通！」",

        "「看吧，全能嚮導從不讓人失望！」",

        "「收穫不錯！我們的運氣正在變好。」"

    ],

    // 事件失敗
    failure: [

        "「……至少我們現在知道這個方法不行。」",

        "「沒事！下次一定會成功，大概吧。」",

        "「朋友，剛才的事情就當作沒發生過，好嗎？」"

    ],
	// 黑市相關
	blackMarket: {

    open: [

        "「歡迎來到廢土最講信用的交易場所！這句話絕對不是招牌要求我念的。」",

        "「黑市規則很簡單：不問來源，不接受退貨，記得數清楚晶片！」",

        "「朋友，把背包放好。這裡的人看到完整晶片時，眼睛會比掃描器還亮。」"

    ],

    sellSuccess: [

        "「成交！看吧，我就說這些不是垃圾，只是還沒遇到識貨的人！」",

        "「黑金晶片到手！我們的背包也終於能喘口氣了。」",

        "「很好，成功把一堆廢料變成了更方便攜帶的廢料代幣！」"

    ],

    noMaterial: [

        "「想賣空氣嗎？這裡的空氣可能有毒，但還沒值錢到那個程度。」",

        "「朋友，我也很想成交，但你的背包比交易商的良心還空。」"

    ],

    keyItem: [

    "「這個不能賣。至少在我們弄清楚它會不會打開某個危險設施以前不能。」",

    "「不行不行，這是線索！拿線索換錢通常是故事裡最糟糕的決定。」"

],
 // 升級相關
	upgradeSuccess: [

    "「升級完成！現在能把垃圾拆得更有價值了！」",

    "「新工具到手！附近那些寫著『禁止拆解』的設備要倒楣了。」",

    "「聽聽這個運轉聲！這絕對是可靠的聲音……大概。」"

],

	notEnoughMoney: [

    "「黑金晶片不夠。看來我們得再去翻幾座廢墟了！」",

    "「朋友，光靠熱情不能付款。我試過了，他們不收。」"

],

	maxLevel: [

    "「已經改到目前的極限了！再加零件，它可能會開始要求薪水。」",

    "「這套工具已經完美了！至少在我想到下一個改法以前。」"

]
}
};
//========================
// 特殊事件資料
//========================

const events = [

    //====================
    // 事件 1：半埋的工具箱
    //====================
    {
        id: 1,

        title: "半埋的工具箱",

        description:
            "科佩在碎石下發現一只生鏽的工具箱。" +
            "箱蓋卡得很緊，旁邊還纏著幾條可疑的電線。",

        areaIds: [1],

        options: [

            // 選項 1
            {
                text: "直接撬開",

                successChance: 0.65,

                success: {

                    log:
                        "科佩成功撬開工具箱，裡面的零件大致完好！",

                    rewards: [

                        {
                            material: "scrap",
                            min: 2,
                            max: 5,
                            chance: 1
                        },

                        {
                            material: "wire",
                            min: 1,
                            max: 3,
                            chance: 1
                        }

                    ]

                },

                failure: {

                    log:
                        "工具箱突然彈開，裡面的零件散落一地，大部分都已經損壞。",

                    rewards: [

                        {
                            material: "scrap",
                            min: 1,
                            max: 2,
                            chance: 1
                        },

                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.35
                        }

                    ]

                }

            },

            // 選項 2
            {
                text: "小心拆除電線",

                successChance: 0.9,

                success: {

                    log:
                        "科佩順利拆除電線，並安全打開了工具箱。",

                    rewards: [

                        {
                            material: "scrap",
                            min: 2,
                            max: 4,
                            chance: 1
                        },

                        {
                            material: "wire",
                            min: 2,
                            max: 4,
                            chance: 1
                        },

                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.15
                        }

                    ]

                },

                failure: {

                    log:
                        "老化的電線突然斷裂，工具箱內部冒出一陣焦煙。",

                    rewards: [

                        {
                            material: "scrap",
                            min: 1,
                            max: 2,
                            chance: 1
                        },

                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.5
                        }

                    ]

                }

            },

            // 選項 3
            {
                text: "直接離開",

                successChance: 1,

                success: {

                    log:
                        "科佩盯著工具箱看了一會兒，最後決定不要冒險。",

                    rewards: []

                },

                failure: {

                    log: "",

                    rewards: []

                }

            }

        ]

    },

    //====================
    // 事件 2：故障的服務機器人
    //====================
    {
        id: 2,

        title: "故障的服務機器人",

        description:
            "街角倒著一台舊式服務機器人。" +
            "它的指示燈仍在閃爍，並不斷重複播放一句模糊的歡迎詞。" +
            "科佩看起來非常想把它叫醒。",

        areaIds: [2],

        options: [

            // 選項 1
            {
                text: "嘗試重新啟動",

                successChance: 0.5,

                success: {

    log:
        "機器人短暫恢復運作，開始搜尋附近仍然有效的服務資料。" +
        "它隨後投射出一組座標——那裡似乎藏著一批尚未被回收的物資！",

    rewards: [

        {
            material: "scrap",
            min: 2,
            max: 5,
            chance: 1
        },

        {
            material: "wire",
            min: 1,
            max: 3,
            chance: 1
        },

        {
            material: "circuit",
            min: 1,
            max: 2,
            chance: 0.45
        },

        {
            material: "rareSupplyMap",
            amount: 1,
            chance: 0.2,
            maxOwned: 1,

            log:
                "科佩記下了其中一處特別清晰的座標，這份資料或許能在之後派上用場。"
        },

        {
            material: "undergroundKey",
            amount: 1,
            chance: 0.05,
            maxOwned: 1,

            log:
                "機器人吐出一枚標有舊文明設施編號的秘鑰。" +
                "秘鑰表面浮現出一串微弱座標，地圖邊緣似乎多出了一個從未標示過的訊號。"
        }

    ]

},

                failure: {

                    log:
                        "機器人突然發出刺耳警報，接著徹底斷電。",

                    rewards: [

                        {
                            material: "scrap",
                            min: 1,
                            max: 2,
                            chance: 1
                        },

                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.5
                        }

                    ]

                }

            },

            // 選項 2
            {
                text: "拆下可用零件",

                successChance: 0.85,

                success: {

                    log:
                        "科佩熟練地拆下尚未腐蝕的零件。機器人最後說了一聲「謝謝惠顧」。",

                    rewards: [

                        {
                            material: "scrap",
                            min: 3,
                            max: 6,
                            chance: 1
                        },

                        {
                            material: "wire",
                            min: 2,
                            max: 5,
                            chance: 1
                        },

                        {
                            material: "motor",
                            amount: 1,
                            chance: 0.3
                        },

                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.2
                        }

                    ]

                },

                failure: {

                    log:
                        "機器人的內部結構比預想中脆弱，大部分零件在拆卸時碎裂了。",

                    rewards: [

                        {
                            material: "scrap",
                            min: 1,
                            max: 2,
                            chance: 1
                        },

                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.4
                        }

                    ]

                }

            },

            // 選項 3
            {
                text: "不去打擾它",

                successChance: 1,

                success: {

                    log:
                        "科佩盯著機器人看了很久，最後勉強同意離開。",

                    rewards: []

                },

                failure: {

                    log: "",

                    rewards: []

                }

            }

        ]

    }

];
/*新增事件用模板
{
    id: 3,

    title: "事件名稱",

    description:
        "事件描述。",

    areaIds: [],

    options: [

        {
            text: "選項名稱",

            successChance: 0.5,

            success: {

                log:
                    "成功訊息。",

                rewards: [

                    {
                        material: "scrap",
                        min: 1,
                        max: 3,
                        chance: 1
                    }

                ]

            },

            failure: {

                log:
                    "失敗訊息。",

                rewards: []

            }

        }

    ]

}
*/
//========================
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
// 尋找素材名稱
function getMaterialName(materialId) {

    const material =
        materialData.find(
            function (item) {

                return item.id ===
                    materialId;

            }
        );

    if (material) {
        return material.name;
    }

    return materialId;

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

        if (!reward || !reward.material) {
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

                    return (
                        getMaterialName(
                            reward.material
                        ) +
                        " +" +
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

        return (
            area.levelRequired ===
                player.level &&
            isAreaUnlocked(area) &&
            isAreaDiscovered(area)
        );

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
            getMaterialName(
                materialId
            ) +
            " +" +
            amount
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