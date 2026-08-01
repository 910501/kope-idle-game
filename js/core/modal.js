//========================
// 開發模式
//========================
const DEBUG = false;
// null = 使用正常機率
const DEBUG_EVENT_CHANCE = null;


//========================
// 遊戲公告
//========================

const gameInfoData = {

    announcement: {

        title: "系統公告",

        content: `
            <h3>KO-PE Idle Demo</h3>

            <p>
                歡迎遊玩 KO-PE Idle！
            </p>

            <p>
                目前版本仍在開發與測試階段，
                部分功能與數值可能持續調整。<br>
				回饋表單:https://reurl.cc/NOZoOn
			<P>

            <h3>目前版本</h3>

            <p>
                Version 0.4.5
            </p>
        `

    },

    credits: {

        title: "製作名單",

        content: `
            <h3>遊戲製作</h3>

            <p>
                企劃、程式、UI介面：
                sumime
            </p>

            <h3>原作</h3>
			<p>卿卿我我 科佩
			<p>
            <p>
                原作者：
                路人A
            </p>

            <p>
                本作已取得原作者授權製作。<br>
				場景及部分物件使用ai生成。
            </p>
        `

    },

    thanks: {

        title: "感謝名單",

        content: `
            <h3>特別感謝</h3>

            <p>
                原作者的授權與協助
            </p>

            <p>
                參與測試與提供意見的朋友
            </p>

            <p>
                所有遊玩 KO-PE Idle 的玩家
            </p>
        `

    }

};

//========================
// 遊戲資訊彈窗
//========================

function openInfoModal(pageId) {

    const page =
        gameInfoData[pageId];

    if (
        !infoModal ||
        !infoModalTitle ||
        !infoModalContent ||
        !page
    ) {

        return;

    }

    infoModalTitle.textContent =
        page.title;

    infoModalContent.innerHTML =
        page.content;

    infoModal.hidden = false;

}

	
// 關閉彈窗
function closeInfoModal() {

    if (!infoModal) {
        return;
    }

    infoModal.hidden = true;

}
	
//========================
// Developer Tools
//========================

	function openDeveloperTools() {
	if (!developerModal) {
        return;
    }
    developerModal.hidden = false;

}

function closeDeveloperTools() {

    if (!developerModal) {
        return;
    }

    developerModal.hidden = true;

}

function openSaveManager() {

    if (!saveManagerModal) {
        return;
    }

    saveManagerModal.hidden = false;

}

function closeSaveManager() {

    if (!saveManagerModal) {
        return;
    }

    saveManagerModal.hidden = true;

}



