// ========================================
// Area 1 Events - 外圍廢墟
// ========================================

const area1Events = [

    //====================
    // 第一區事件1：半埋的工具箱
    //====================
    {
        id: "ruins_toolbox",

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
    // 第一區事件2：閃爍的標誌牌
    //====================
	{
        id: "ruins_sign",
        title: "閃爍的標誌牌",
        description:
            "一面傾倒的舊時代道路標誌仍亮著微弱燈光。" +
            "面板下方不時傳出電流聲，科佩宣稱它正在對自己眨眼。",
        areaIds: [1],
        options: [
            {
                text: "拆下供電模組",
                successChance: 0.75,
                success: {
                    log: "科佩切斷殘餘電流，完整取下了標誌牌的供電模組。",
                    rewards: [
                        { material: "wire", min: 2, max: 4, chance: 1 },
                        { material: "battery", amount: 1, chance: 0.35 },
                        { material: "circuit", amount: 1, chance: 0.12 }
                    ]
                },
                failure: {
                    log: "標誌牌忽然迴光返照般爆出火花，只剩幾段勉強可用的導線。",
                    rewards: [
                        { material: "wire", min: 1, max: 2, chance: 1 },
                        { material: "scrap", amount: 1, chance: 0.6 }
                    ]
                }
            },
            {
                text: "讀取殘留路線",
                successChance: 0.4,
                success: {
                    log: "殘缺的路線圖短暫亮起，標出附近一處尚未完全坍塌的回收點。",
                    rewards: [
                        { material: "scrap", min: 3, max: 6, chance: 1 },
                        { material: "polymer", min: 1, max: 2, chance: 0.7 },
                        { material: "filterFiber", amount: 1, chance: 0.2 }
                    ]
                },
                failure: {
                    log: "面板只播放了一段三百年前的道路施工公告，科佩仍很有禮貌地看完了。",
                    rewards: []
                }
            },
            {
                text: "不要碰會發光的東西",
                successChance: 1,
                success: {
                    log: "科佩表示這項決定非常成熟，然後一步三回頭地離開。",
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
    // 第一區事件3：霧潮後的裂縫
    //====================
    {
        id:"ruins_crack",
        title: "霧潮後的裂縫",
        description:
            "退去的銹霧在牆面下切割出一道狹窄裂縫。" +
            "裡面卡著幾只密封袋，但牆體正發出令人不安的碎裂聲。",
        areaIds: [1],
        options: [
            {
                text: "迅速伸手取出",
                successChance: 0.6,
                success: {
                    log: "科佩趕在碎石落下前拖出密封袋，還順手接住一塊掉落的金屬。",
                    rewards: [
                        { material: "polymer", min: 2, max: 4, chance: 1 },
                        { material: "filterFiber", min: 1, max: 2, chance: 0.45 },
                        { material: "scrap", min: 1, max: 3, chance: 1 }
                    ]
                },
                failure: {
                    log: "裂縫在伸手時坍塌，科佩只搶救出一小片密封材料。",
                    rewards: [
                        { material: "polymer", amount: 1, chance: 1 }
                    ]
                }
            },
            {
                text: "先支撐牆體",
                successChance: 0.85,
                success: {
                    log: "臨時支架撐住了牆面，直到科佩安全清理完整個夾層。",
                    rewards: [
                        { material: "polymer", min: 2, max: 5, chance: 1 },
                        { material: "filterFiber", min: 1, max: 2, chance: 0.7 },
                        { material: "wire", min: 1, max: 2, chance: 0.6 }
                    ]
                },
                failure: {
                    log: "支架選中了一個很有個性的角度倒下，幸好科佩及時退開。",
                    rewards: [
                        { material: "scrap", min: 1, max: 2, chance: 1 }
                    ]
                }
            },
            {
                text: "標記位置後離開",
                successChance: 1,
                success: {
                    log: "科佩在地圖上畫了一顆星，旁邊註記：『先等它塌完。』",
                    rewards: []
                },
                failure: {
                    log: "",
                    rewards: []
                }
            }
        ]
    },
	
	
];