//========================
// 遊戲設定
//========================

function initializeSettings() {


    if (eventSoundCheckbox) {

        eventSoundCheckbox.checked =
            player.settings.eventSound;

        eventSoundCheckbox.addEventListener(
            "change",
            function () {

                player.settings.eventSound =
                    this.checked;

                saveGame();

            }
        );

    }

    if (eventTitleCheckbox) {

        eventTitleCheckbox.checked =
            player.settings.eventTitleNotification;

        eventTitleCheckbox.addEventListener(
            "change",
            function () {

                player.settings.eventTitleNotification =
                    this.checked;

                saveGame();

            }
        );

    }

}