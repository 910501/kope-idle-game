const commonEvents = [
// 通用事件1 ：遺落的背包
{
    id: "common_backpack",

    title: "遺落的背包",

    description:
        "一個磨損的防水背包靠在牆角，拉鍊半開著，像是在等待下一位主人。",

    areaIds: [1,2,3,4,5],

    options: [

        {
            text: "打開檢查",

            successChance: 0.7,

            success: {

                log:
                    "背包裡還留著一些維修用品和備用零件。科佩一邊整理一邊笑道：「看來今天的午餐錢有著落了。」",

                rewards: [
                    { material:"wire", min:2, max:4, chance:1 },
                    { material:"polymer", min:1, max:2, chance:0.7 },
                    {
                        money:{ min:20, max:40 },
                        chance:0.15,
                        log:"夾層裡還藏著幾枚匿名儲值晶片。"
                    }
                ]

            },

            failure: {

                log:
                    "裡面只剩受潮的衣物和碎紙片。科佩把背包放回原位：「至少它陪主人走到最後了。」",

                rewards:[]
            }

        },

        {
            text:"拆下可用零件",

            successChance:0.9,

            success:{
                log:
                    "拉鍊、扣具和金屬框都還能回收。科佩熟練地拆完後拍拍手：「蚊子再小也是肉。」",

                rewards:[
                    {material:"scrap",min:2,max:4,chance:1},
                    {material:"wire",min:1,max:3,chance:0.7}
                ]
            },

            failure:{
                log:
                    "背包一碰就整個散開。科佩望著滿地碎布：「嗯……退休得很徹底。」",

                rewards:[]
            }

        },

        {
            text:"離開",

            successChance:1,

            success:{
                log:
                    "科佩看了一眼背包，最後沒有動它。「總覺得有人還會回來找它。」",

                rewards:[]
            }

        }

    ]

},

// 通用事件2 ：巡迴配送
{
    id:"common_delivery_robot",

    title:"巡迴配送",

    description:
        "一台物流機器人拖著空貨箱慢慢前進，螢幕仍顯示著「今日配送中」。",

    areaIds:[1,2,3,4,5],

    options:[

        {
            text:"跟著它",

            successChance:0.6,

            success:{
                log:
                    "物流機器人停在一處倉庫門前。科佩忍不住笑了：「原來你還記得回家的路。」",

                rewards:[
                    {material:"battery",amount:1,chance:0.6},
                    {material:"foodPack",min:1,max:2,chance:0.8},
                    {material:"wire",min:2,max:4,chance:1}
                ]
            },

            failure:{
                log:
                    "它繞了好幾圈又回到原點。科佩抓抓頭：「導航好像跟我一樣迷路了。」",

                rewards:[]
            }

        },

        {
            text:"拆下零件",

            successChance:0.8,

            success:{
                log:
                    "機器人終於停止了兩百年的配送工作。科佩默默收起零件，輕聲說了句：「辛苦了。」",

                rewards:[
                    {material:"motor",amount:1,chance:0.5},
                    {material:"sensor",amount:1,chance:0.5},
                    {material:"circuit",min:1,max:2,chance:1}
                ]
            },

            failure:{
                log:
                    "固定螺絲鏽得太死，螺絲起子怎麼也轉不開。科佩甩了甩痠痛的手：「今天算你贏。」",

                rewards:[
                    {material:"scrap",min:1,max:2,chance:1}
                ]
            }

        },

        {
            text:"揮手道別",

            successChance:1,

            success:{
                log:
                    "科佩朝它揮了揮手，機器人依舊沿著既定路線離去，彷彿城市從未改變。",

                rewards:[]
            }

        }

    ]

},
// 通用事件3 ：奇怪的收音機
{
    id:"common_radio",

    title:"奇怪的收音機",

    description:
        "科佩從瓦礫堆裡翻出一台老舊收音機，外殼雖然鏽蝕，電源燈卻還亮著。",

    areaIds:[1,2,3,4,5],

    options:[

        {
            text:"試著修好",

            successChance:0.5,

            success:{
                log:
                    "收音機忽然播放起陌生的老歌。科佩安靜聽了一會，面具上維持著笑臉。",

                rewards:[
                    {material:"battery",amount:1,chance:0.5},
                    {
                        money:{min:20,max:40},
                        chance:0.1,
                        log:"底座掉出幾枚匿名儲值晶片。"
                    }
                ]
            },

            failure:{
                log:
                    "只剩沙沙的雜訊迴盪著。科佩拍拍它：「沒關係，你已經很努力了。」",

                rewards:[
                    {material:"wire",min:1,max:2,chance:1}
                ]
            }

        },

        {
            text:"拆成零件",

            successChance:0.9,

            success:{
                log:
                    "裡面的電子零件保存得意外完整。科佩熟練地拆解收進背包：「至少還能再服務一次。」",

                rewards:[
                    {material:"circuit",min:1,max:2,chance:1},
                    {material:"wire",min:2,max:4,chance:1}
                ]
            },

            failure:{
                log:
                    "零件一碰就碎成粉末。科佩攤開雙手：「好吧，它是真的壽終正寢了。」",

                rewards:[
                    {material:"scrap",min:1,max:2,chance:1}
                ]
            }

        },

        {
            text:"放回原處",

            successChance:1,

            success:{
                log:
                    "科佩輕輕把收音機放回架上，旋律也慢慢消失在風裡。",

                rewards:[]
            }

        }

    ]

},

// 通用事件4 ：拖行痕跡
{
    id:"common_drag_marks",

    title:"拖行痕跡",

    description:
        "地面留下一道新鮮的拖行痕跡，一路延伸進濃厚的鏽霧之中。",

    areaIds:[1,2,3,4,5],

    options:[

        {
            text:"跟上去",

            successChance:0.4,

            success:{
                log:
                    "痕跡盡頭散落著尚未被拿走的物資。科佩沒有多停留：「拿了就走，我可不想知道主人去哪了。」",

                rewards:[
                    {material:"filterFiber",min:1,max:2,chance:1},
                    {material:"battery",amount:1,chance:0.5},
                    {
                        money:{min:20,max:50},
                        chance:0.08,
                        log:"附近掉著幾枚匿名儲值晶片。"
                    }
                ]
            },

            failure:{
                log:
                    "拖行痕跡突然消失在鏽霧裡。科佩立刻轉身：「今天的好奇心額度用完了。」",

                rewards:[]
            }

        },

        {
            text:"繞路",

            successChance:1,

            success:{
                log:
                    "你們默默換了條路。身後隱約傳來金屬摩擦聲，卻始終沒有回頭。",

                rewards:[]
            }

        }

    ]

},

// 通用事件5 ：同行
{
    id:"common_scavenger",

    title:"同行",

    description:
        "路過一處轉角，一名廢土客正在整理剛回收的物資，看見你們後微微點了點頭。",

    areaIds:[1,2,3,4],

    options:[

        {
            text:"交換情報",

            successChance:0.5,

            success:{
                log:
                    "對方分享了一處最近沒人探索的地點。科佩笑著揮手：「下次有好東西再互相通知。」",

                rewards:[
                    {material:"filterFiber",min:1,max:2,chance:0.7},
                    {
                        money:{min:20,max:40},
                        chance:0.15,
                        log:"對方還順手塞了幾枚匿名儲值晶片。"
                    }
                ]
            },

            failure:{
                log:
                    "對方只是笑了笑，沒有透露任何消息。科佩也沒有追問，揮揮手便離開了。",

                rewards:[]
            }

        },

        {
            text:"交易零件",

            successChance:0.8,

            success:{
                log:
                    "彼此交換了一些用不到的物資。科佩看著背包裡的新零件，滿意地點了點頭。",

                rewards:[
                    {material:"wire",min:2,max:4,chance:1},
                    {material:"sensor",amount:1,chance:0.4},
                    {material:"polymer",min:1,max:2,chance:0.7}
                ]
            },

            failure:{
                log:
                    "對方禮貌地婉拒了交易。科佩聳聳肩：「總要留點運氣給下一次。」",

                rewards:[]
            }

        },

        {
            text:"道別",

            successChance:1,

            success:{
                log:
                    "兩人互相點頭致意，很快便消失在彼此的視線中。",

                rewards:[]
            }

        }

    ]

},

// 通用事件6: 短暫休息
{
    id:"common_break",

    title:"短暫休息",

    description:
        "探索了一段時間後，你們找了處還算乾淨的角落休息。科佩從背包裡翻出幾袋合成營養膏。",

    areaIds:[1,2,3,4,5],

    options:[

        {

            text:"讓科佩挑",

            successChance:1,

            success:{

                log:
                    randomText(
                        eventTexts
							.nutritionPaste
							.kopeChoice
                    ),

                rewards:[]

            }

        },

        {

            text:"自己挑",

            successChance:1,

            success:{

                log:
                    randomText(
                        eventTexts
							.nutritionPaste
							.selfChoice
                    ),

                rewards:[]

            }

        },

        {

            text:"留著以後吃",

            successChance:1,

            success:{

                log:
                    randomText(
                        eventTexts
							.nutritionPaste
							.saveForLater
                    ),

                rewards:[]

            }

        }

    ]

},

];