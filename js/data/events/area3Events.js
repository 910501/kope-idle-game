// ========================================
// Area 3 Events - 舊商場
// ========================================

const area3Events = [

    //==================================================
    // 第三區事件1：仍可運作的販賣機
    //==================================================

    {
        id: "mall_vending_machine",
        title: "仍可運作的販賣機",
        description:
            "一台舊時代販賣機孤零零地立在倒塌的商店前。" +
            "螢幕顯示著模糊的商品圖示，投幣口則不斷發出低沉的運轉聲。",
        areaIds: [3],
        options: [
            {
                text: "嘗試啟動販賣程序",
                successChance: 0.65,
                success: {
                    log: "販賣機發出一段過度熱情的歡迎語音，接著吐出了幾包保存完好的合成食品。",
                    rewards: [
                        {
                            material: "foodPack",
                            min: 2,
                            max: 5,
                            chance: 1
                        },
                        {
                            material: "filterFiber",
                            min: 1,
                            max: 3,
                            chance: 0.1
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.05
                        }
                    ]
                },
                failure: {
                    log: "螢幕顯示交易失敗，卻仍從退幣口掉出了一些奇怪的零件。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 1,
                            max: 3,
                            chance: 1
                        },
                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.55
                        }
                    ]
                }
            },
            {
                text: "撬開補貨艙",
                successChance: 0.5,
                success: {
                    log: "補貨艙的鎖已經鏽蝕，科佩稍微用力便打開了它。",
                    rewards: [
                        {
                            material: "foodPack",
                            min: 3,
                            max: 6,
                            chance: 1
                        },
                        {
                            material: "filterFiber",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.2
                        }
                    ]
                },
                failure: {
                    log: "販賣機的防盜裝置突然鎖死補貨艙，科佩只能拆走外部零件。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "wire",
                            min: 1,
                            max: 2,
                            chance: 1
                        }
                    ]
                }
            },
            {
                text: "拆除控制面板",
                successChance: 0.5,
                success: {
                    log: "科佩完整拆下控制面板，裡面的線路與晶片仍有回收價值。",
                    rewards: [
                        {
                            material: "wire",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.45
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.35
                        }
                    ]
                },
                failure: {
                    log: "面板內部早已受潮，只剩下一些腐蝕的導線。",
                    rewards: [
                        {
                            material: "wire",
                            min: 1,
                            max: 2,
                            chance: 1
                        }
                    ]
                }
            }
        ]
    },
	
	// 第三區事件2：沉睡的自動保全
    {
        id: "mall_security_robot",
        title: "沉睡的自動保全",
        description:
            "一台重型保全機器倒在設施入口。" +
            "它的感應器偶爾亮起紅光，像是在休眠與警戒之間反覆掙扎。",
        areaIds: [3],
        options: [
            {
                text: "關閉保全系統",
                successChance: 0.5,
                success: {
                    log: "科佩成功關閉保全系統，機器的裝甲與內部零件現在都能安全拆取。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 4,
                            max: 7,
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
                            min: 1,
                            max: 2,
                            chance: 0.45
                        }
                    ]
                },
                failure: {
                    log: "保全機器突然啟動警戒模式，科佩在它完全甦醒前迅速撤離。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 1,
                            max: 2,
                            chance: 1
                        }
                    ]
                }
            },
            {
                text: "偽造維修指令",
                successChance: 0.7,
                success: {
                    log: "保全機器接受了維修指令，主動打開外殼並彈出故障零件。",
                    rewards: [
                        {
                            material: "circuit",
                            min: 1,
                            max: 2,
                            chance: 1
                        },
                        {
                            material: "wire",
                            min: 2,
                            max: 5,
                            chance: 1
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.45
                        }
                    ]
                },
                failure: {
                    log: "系統識破了偽造指令，並播放一段嚴厲的維修資格警告。",
                    rewards: [
                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.65
                        }
                    ]
                }
            },
            {
                text: "從遠處拆卸外部裝甲",
                successChance: 0.9,
                success: {
                    log: "科佩利用長工具拆下幾塊外部裝甲，全程避開了機器的感應範圍。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 3,
                            max: 6,
                            chance: 1
                        },
                        {
                            material: "polymer",
                            min: 1,
                            max: 3,
                            chance: 0.7
                        }
                    ]
                },
                failure: {
                    log: "其中一塊裝甲突然掉落，發出的巨響讓保全機器重新亮起紅光。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 1,
                            max: 3,
                            chance: 1
                        }
                    ]
                }
            }
        ]
    },
	// 第三區事件3：封閉倉庫的廣播
    {
        id: "mall_broadcast",
        title: "封閉倉庫的廣播",
        description:
            "一座封閉倉庫內傳出反覆播放的廣播。" +
            "語音要求工作人員立即領取滯留貨物，但倉庫大門早已被鏽蝕的鎖具封死。",
        areaIds: [3],
        options: [
            {
                text: "破解大門控制器",
                successChance: 0.6,
                success: {
                    log: "控制器接受了科佩輸入的舊式指令，沉重的大門緩緩向兩側開啟。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 4,
                            max: 8,
                            chance: 1
                        },
                        {
                            material: "polymer",
                            min: 2,
                            max: 5,
                            chance: 1
                        },
                        {
                            material: "filterFiber",
                            min: 1,
                            max: 3,
                            chance: 0.8
                        }
                    ]
                },
                failure: {
                    log: "控制器在最後一步重新鎖定，只有面板外殼被成功拆下。",
                    rewards: [
                        {
                            material: "wire",
                            min: 1,
                            max: 3,
                            chance: 1
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.15
                        }
                    ]
                }
            },
            {
                text: "尋找通風管道",
                successChance: 0.75,
                success: {
                    log: "科佩從破損的通風管鑽進倉庫，裡面仍堆放著不少密封貨物。",
                    rewards: [
                        {
                            material: "polymer",
                            min: 3,
                            max: 6,
                            chance: 1
                        },
                        {
                            material: "filterFiber",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.25
                        }
                    ]
                },
                failure: {
                    log: "通風管道在半路完全堵塞，科佩只從縫隙裡勾出了一小包材料。",
                    rewards: [
                        {
                            material: "filterFiber",
                            min: 1,
                            max: 2,
                            chance: 1
                        },
                        {
                            material: "polymer",
                            amount: 1,
                            chance: 0.6
                        }
                    ]
                }
            },
            {
                text: "拆除廣播設備",
                successChance: 0.85,
                success: {
                    log: "廣播終於停止重複播放。整個區域瞬間安靜得令人感動，然後又被某個吵鬧廢土客的聲音覆蓋。",
                    rewards: [
                        {
                            material: "wire",
                            min: 2,
                            max: 5,
                            chance: 1
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.5
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.3
                        }
                    ]
                },
                failure: {
                    log: "廣播設備的外殼突然脫落，但內部線路已經燒毀。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 1,
                            max: 3,
                            chance: 1
                        },
                        {
                            material: "wire",
                            amount: 1,
                            chance: 0.5
                        }
                    ]
                }
            }
        ]
    },
