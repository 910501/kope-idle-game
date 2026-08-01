//========================
// Save Manager Events
//========================
function initializeInput() {
//====================
// Info
//====================
    if (announcementButton) {

    announcementButton.addEventListener(
        "click",
        function () {

            openInfoModal(
                "announcement"
            );

        }
    );

}
if (creditsButton) {

    creditsButton.addEventListener(
        "click",
        function () {

            openInfoModal(
                "credits"
            );

        }
    );

}
if (infoModalCloseButton) {

    infoModalCloseButton.addEventListener(
        "click",
        closeInfoModal
    );

}
if (infoTabButtons) {

    infoTabButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                openInfoModal(
                    button.dataset.infoPage
                );

            }
        );

    });

}


if (infoModal) {

    infoModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                infoModal
            ) {

                closeInfoModal();

            }

        }
    );

}

//====================
// Settings
//====================
	if (playerNameInput) {

		playerNameInput.addEventListener(
			"change",
			function () {

				player.settings.playerName =
					this.value.trim();

				saveGame();

			}
		);

	}

	if (eventSoundCheckbox) {

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

    eventTitleCheckbox.addEventListener(
        "change",
        function () {

            player.settings.eventTitleNotification =
                this.checked;

            saveGame();

        }
    );

}
//====================
// Save Manager
//====================

	if (exportSaveButton) {

    exportSaveButton.addEventListener(
        "click",
        exportSave
    );

}
if (importSaveButton) {

    importSaveButton.addEventListener(
        "click",
        function () {

            importSaveInput.click();

        }
    );

}
if (importSaveInput) {

    importSaveInput.addEventListener(
        "change",
        function () {

            const file =
    importSaveInput.files[0];

if (!file) {
    return;
}

importSave(file);

        }
    );

}



    if (saveManagerButton) {

        saveManagerButton.addEventListener(
            "click",
            openSaveManager
        );

    }

    if (saveManagerCloseButton) {

        saveManagerCloseButton.addEventListener(
            "click",
            closeSaveManager
        );

    }
//====================
// Black Market
//====================

if (blackMarketOpenButton) {

    blackMarketOpenButton.addEventListener(
        "click",
        openBlackMarket
    );

}

if (blackMarketCloseButton) {

    blackMarketCloseButton.addEventListener(
        "click",
        closeBlackMarket
    );

}

if (blackMarketModal) {

    blackMarketModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                blackMarketModal
            ) {

                closeBlackMarket();

            }

        }
    );

}

//====================
// Developer
//====================

if (DEBUG) {

    developerButton.hidden = false;

    developerButton.addEventListener(
        "click",
        openDeveloperTools
    );

}

if (developerCloseButton) {

    developerCloseButton.addEventListener(
        "click",
        closeDeveloperTools
    );

}


	}