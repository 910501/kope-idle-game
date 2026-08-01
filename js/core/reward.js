// 將素材獎勵加入玩家背包
function giveMaterialRewards(rewards) {

    Object.entries(rewards).forEach(
        function ([materialId, amount]) {

            if (
                typeof amount !== "number" ||
                amount <= 0
            ) {
                return;
            }

            if (
                typeof player.materials[
                    materialId
                ] !== "number"
            ) {

                player.materials[
                    materialId
                ] = 0;

            }

            player.materials[
                materialId
            ] += amount;

        }
    );

}

//========================
// 通用事件獎勵系統
//========================

function giveEventRewards(rewards) {

    const obtainedRewards = [];

    if (!Array.isArray(rewards)) {
        return obtainedRewards;
    }

    rewards.forEach(function (reward) {

        if (!reward) {
		return;
}

        // 沒寫 chance 時，預設為 100%
        const chance =
            typeof reward.chance === "number"
                ? reward.chance
                : 1;

        // 判定這項獎勵是否掉落
        if (Math.random() >= chance) {
            return;
        }
	if (reward.money) {

    let amount;

    if (typeof reward.money === "number") {

        amount = reward.money;

    } else {

        const min = Math.min(
    reward.money.min,
    reward.money.max
);

const max = Math.max(
    reward.money.min,
    reward.money.max
);

amount = randomInteger(
    min,
    max
);

    }

 player.money = Math.max(
    0,
    player.money + amount
);

obtainedRewards.push({

    money: true,

    amount: amount

});

return;
}
        const currentAmount =
            player.materials[
                reward.material
            ] || 0;

        // 已經達到最大持有量
        if (
            typeof reward.maxOwned === "number" &&
            currentAmount >= reward.maxOwned
        ) {
            return;
        }
		const playerEffects =
    getPlayerEffects();
	
        let amount = 1;
		let reducedBy = 0;
		
        // 固定數量
        if (
            typeof reward.amount === "number"
        ) {

            amount = reward.amount;

        // 隨機數量
} else if (
    typeof reward.min === "number" &&
    typeof reward.max === "number"
) {

    const min = Math.min(
        reward.min,
        reward.max
    );

    const max = Math.max(
        reward.min,
        reward.max
    );

    amount = randomInteger(
        min,
        max
    );

}

        // 避免取得後超過最大持有量
        if (
            typeof reward.maxOwned === "number"
        ) {

            amount = Math.min(
                amount,
                reward.maxOwned -
                    currentAmount
            );

        }

        if (amount === 0) {
            return;
        }

        // 初始化素材
if (
    typeof player.materials[
        reward.material
    ] !== "number"
) {

    player.materials[
        reward.material
    ] = 0;

}
//========================
// 外骨骼：降低事件損失
//========================

if (amount < 0) {

    const originalAmount = amount;

    amount = Math.ceil(
        amount *
        (
            1 -
            playerEffects.lossReduction
        )
    );

    reducedBy =
        Math.abs(originalAmount) -
        Math.abs(amount);

}

// 增減素材
player.materials[
    reward.material
] = Math.max(
    0,
    player.materials[
        reward.material
    ] + amount
);

        // 取得地下設施秘鑰時，
        // 記錄第五區已經被發現
        if (
            reward.material ===
            "undergroundKey"
        ) {

            discoverArea(5);

        }

        obtainedRewards.push({

            material:
                reward.material,

            amount:
                amount,

            log:
                reward.log || ""

        });

    });

    return obtainedRewards;
}