//==================================================
// 第三區事件4：保全巡邏
//==================================================

{
    id: "mall_security_patrol",
    title: "保全巡邏",
    description:
        "遠處傳來規律的機械腳步聲，一支巡邏中的保全智械正緩緩接近。" +
        "它的掃描光束不斷掠過商場走廊，似乎仍忠實執行著兩百年前的勤務。",

    areaIds: [3],

    options: [

        {
            text: "躲進店鋪等待",

            successChance: 0.75,

            success: {
                log:
                    "保全智械沒有發現你，遵循巡邏路線逐漸遠去。" +
                    "科佩探出頭左右張望：「好耶，免費驚悚電影結束！」",

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
                        chance: 0.7
                    }

                ]
            },

            failure: {

    log:
        "其中一台智械掃描到你的背包，震盪彈擦過牆面。" +
        "逃跑途中掉落了部分回收物資。",
equipmentLog: {

        exoskeleton:
        "液壓骨架替你穩住了身形，你成功保住了部分物資。",
},
    rewards: [

        {
            material: "wire",
            min: -5,
            max: -2
        },

        {
            material: "scrap",
            min: -3,
            max: -1
        }

    ]

}

        },

        {
            text: "駭入巡邏系統",

            successChance: 0.45,

            success: {

                log:
                    "巡邏程式被科佩重新導向，保全智械列隊離開了商場。" +
                    "他得意地吹了聲口哨：「今天放你們提早下班。」",

                rewards: [

                    {
                        material: "circuit",
                        amount: 1,
                        chance: 0.7
                    },

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.45
                    },

                    {
                        money: {
                            min: 30,
                            max: 70
                        },
                        chance: 0.15,
                        log: "終端裡殘留著一筆尚未領取的巡檢補助。"
                    }

                ]

            },

            failure: {

                log:
                    "警報瞬間響遍整座商場。" +
                    "科佩拉著你一路狂奔：「下次我先看說明書！」",

                rewards: [

                    {
                        money: {
                            min: -120,
                            max: -60
                        }
                    }

                ]

            }

        },

        {
            text: "拆除感應器",

            successChance: 0.6,

            success: {

                log:
                    "感應器順利拆下，巡邏智械像失去方向般停在原地。",

                rewards: [

                    {
                        material: "sensor",
                        amount: 1,
                        chance: 1
                    },

                    {
                        material: "wire",
                        min: 2,
                        max: 4,
                        chance: 1
                    }

                ]

            },

            failure: {

                log:
                    "外殼突然彈開，破碎零件四處飛散。" +
                    "你急忙撤退，只來得及撿回背包。",

                rewards: [

                    {
                        material: "polymer",
                        min: -5,
						max: -2
                    }

                ]

            }

        }

    ]

},

