// ========================================
// Area 5 Events - 封鎖的地下設施
// ========================================

const area5Events = [

	// 第五區事件1：仍在運作的研究AI
{
    id: "lab_ai",
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
	// 第五區事件2：空蕩的培養槽
	{
    id: "lab_tank",
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
	// 第五區事件3：最後的辦公室
{
    id: "lab_office",
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

];