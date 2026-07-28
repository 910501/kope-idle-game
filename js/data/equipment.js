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