//==================================================
// 第三區事件5：清潔機器人大軍
//==================================================

{
    id: "mall_cleaning_swarm",
    title: "清潔機器人大軍",

    description:
        "數十台清潔機器人突然從商場角落傾巢而出。" +
        "它們的螢幕同時亮起：『偵測到大型垃圾。開始清理。』",

    areaIds: [3],

    options: [

        {

            text: "立刻逃跑",

            successChance: 0.8,

            success: {

                log:
                    "你們衝進手扶梯殘骸間，清潔機器人逐漸放棄追逐。" +
                    "科佩回頭大喊：「我今天洗過澡啦！」",

                rewards: [

                    {
                        material: "scrap",
                        min: 2,
                        max: 4,
                        chance: 1
                    }

                ]

            },

            failure: {

                log:
        "幾台機器人撞上背包，把裡面的材料掃得到處都是。",
equipmentLog: {

        exoskeleton:
        "外骨骼穩住了背包固定架，沒有讓所有材料都散落出去。",
},
                rewards: [

                    {
                        material: "filterFiber",
                        min: -3,
						max: -1
                    },

                    {
                        material: "scrap",
                        min: -5,
						max: -2
                    }

                ]

            }

        },

        {

            text: "假裝維修人員",

            successChance: 0.65,

            success: {

                log:
                    "機器人將你識別為維護人員，甚至主動送來回收箱。" +
                    "科佩壓低聲音：「很好，演技又進步了。」",

                rewards: [

                    {
                        material: "filterFiber",
                        min: 2,
                        max: 4,
                        chance: 1
                    },

                    {
                        material: "polymer",
                        min: 1,
                        max: 3,
                        chance: 0.8
                    }

                ]

            },

            failure: {

                log:
                    "驗證程序失敗，所有機器人同時朝你逼近。" +
                    "逃離途中不得不丟下一些裝備減輕重量。",

                rewards: [

                    {
                        material: "polymer",
                        min: -3,
						max: -2
                    },

                    {
                        money: {
                            min: -80,
                            max: -40
                        }
                    }

                ]

            }

        },

        {

            text: "改寫清潔目標",

            successChance: 0.5,

            success: {

                log:
                    "清潔機器人立刻轉向附近的瓦礫堆。" +
                    "趁著它們忙碌，你順利搜尋了整個區域。",

                rewards: [

                    {
                        material: "wire",
                        min: 2,
                        max: 5,
                        chance: 1
                    },

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.35
                    },

                    {
                        material: "circuit",
                        amount: 1,
                        chance: 0.3
                    }

                ]

            },

            failure: {

                log:
                    "程式反而把你標記成最高優先級垃圾。" +
                    "科佩一邊跑一邊抗議：「我是可回收，不是不可燃！」",

                rewards: [

                    {
                        material: "wire",
                        min: -5,
						max: -2
                    },

                    {
                        material: "battery",
                        min: -4,
						max: -1
                    }

                ]

            }

        }

    ]

},

//==================================================
// 第三區事件6：維修無人機
//==================================================

