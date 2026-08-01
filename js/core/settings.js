//========================
// 遊戲設定
//========================

function initializeSettings() {
	if (playerNameInput) {

    playerNameInput.value =
        player.settings.playerName;

}

    if (eventSoundCheckbox) {

        eventSoundCheckbox.checked =
            player.settings.eventSound;


    }

    if (eventTitleCheckbox) {

        eventTitleCheckbox.checked =
            player.settings.eventTitleNotification;

       

    }

}