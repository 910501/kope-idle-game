// ========================================
// Area 4 Events - 地下通道
// ========================================

const area4Events = [

	
    // 第四區事件1：回音中的腳步聲

    {
        id: "underground_footsteps",
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
	// 第四區事件2：淹水的維修節點
    {
        id: "underground_power",
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
	
	// 第四區事件3：封死的列車車廂
    {
    id: "underground_train",
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

//==================================================
// 第四區事件4：維修機械臂
//==================================================

{
    id: "underground_robot_arm",
    title: "維修機械臂",

    description:
        "一具固定在牆面的工業機械臂仍在運作，緩慢地搬運著散落的鋼材。" +
        "液壓裝置發出低沉的嗡鳴聲，彷彿仍在等待下一道工作指令。",

    areaIds: [4],

    options: [

        {

            text: "跟著它搬運的方向",

            successChance: 0.8,

            success: {

                log:
                    "機械臂一路清開障礙，露出後方被掩埋的維修區。" +
                    "科佩笑著說：「不用自己搬東西就是舒服。」",

                rewards: [

                    {
                        material: "metalPlate",
                        min: 2,
                        max: 4
                    },

                    {
                        material: "wire",
                        min: 2,
                        max: 5,
                        chance: 0.8
                    },

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.35
                    }

                ]

            },

            failure: {

                log:
                    "機械臂突然改變動作，你急忙閃避。" +
                    "背包卻被鋼筋勾住，掉落了一些物資。",

                rewards: [

                    {
                        material: "metalPlate",
                        min: -2,
                        max: -1
                    }

                ]

            }

        },

        {

            text: "拆解機械臂",

            successChance: 0.5,

            success: {

                log:
                    "科佩成功拆下驅動模組，大部分零件仍保持完整。" +
                    "他滿意地點點頭：「今天收穫不錯。」",

                rewards: [

                    {
                        material: "motor",
                        amount: 1,
                        chance: 0.8
                    },

                    {
                        material: "machineCore",
                        amount: 1,
                        chance: 0.25
                    },

                    {
                        material: "metalPlate",
                        min: 2,
                        max: 4
                    }

                ]

            },

            failure: {

                log:
                    "安全裝置重新啟動，機械臂猛然揮動。" +
                    "為了脫身，你們只好放棄部分回收物資。",

                rewards: [

                    {
                        material: "wire",
                        min: -3,
                        max: -1
                    },

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

            text: "重新校正系統",

            successChance: 0.65,

            success: {

                log:
                    "校正完成後，機械臂恢復穩定運作。" +
                    "它順手替你搬開一旁沉重的金屬箱。",

                rewards: [

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.6
                    },

                    {
                        material: "circuit",
                        amount: 1,
                        chance: 0.5
                    },

                    {
                        material: "metalPlate",
                        min: 1,
                        max: 3
                    }

                ]

            },

            failure: {

                log:
                    "校正失敗，機械臂停止運作。" +
                    "科佩聳了聳肩：「至少沒有把我們一起修掉。」",

                rewards: [

                    {
                        material: "circuit",
                        min: -1,
                        max: -1
                    }

                ]

            }

        }

    ]

},

//==================================================
// 第四區事件5：銹狼群
//==================================================

{
    id: "rustwolf_pack",

    title: "銹狼群",

    description:
        "遠處傳來金屬摩擦地面的聲音。數隻覆滿暗褐色金屬鱗片的銹狼，正低頭搜尋著什麼。",

    areaIds: [4],

    options: [

        {

            text: "繞過牠們",

            successChance: 0.8,

            success: {

                log:
                    "你順利避開狼群，在牠們離開後回收了一些散落零件。" +
                    "科佩壓低聲音：「今天就不跟牠們搶晚餐了。」",

                rewards: [

                    {
                        material: "metalPlate",
                        min: 2,
                        max: 4
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
                    "其中一隻銹狼發現了你。" +
                    "你雖然成功脫身，背包卻被利爪劃破。",

                rewards: [

                    {
                        material: "metalPlate",
                        min: -2,
                        max: -1
                    },

                    {
                        material: "polymer",
                        min: -2,
                        max: -1
                    }

                ]

            }

        },

        {

            text: "等待牠們離開",

            successChance: 0.7,

            success: {

                log:
                    "狼群嗅聞片刻後便離去，原地留下許多磨落的金屬鱗片。" +
                    "科佩蹲下撿起來：「這可是很好的材料。」",

                rewards: [

                    {
                        material: "metalPlate",
                        min: 3,
                        max: 5
                    }

                ]

            },

            failure: {

                log:
                    "等待太久，你錯過了安全通過的時機。" +
                    "只好繞遠路，多消耗了一些補給。",

                rewards: [

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

            text: "製造聲響引開牠們",

            successChance: 0.6,

            success: {

                log:
                    "遠處的落石聲成功吸引狼群。" +
                    "你們趁機穿過通道，還找到一個被掩埋的工具箱。",

                rewards: [

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.5
                    },

                    {
                        material: "wire",
                        min: 2,
                        max: 5
                    }

                ]

            },

            failure: {

                log:
                    "狼群瞬間察覺異常。" +
                    "科佩拉著你拔腿就跑，途中掉了一些零件。",

                rewards: [

                    {
                        material: "wire",
                        min: -3,
                        max: -1
                    }

                ]

            }

        }

    ]

},

//==================================================
// 第四區事件6：脈衝巢穴
//==================================================

{
    id: "pulse_nest",

    title: "脈衝巢穴",

    description:
        "牆面覆滿銀灰色奈米纖維，空氣中不時閃過細微電弧。幾隻脈衝類變異體靜靜伏在天花板上，彷彿正在感應周圍的電子訊號。",

    areaIds: [4],

    options: [

        {

            text: "關閉電子設備",

            successChance: 0.8,

            success: {

                log:
                    "電子訊號消失後，變異體逐漸失去興趣。" +
                    "科佩比了個安靜的手勢，兩人順利離開。",

                rewards: [

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.5
                    },

                    {
                        material: "circuit",
                        amount: 1,
                        chance: 0.6
                    }

                ]

            },

            failure: {

                log:
                    "殘留的電磁波仍驚動了牠們。" +
                    "逃離途中，一部分電子零件損壞了。",

                rewards: [

                    {
                        material: "circuit",
                        min: -1,
                        max: -1
                    }

                ]

            }

        },

        {

            text: "快速衝過",

            successChance: 0.6,

            success: {

                log:
                    "你趁著脈衝間隔一口氣衝過通道。" +
                    "牆角還留著一個未被發現的維修箱。",

                rewards: [

                    {
                        material: "battery",
                        amount: 1,
                        chance: 0.5
                    },

                    {
                        material: "motor",
                        amount: 1,
                        chance: 0.4
                    },

                    {
                        money: {
                            min: 40,
                            max: 120
                        },
                        chance: 0.2
                    }

                ]

            },

            failure: {

                log:
                    "強烈的電磁脈衝掃過全身。" +
                    "科佩甩了甩有些發麻的手臂：「頭髮全立起來了。」",

                rewards: [

                    {
                        material: "battery",
                        min: -1,
                        max: -1
                    },

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

            text: "觀察牠們",

            successChance: 0.7,

            success: {

                log:
                    "你發現牠們並非依靠視覺，而是在捕捉鏽霧中的擾動。" +
                    "這份觀察讓之後的探索更加順利。",

                rewards: [

                    {
                        material: "sensor",
                        amount: 1,
                        chance: 0.6
                    },

                    {
                        material: "circuit",
                        amount: 1,
                        chance: 0.5
                    }

                ]

            },

            failure: {

                log:
                    "停留太久，脈衝逐漸集中到你的方向。" +
                    "你們匆忙撤退，丟失了幾件回收品。",

                rewards: [

                    {
                        material: "wire",
                        min: -2,
                        max: -1
                    }

                ]

            }

        }

    ]

},

];