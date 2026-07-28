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
            "一台老舊的服務機器人倒在瓦礫旁。" +
            "它的投影裝置反覆閃爍，似乎還保存著某些資料。",
        areaIds: [2],
        options: [
            {
                text: "嘗試重新啟動",
                successChance: 0.65,
                success: {
                    log: "機器人恢復運作，投射出一組座標——那裡似乎藏著一批尚未被回收的稀有物資！",
                    rewards: [
                        {
                            material: "rareSupplyMap",
                            amount: 1,
                            chance: 0.25,
                            maxOwned: 1,
                            log:"科佩記下了其中一處特別清晰的座標，這份資料或許能在之後派上用場。"
                        },
                        {
                            material: "scrap",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "wire",
                            min: 1,
                            max: 3,
                            chance: 0.8
                        }
                    ]
                },
                failure: {
                    log: "機器人發出一串無法辨識的提示音，隨後再次停止運作。",
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
            {
                text: "檢查記憶模組",
                successChance: 0.45,
                success: {
                    log: "科佩從損壞的記憶模組中讀出一段加密資料，裡面藏著一道通往地下設施的認證秘鑰。",
                    rewards: [
                        {
                            material: "undergroundKey",
                            amount: 1,
                            chance: 0.2,
                            maxOwned: 1,
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.5
                        },
                        {
                            material: "wire",
                            min: 1,
                            max: 2,
                            chance: 1
                        }
                    ]
                },
                failure: {
                    log: "記憶模組的資料早已嚴重損壞，只能拆出一些普通零件。",
                    rewards: [
                        {
                            material: "wire",
                            min: 1,
                            max: 2,
                            chance: 1
                        },
                        {
                            material: "scrap",
                            min: 1,
                            max: 3,
                            chance: 1
                        }
                    ]
                }
            },
            {
                text: "拆解可用零件",
                successChance: 0.9,
                success: {
                    log: "科佩熟練地拆下機器人的外殼與內部零件。",
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
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.25
                        }
                    ]
                },
                failure: {
                    log: "機器人的自毀程序突然啟動，大部分零件在火花中燒毀。",
                    rewards: [
                        {
                            material: "scrap",
                            min: 1,
                            max: 2,
                            chance: 1
                        }
                    ]
                }
            }
        ]
    },
	//====================
    // 事件 3：閃爍的標誌牌
    //====================
	{
        id: 3,
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
    // 事件 4：霧潮後的裂縫
    //====================
    {
        id: 4,
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
	//====================
    // 事件 5：坍塌公寓的求救燈
    //====================
	 {
        id: 5,
        title: "坍塌公寓的求救燈",
        description:
            "半座公寓陷在碎石之中，一盞紅色求救燈仍從高處規律閃爍。" +
            "訊號看起來不像自然故障，但建築隨時可能再次坍塌。",
        areaIds: [2],
        options: [
            {
                text: "進入建築調查",
                successChance: 0.6,
                success: {
                    log: "科佩循著燈光找到一間密封儲藏室，裡面的物資幸運地避開了風化。",
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
                            max: 3,
                            chance: 0.75
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.3
                        }
                    ]
                },
                failure: {
                    log: "抵達那盞燈所在樓層時腳底的樓板突然塌落，科佩只來得及從入口附近抓走幾件物資。",
                    rewards: [
                        {
                            material: "polymer",
                            min: 1,
                            max: 2,
                            chance: 1
                        },
                        {
                            material: "scrap",
                            amount: 1,
                            chance: 0.6
                        }
                    ]
                }
            },
            {
                text: "從外部切斷求救燈",
                successChance: 0.85,
                success: {
                    log: "求救燈並不是用來呼救，而是舊式物資櫃的定位訊號。科佩順利找到了它。",
                    rewards: [
                        {
                            material: "wire",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "battery",
                            amount: 1,
                            chance: 0.55
                        },
                        {
                            material: "circuit",
                            amount: 1,
                            chance: 0.25
                        }
                    ]
                },
                failure: {
                    log: "求救燈在拆卸時短路，只留下燒焦的電線與外殼。",
                    rewards: [
                        {
                            material: "wire",
                            min: 1,
                            max: 2,
                            chance: 1
                        },
                        {
                            material: "scrap",
                            amount: 1,
                            chance: 1
                        }
                    ]
                }
            },
            {
                text: "朝燈光回應訊號",
                successChance: 0.4,
                success: {
                    log: "紅燈短暫改變了閃爍節奏，接著附近牆面彈出一只隱藏式補給盒。",
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
                    log: "紅燈完全沒有回應。科佩沉默幾秒後，堅稱一定是自己的發音不夠標準。",
                    rewards: []
                }
            }
        ]
    },
	//====================
    // 事件 6：廢土客留下的記號
    //====================
  {
        id: 6,
        title: "廢土客留下的記號",
        description:
            "牆面上畫著一串只有廢土探索者才看得懂的符號。" +
            "其中一個箭頭指向暗巷深處，但旁邊又被人補上了一個代表危險的叉號。",
        areaIds: [2],
        options: [
            {
                text: "沿著箭頭前進",
                successChance: 0.45,
                success: {
                    log: "箭頭通往一處被遺忘的物資藏點，看來原主人始終沒有回來。",
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
                    log: "暗巷盡頭只有一處早已被搜刮乾淨的藏點。那個叉號顯然是後來的人留下的。",
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
                text: "解讀周圍的其他符號",
                successChance: 0.75,
                success: {
                    log: "科佩發現叉號並非警告，而是代表『入口已封閉』。真正的藏點就在隔壁建築。",
                    rewards: [
                        {
                            material: "filterFiber",
                            min: 1,
                            max: 3,
                            chance: 1
                        },
                        {
                            material: "polymer",
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
                    log: "符號年代與畫法彼此矛盾。科佩研究半天，只確定其中一個符號可能是在抱怨天氣。",
                    rewards: []
                }
            },
            {
                text: "搜尋留下記號的人",
                successChance: 0.5,
                success: {
                    log: "科佩沒有找到記號的主人，卻在附近發現對方匆忙遺落的工具袋。",
                    rewards: [
                        {
                            material: "wire",
                            min: 2,
                            max: 4,
                            chance: 1
                        },
                        {
                            material: "scrap",
                            min: 2,
                            max: 5,
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
                    log: "附近只有幾串早已被霧潮抹去的腳印，找不到任何人的蹤跡。",
                    rewards: []
                }
            }
        ]
    },
	
    //==================================================
    // 事件 7：仍可運作的販賣機
    //==================================================

    {
        id: 7,
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
	// 事件 8：沉睡的自動保全
    {
        id: 8,
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
	// 事件 9：封閉倉庫的廣播
    {
        id: 9,
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

    // 事件 10：回音中的腳步聲

    {
        id: 10,
        title: "回音中的腳步聲",
        description:
            "空蕩的工廠走廊不斷傳來腳步聲，卻始終看不見任何移動物體。" +
            "科佩停下腳步後，那陣聲音也跟著停止了。",
        areaIds: [4],
        options: [
            {
                text: "循著聲音前進",
                successChance: 0.45,
                success: {
                    log: "腳步聲只是通風管造成的共鳴。盡頭藏著一間維修室，裡面的工具箱尚未被翻動。",
                    rewards: [
                        { material: "scrap", min: 4, max: 8, chance: 1 },
                        { material: "circuit", min: 1, max: 2, chance: 0.8 },
                        { material: "battery", amount: 1, chance: 0.5 },
                        {
    money:{
        min:10,
        max:40
    },
    chance:0.1,

    log:"角落散落著幾枚匿名儲值晶片。"
}
                    ]
                },
                failure: {
                    log: "聲音突然消失，科佩繞了半天又回到原地。",
                    rewards: [
                        { material: "wire", min: 1, max: 3, chance: 1 }
                    ]
                }
            },
            {
                text: "檢查牆壁與管線",
                successChance: 0.8,
                success: {
                    log: "牆內藏著一條維修通道，裡面遺留不少工程物資。",
                    rewards: [
                        { material: "wire", min: 3, max: 6, chance: 1 },
                        { material: "battery", amount: 1, chance: 0.6 },
                        { material: "circuit", amount: 1, chance: 0.4 }
                    ]
                },
                failure: {
                    log: "只有滿地灰塵，科佩拍了拍衣服便離開。",
                    rewards: []
                }
            },
            {
                text: "當作沒聽見",
                successChance: 1,
                success: {
                    log: "科佩表示：『電影都是這樣開始的，我不上當。』",
                    rewards: []
                },
                failure: { log: "", rewards: [] }
            }
        ]
    },
	// 事件 11：淹水的維修節點
    {
        id: 11,
        title: "淹水的維修節點",
        description:
            "一座大型配電站被積水淹沒，仍有微弱電流在水面跳動。" +
            "中央控制箱似乎還能運作。",
        areaIds: [4],
        options: [
            {
                text: "切斷電源",
                successChance: 0.75,
                success: {
                    log: "科佩成功關閉供電，整座維修站恢復安全。你們仔細搜索了一陣，帶走尚未被水淹壞的材料",
                    rewards: [
                        { material: "battery", min: 1, max: 2, chance: 1 },
                        { material: "wire", min: 3, max: 5, chance: 1 },
                        { material: "circuit", min: 1, max: 2, chance: 0.7 }
                    ]
                },
                failure: {
                    log: "控制器完全失靈，只好拆些還能用的零件。",
                    rewards: [
                        { material: "wire", min: 2, max: 4, chance: 1 }
                    ]
                }
            },
            {
                text: "涉水進入",
                successChance: 0.4,
                success: {
                    log: "走了一段路後科佩踢到什麼，大聲叫嚷。"+
					"積水下藏著一個密封工具箱，裡面的能源模組保存良好。",
                    rewards: [
                        { material: "battery", min: 2, max: 3, chance: 1 },
                        { material: "circuit", min: 2, max: 3, chance: 0.8 },
                        {
    money:{
        min:20,
        max:50
    },
    chance:0.1,

    log:"角落散落著幾枚匿名儲值晶片。"
}
                    ]
                },
                failure: {
                    log: "防護靴的絕緣層有破損，一入水腳底就傳來酥麻感。"+
					"科佩立刻退了回來，幸好沒有踩到帶電區域。",
                    rewards: [
                        { material: "scrap", min: 1, max: 2, chance: 1 }
                    ]
                }
            },
            {
                text: "拆除控制箱",
                successChance: 0.65,
                success: {
                    log: "控制箱裡有不少仍可使用的電子零件。",
                    rewards: [
                        { material: "circuit", min: 2, max: 4, chance: 1 },
                        { material: "wire", min: 2, max: 4, chance: 1 },
                        { material: "battery", amount: 1, chance: 0.5 }
                    ]
                },
                failure: {
                    log: "控制箱因年代久遠而完全碎裂，只回收幾塊廢鐵。",
                    rewards: [
                        { material: "scrap", min: 2, max: 4, chance: 1 }
                    ]
                }
            }
        ]
    },
	// 事件 12：封死的列車車廂
    {
    id: 12,
    title: "封死的列車車廂",
    description:
        "一列停駛兩百多年的地下列車靜靜橫臥在軌道上。" +
        "大部分車門早已鏽死，唯獨最後一節車廂仍維持著完整的密封狀態。",

    areaIds: [4],

    options: [

        {
            text: "強行打開車門",
            successChance: 0.50,

            success: {
                log: "隨著一聲刺耳的金屬摩擦聲，車門終於被撬開。"+
				"科佩仔細搜索後，居然還找到幾件保存良好的旅客物品。",
                rewards: [
                    { material: "foodPack", min: 2, max: 5, chance: 1 },
                    { material: "battery", amount: 1, chance: 0.5 },
                    { material: "polymer", min: 2, max: 4, chance: 0.8 }
                ]
            },

            failure: {
                log: "科佩折騰了半天，車門連一毫米都沒移動。"+
				"最後他靠在門邊喘了口氣，拍拍車廂「行吧，你贏了。希望下一位比我有力氣。」",
                rewards: [
                    { material: "scrap", min: 1, max: 3, chance: 1 }
                ]
            }
        },

        {
            text: "從車頂進入",
            successChance: 0.75,

            success: {
                log: "通風口比想像中寬敞。科佩滑進車廂後，腳下揚起一層厚厚灰塵。"+
				"『看來幾百年沒人搶先一步。』",
                rewards: [
                    { material: "foodPack", min: 3, max: 6, chance: 1 },
                    { material: "battery", min: 1, max: 2, chance: 0.7 },
                    { material: "circuit", amount: 1, chance: 0.6 }
                ]
            },

            failure: {
                log: "科佩才剛探頭進去，就被卡在通風管裡動彈不得。折騰好一會才狼狽地爬回來。"
				+"他拍掉身上的灰塵，若無其事地說：『剛才是在確認裡面的空氣品質。』",
                rewards: []
            }
        },

        {
            text: "拆除列車設備",
            successChance: 0.85,

            success: {
                log: "既然進不去，科佩索性把目標放到列車本身。"+
				"沒多久便拆下一組完整的供電模組，甚至還順手拔了幾塊保存不錯的控制板。「這趟至少沒白跑。」",
                rewards: [
                    { material: "wire", min: 3, max: 6, chance: 1 },
                    { material: "battery", min: 1, max: 2, chance: 1 },
                    { material: "circuit", min: 1, max: 2, chance: 0.8 }
                ]
            },

            failure: {
                log: "拆到一半，整塊設備突然在手裡化成鏽粉。"+
				"科佩沉默了兩秒，把工具收回背包：「……它只是想用自己的方式退休。」",
                rewards: [
                    { material: "scrap", min: 1, max: 3, chance: 1 }
                ]
            }
        }
    ]
},
	// 事件 13：仍在運作的研究AI
{
    id: 13,
    title: "仍在運作的研究AI",
    description:
        "一座研究終端感應到生命體接近而自行亮起。" +
        "柔和的女性電子音傳來：「歡迎回來，研究員。」",

    areaIds: [5],

    options: [

        {
            text: "回答AI",

            successChance: 0.65,

            success: {

                log:
                "科佩清了清喉嚨，一本正經地回了一句：「嗯……今天也辛苦了。」" +
                "AI安靜了兩秒。" +
                "「身份驗證完成，歡迎回來。」" +
                "「……等等，還真的成功？」" +
                "終端緩緩打開，一旁的保管櫃也跟著解除鎖定。",

                rewards:[
                    {material:"circuit",min:2,max:4,chance:1},
                    {material:"battery",min:1,max:2,chance:1},
                    {material:"researchData",amount:1,chance:0.6},
                    {
    money:{
        min:20,
        max:40
    },
    chance:0.1,

    log:"角落散落著幾枚匿名儲值晶片。"
}
                ]
            },

            failure:{

                log:
                "AI停頓了片刻。" +
                "「聲紋不符。」" +
                "下一秒整間研究室響起刺耳的警報。" +
                "科佩轉身就跑。「我就知道！電影都這樣演！」" ,

                rewards:[
                    {material:"wire",min:1,max:2,chance:1}
                ]
            }

        },

        {

            text:"直接拆終端",

            successChance:0.85,

            success:{

                log:
                "「科技看不懂沒關係，拆下來總有人懂。」" +
                "科佩熟練地拆開外殼，還真的找到不少仍可使用的模組。",

                rewards:[
                    {material:"circuit",min:2,max:4,chance:1},
                    {material:"battery",min:1,max:2,chance:1}
                ]
            },

            failure:{

                log:
                "外殼才剛打開，裡面的零件就在空氣中迅速氧化。" +
                "科佩看著手上的金屬粉末，默默把工具收了回去。",

                rewards:[
                    {material:"scrap",min:2,max:4,chance:1}
                ]
            }

        }

    ]
},
	// 事件 14：空蕩的培養槽
	{
    id: 14,
    title: "空蕩的培養槽",
    description:
        "一整排培養槽仍維持著微弱供電，玻璃內壁殘留著乾涸的痕跡。" +
        "唯獨中央那座培養槽的艙門敞開著，裡面什麼都沒有。",

    areaIds: [5],

    options: [

        {
            text: "檢查培養槽",

            successChance: 0.3,

            success: {

                log:
                "培養槽底部散落著幾枚資料晶片，玻璃內側還留著數道深深的抓痕。"+
				"科佩沉默地看了一會兒，只低聲說了句：「……希望他活著離開了。」",

                rewards:[
                    {material:"researchData",amount:1,chance:0.8},
                    {material:"circuit",min:1,max:3,chance:1},
                    {
    money:{
        min:20,
        max:40
    },
    chance:0.1,

    log:"角落散落著幾枚匿名儲值晶片。"
}
                ]
            },

            failure:{

                log:
                "除了早已乾涸的培養液，什麼也沒有留下。"+
				"科佩輕輕關上艙門，像是不想再打擾這裡的寂靜。 ",

                rewards:[
                    {material:"polymer",min:1,max:2,chance:1}
                ]
            }

        },

        {

            text:"搜尋控制台",

            successChance:0.8,

            success:{

                log:
                "控制台居然還能啟動，一段殘缺的研究紀錄被成功保存下來。"+
				"科佩笑了笑：「至少有人留下了答案。」",

                rewards:[
                    {material:"researchData",amount:1,chance:1},
                    {material:"battery",amount:1,chance:0.6},
                    {material:"circuit",amount:1,chance:0.5}
                ]
            },

            failure:{

                log:
                "螢幕閃爍幾下便徹底熄滅，只剩自己的倒影映在玻璃上。科佩聳了聳肩：「看來它也累了。」",

                rewards:[]
            }

        },

        {

            text:"離開這裡",

            successChance:1,

            success:{

                log:
                "科佩最後回頭看了一眼那座空蕩的培養槽，沒有多說什麼，只是默默加快了腳步。",

                rewards:[]
            },

            failure:{log:"",rewards:[]}

        }

    ]
},
	// 事件 15：最後的辦公室
{
    id: 15,
    title: "最後的辦公室",
    description:
        "辦公室潔淨得近乎異常，透明資訊面板仍懸浮在半空，桌面的全息投影安靜循環著未完成的工作流程。" +
		"彷彿主人只是暫時離開座位，下一秒就會推門回來。",

    areaIds: [5],

    options: [

        {
            text:"閱讀工作紀錄",

            successChance:0.75,

            success:{
				log:
				"科佩輕觸桌面的全息介面，一封待簽核的研究報告緩緩展開。"+
				"最後的送出時間停留在兩百年前，他沉默了一會，將資料備份了下來。",

                rewards:[
                    {material:"researchData",amount:1,chance:1},
                    {
    money:{
        min:20,
        max:40
    },
    chance:0.1,

    log:"角落散落著幾枚匿名儲值晶片。"
}
                ]
            },

            failure: {

		log:
		"科佩試著啟動全息介面，畫面卻只閃過幾行無法辨識的亂碼，最後徹底熄滅。",

    rewards:[
        {material:"circuit",min:1,max:2,chance:1},
        {material:"wire",min:1,max:2,chance:0.7}
    ]

}

        },

        {

            text:"搜尋抽屜",

            successChance:0.65,

            success:{

               log:
				"抽屜自動辨識到生命訊號後緩緩滑開，裡面的緊急補給與資料模組仍維持真空封存。"+
				"科佩吹了聲口哨：「舊文明的保鮮技術，我給滿分。」",

                rewards:[
                    {material:"foodPack",min:2,max:4,chance:1},
                    {material:"battery",amount:1,chance:0.6},
                    {material:"circuit",amount:1,chance:0.5}
                ]
            },

            failure:{

                log:
                "抽屜全都鎖得死死的，折騰半天也沒能打開。科佩揉了揉發酸的手腕：「看來這位主管很重視資訊安全。」",

                rewards:[
                    {material:"scrap",min:1,max:3,chance:1}
                ]
            }

        },

        {

            text:"坐上主管座位",

            successChance:0.65,

            success:{

               log:
				"科佩剛坐下，辦公桌便自動亮起，周圍浮現十幾面等待簽核的全息視窗。"+
				"他還沒來得及得意，椅子就因多年失修突然傾斜，害他手忙腳亂地關掉整片投影。",

                rewards:[
                    {material:"researchData",amount:1,chance:0.7},
                    {
    money:{
        min:20,
        max:40
    },
    chance:0.1,

    log:"角落散落著幾枚匿名儲值晶片。"
}
                ]
            },

            failure:{

                log:
                "辦公椅只是發出一陣令人牙酸的嘎吱聲，科佩立刻站了起來。"+
				"「嗯……它看起來比我還累，就不勉強它了。」",

                rewards:[]
            }

        }

    ]
},
]
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