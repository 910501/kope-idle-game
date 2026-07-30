// ========================================
// Area 2 Events - 廢棄街區
// ========================================

const area2Events = [

    //====================
    // 第二區事件1：故障的服務機器人
    //====================
    {
        id: "residential_service_robot",
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
    // 第二區事件2：坍塌公寓的求救燈
    //====================
	 {
        id: "residential_signal_light",
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
    //第二區事件3：廢土客留下的記號
    //====================
  {
        id: "residential_marks",
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
                    log: "附近只有幾串早已被鏽霧抹去的腳印，找不到任何人的蹤跡。",
                    rewards: []
                }
            }
        ]
    },
	
];