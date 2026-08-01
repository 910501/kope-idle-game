//========================
// 裝備改造資料
//========================

const equipmentData = [

    {
    id: "recovery_tools",

    name: "回收工具組",

    description:
        "利用各種來源不明的零件拼裝而成，廢土客最重要的生財工具。",

    levels: [

        {
            level: 1,

            name: "拼裝式回收工具",

            price: 0,

            effectDescription:
                "尚未完成改造。",

            effects: {

                commonMaterialBonusChance: 0,

                rareMaterialBonusChance: 0

            }

        },

        {
            level: 2,

            name: "磁吸拆解工具",

            price: 800,

            effectDescription:
                "一般素材額外 +10%。",

            effects: {

                commonMaterialBonusChance: 0.10,

                rareMaterialBonusChance: 0

            }

        },

        {
            level: 3,

            name: "精密回收工具組",

            price: 3500,

            effectDescription:
                "一般素材額外 +20%。",

            effects: {

                commonMaterialBonusChance: 0.20,

                rareMaterialBonusChance: 0

            }

        },

        {
            level: 4,

            name: "工業級拆解平台",

            price: 12000,

            effectDescription:
                "一般素材額外 +30%，稀有素材額外 +5%。",

            effects: {

                commonMaterialBonusChance: 0.30,

                rareMaterialBonusChance: 0.05

            }

        },

        {
            level: 5,

            name: "奈米回收單元",

            price: 50000,

            effectDescription:
                "一般素材額外 +40%，稀有素材額外 +10%。",

            effects: {

                commonMaterialBonusChance: 0.40,

                rareMaterialBonusChance: 0.10

            }

        }

    ]

},

{
    id: "detection_module",

    name: "偵測模組",

    description:
        "讓科佩更快找到值得探索的位置。",

    levels: [

        {
            level: 1,

            name: "手持生命探測器",

            price: 0,

            effectDescription:
                "尚未完成改造。",

            effects: {

                commonMaterialBonusChance: 0,

                rareMaterialBonusChance: 0

            }

        },

        {
            level: 2,

            name: "熱源掃描模組",

            price: 800,

            effectDescription:
                "探索速度 +5%。",

            effects: {

                explorationSpeed: 0.05

            }

        },

        {
            level: 3,

            name: "戰術感測器",

            price: 3500,

            effectDescription:
                "探索速度 +10%。",

            effects: {

                 explorationSpeed: 0.10

            }

        },

        {
            level: 4,

            name: "多光譜偵測陣列",

            price: 15000,

            effectDescription:
                "探索速度 +15%，特殊事件機率 +2%",

            effects: {

                explorationSpeed: 0.15,

				specialEventChance: 0.02

            }

        },

        {
            level: 5,

            name: "舊文明探索 AI",

            price: 60000,

            effectDescription:
                "探索速度 +20%，特殊事件機率 +5%",

            effects: {

                explorationSpeed: 0.20,

				specialEventChance: 0.05

            }

        }

    ]

},

{
    id: "exoskeleton",

    name: "外骨骼",

    description:
        "利用舊時代軍規骨架與液壓結構改裝而成，大幅降低探索時的身體負擔。",

    levels: [

        {
            level: 1,

            name: "簡易支撐骨架",

            price: 0,

            effectDescription:
                "尚未完成改造。",

            effects: {

                lossReduction: 0

            }

        },

        {
            level: 2,

            name: "液壓助力骨架",

            price: 800,

            effectDescription:
                "事件損失降低 10%。",

            effects: {

                lossReduction: 0.10

            }

        },

        {
            level: 3,

            name: "工業型外骨骼",

            price: 3500,

            effectDescription:
                "事件損失降低 20%。",

            effects: {

                lossReduction: 0.20

            }

        },

        {
            level: 4,

            name: "軍規突擊外骨骼",

            price: 15000,

            effectDescription:
                "事件損失降低 30%，事件成功率 +5%。",

            effects: {

                lossReduction: 0.30,

                eventSuccessBonus: 0.05

            }

        },

        {
            level: 5,

            name: "鈦合金動力裝甲",

            price: 60000,

            effectDescription:
                "事件損失降低 40%，事件成功率 +10%。",

            effects: {

                lossReduction: 0.40,

                eventSuccessBonus: 0.10

            }

        }

    ]

},

];
//========================
// 黑市特殊商品資料
//========================
const specialShopItems = [

    {
        id:
            "stellarEnergyModule",

        name:
            "恆星級能源模組",

        price:
            1200000000,

        description:
            "舊文明時代最高規格的能源核心。" +
            "在這資源逐漸匱乏的世界中，" +
            "仍能完整運作的模組已經極為罕見。",

        purpose:
            "足以重新啟動一座因能源耗盡而廢棄的深潛站。"

    }

];