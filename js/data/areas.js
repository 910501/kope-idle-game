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
    eventChance: 0.02
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
    eventChance: 0.03
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
    eventChance: 0.03
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

    eventChance: 0.05
}
];