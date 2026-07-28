//========================
// 素材資料
//========================

const materialData = [

    //====================
    // 基礎回收物
    //====================

    {
        id: "scrap",
    name: "銹蝕廢金屬",
    category: "common",

    sellPrice: 2,

    description:
        "被銹霧侵蝕的金屬碎片。" +
        "經過重新熔煉後，仍可作為基礎維修材料。"
    },

    {
        id: "wire",
        name: "老化導線",
        category: "common",
		sellPrice: 3,
        description:
            "從建築與廢棄設備中拆下的導線。" +
            "外層已經脆化，但內部金屬仍有回收價值。"
    },

    {
        id: "polymer",
        name: "耐蝕聚合物",
        category: "common",
		sellPrice: 3,
        description:
            "舊時代使用的合成材料。" +
            "能用於修補防護服、面罩與裝備外殼。"
    },

    {
        id: "metalPlate",
        name: "變形合金板",
        category: "common",
		sellPrice: 5,
        description:
            "從建築外牆與機械外殼拆下的合金板。" +
            "表面變形，但仍可重新加工。"
    },

    {
        id: "filterFiber",
        name: "污染過濾纖維",
        category: "common",
		sellPrice: 6,
        description:
            "殘留於舊型空氣過濾設備中的特殊纖維。" +
            "清理後可用於維修呼吸裝備。"
    },

    //====================
    // 機械與電子零件
    //====================

    {
        id: "battery",
        name: "衰退蓄能電池",
        category: "uncommon",
		sellPrice: 10,
        description:
            "容量嚴重下降的舊式電池。" +
            "部分單元仍能保存少量能源。"
    },

    {
        id: "circuit",
        name: "受蝕電路模組",
        category: "uncommon",
		sellPrice: 14,
        description:
            "遭到銹霧侵蝕的電子模組。" +
            "其中仍可能保留可用的控制元件。"
    },

    {
        id: "motor",
        name: "微型驅動核心",
        category: "uncommon",
		sellPrice: 18,
        description:
            "從自動門、輸送設備或智械中拆下的驅動裝置。" +
            "維修後仍可重新運轉。"
    },

    {
        id: "sensor",
        name: "感應器組件",
        category: "uncommon",
		sellPrice: 20,
        description:
            "舊文明設備使用的環境感應器。" +
            "可偵測溫度、動作或空氣成分。"
    },

    //====================
    // 稀有回收物
    //====================

    {
        id: "foodPack",
        name: "密封合成食品",
        category: "uncommon",
		sellPrice: 12,
        description:
            "包裝尚未破損的舊時代合成食品。" +
            "是否還能食用，通常取決於科佩有多勇敢。"
    },

    {
        id: "energyCrystal",
        name: "微型能源結晶",
        category: "rare",
		sellPrice: 80,
        description:
            "能夠穩定儲存高密度能源的人工結晶。" +
            "是光譜層維修能源設備的重要材料。"
    },

    {
        id: "intactChip",
        name: "完整運算晶片",
        category: "rare",
		sellPrice: 100,
        description:
            "少數未被銹霧破壞的舊文明晶片。" +
            "可用於精密設備與智械系統。"
    },

    {
        id: "dataCarrier",
        name: "舊文明資料載體",
        category: "rare",
		sellPrice: 150,
        description:
            "保存舊時代資料的儲存裝置。" +
            "內容可能是重要研究紀錄，也可能只是三百年前的購物清單。"
    },

    {
        id: "blackBox",
        name: "密封黑盒",
        category: "rare",
		sellPrice: 250,
        description:
            "具有高強度外殼的舊文明資料裝置。" +
            "通常記錄著設備最後運作時的資訊。"
    },

    {
        id: "machineCore",
        name: "智械控制核心",
        category: "rare",
		sellPrice: 400,
        description:
            "失控智械的主要控制模組。" +
            "具有極高回收價值，也可能仍在偷偷運算。"
    },
	// 知識類資源
	{
    id: "researchData",
    name: "研究資料",
    category: "research",

    description:
        "舊文明研究設施中保存下來的技術資料。" +
        "記錄著奈米科技與光譜層建設的重要研究成果。"
	},
//========================
// 劇情物品
//========================
	{
    id: "rareSupplyMap",
    name: "稀有物資座標",
    category: "keyItem"
},

{
    id: "undergroundKey",
    name: "地下設施秘鑰",
    category: "keyItem"
}

];
// 尋找素材名稱
function getMaterialName(materialId) {

    const material =
        materialData.find(
            function (item) {

                return item.id ===
                    materialId;

            }
        );

    if (material) {
        return material.name;
    }

    return materialId;

}
function formatRewardText(
    rewardName,
    amount
) {

    return (
        rewardName +
        " +" +
        amount
    );

}