{
    id: "mall_maintenance_drone",
    title: "維修無人機",

    description:
        "天花板傳來細微的馬達聲，一架維修無人機仍沿著預定路線巡視商場。" +
        "它拖著工具箱，不時停下修補早已沒有顧客的設施。",

    areaIds: [3],

    options: [

        {

            text: "跟著它前進",

            successChance: 0.8,

            success: {

                log:
                    "維修無人機帶你繞過坍塌區域，抵達一間尚未遭到破壞的設備間。" +
                    "科佩笑著說：「老員工就是可靠。」",

                rewards: [

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.5
                    },

                    {
                        material: "wire",
                        min: 2,
                        max: 5,
                        chance: 1
                    },

                    {
                        material: "metalPlate",
                        min: 1,
                        max: 3,
                        chance: 0.8
                    }

                ]

            },

            failure: {

                log:
                    "無人機突然鑽進狹窄的維修管道。" +
                    "你追不上，甚至途中遺失了一些回收材料。",

                rewards: [

                    {
                        material: "wire",
                        min: -3,
                        max: -1
                    }

                ]

            }

        },

        {

            text: "拆解無人機",

            successChance: 0.5,

            success: {

                log:
                    "拆解十分順利，完整保存了大部分核心零件。" +
                    "科佩滿意地收起工具：「抱歉啦，你的退休金我收下了。」",

                rewards: [

                    {
                        material: "motor",
                        amount: 1,
                        chance: 0.8
                    },

                    {
                        material: "circuit",
                        amount: 1,
                        chance: 0.7
                    },

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.4
                    }

                ]

            },

            failure: {

                log:
                    "安全機制瞬間啟動，工具箱在你面前炸成碎片。" +
                    "爆炸損毀了你回收的部分物資。",
			equipmentLog: {

        exoskeleton:
        "外骨骼擋下了飛散的金屬碎片，你只損失了一部分回收品。",
			},
                rewards: [

                    {
                        material: "metalPlate",
                        min: -2,
                        max: -1
                    },

                    {
                        money:{
                            min:-100,
                            max:-50
                        }

                    }

                ]

            }

        },

        {

            text: "請它協助維修裝備",

            successChance: 0.65,

            success: {

                log:
                    "無人機真的開始替你整理裝備，還順手補強了背包固定架。",

                rewards: [

                    {
                        material: "polymer",
                        min: 2,
                        max: 4,
                        chance: 1
                    },

                    {
                        material: "filterFiber",
                        min: 1,
                        max: 2,
                        chance: 0.7
                    }

                ]

            },

            failure: {

                log:
                    "它把你的背包誤判成待維修設備，開始拆解。" +
                    "科佩連忙把背包搶回來，但還是損失了一些零件。",

                rewards: [

                    {
                        material:"polymer",
                        min:-2,
                        max:-1
                    }

                ]

            }

        }

    ]

},

//==================================================
// 第三區事件7：商場封鎖程序
//==================================================

{
    id: "mall_lockdown",
    title: "商場封鎖程序",

    description:
        "刺耳的警報忽然響徹整座商場。" +
        "電子看板同步亮起：『緊急封鎖程序已啟動，請所有人員立即避難。』",

    areaIds:[3],

    options:[

        {

            text:"尋找緊急出口",

            successChance:0.75,

            success:{

                log:
                    "你依照避難指示成功離開封鎖區。" +
                    "途中還發現了一間被遺忘的員工休息室。",

                rewards:[

                    {
                        material:"foodPack",
                        min:1,
                        max:2,
                        chance:1
                    },

                    {
                        money:{
                            min:30,
                            max:80
                        },
                        chance:0.15,
                        log:"置物櫃裡還留著一些黑金晶片。"
                    }

                ]

            },

            failure:{

                log:
                    "厚重的防爆門提前落下。" +
                    "脫困過程損壞了部分裝備。",
				equipmentLog: {

        exoskeleton:
			"機械骨架替你撐住了沉重的防爆門，減少了裝備損壞。",
			 },
                rewards:[

                    {
                        material:"metalPlate",
                        min:-2,
                        max:-1
                    }

                ]

            }

        },

        {

            text:"駭入中央控制室",

            successChance:0.45,

            success:{

                log:
                    "封鎖程序解除，整層商場重新恢復供電。" +
                    "櫃檯裡還保留著不少可利用設備。",

                rewards:[

                    {
                        material:"circuit",
                        amount:1,
                        chance:0.8
                    },

                    {
                        material:"sensor",
                        amount:1,
                        chance:0.5
                    },

                    {
                        material:"battery",
                        amount:1,
                        chance:0.5
                    }

                ]

            },

            failure:{

                log:
                    "系統將你標記為入侵者。" +
                    "四周的自動砲塔開始展開搜尋。",

                rewards:[

                    {
                        money:{
                            min:-200,
                            max:-100
                        }

                    }

                ]

            }

        },

        {

            text:"躲進店鋪等待",

            successChance:0.65,

            success:{

                log:
                    "警報持續了許久才終於停止。" +
                    "封鎖解除後，你順手回收了不少散落物資。",

                rewards:[

                    {
                        material:"scrap",
                        min:3,
                        max:6,
                        chance:1
                    },

                    {
                        material:"wire",
                        min:2,
                        max:4,
                        chance:0.8
                    }

                ]

            },

            failure:{

                log:
                    "封鎖時間遠比預期更長。" +
                    "你只能消耗隨身補給撐過去。",

                rewards:[

                    {
                        material:"foodPack",
                        min:-2,
                        max:-1
                    }

                ]

            }

        }

    ]

},


];