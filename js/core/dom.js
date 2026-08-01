let eventSoundCheckbox;
let eventTitleCheckbox;

let characterLineElement;

let exploreToggleButton;

let debugSaveButton;
let exportSaveButton;
let importSaveButton;
let importSaveInput;

let announcementButton;
let creditsButton;
let infoModal;
let infoModalCloseButton;
let infoTabButtons;

let saveManagerButton;
let saveManagerModal;
let saveManagerCloseButton;

let developerButton;
let developerModal;
let developerCloseButton;

let blackMarketOpenButton;
let blackMarketCloseButton;
let blackMarketModal;


function initializeDOM() {

   eventSoundCheckbox =
        document.getElementById(
            "setting-event-sound"
        );

    eventTitleCheckbox =
        document.getElementById(
            "setting-event-title"
        );

	characterLineElement =
        document.getElementById(
            "character-line"
        );
		
	exploreToggleButton =
    document.getElementById(
        "explore-toggle-btn"
    );


	debugSaveButton =
    document.getElementById(
        "debug-save-btn"
    );
	exportSaveButton =
    document.getElementById(
        "export-save-btn"
    );

	importSaveButton =
    document.getElementById(
        "import-save-btn"
    );

	importSaveInput =
    document.getElementById(
        "import-save-input"
    );
	
	announcementButton =
    document.getElementById(
        "announcement-btn"
    );

	creditsButton =
    document.getElementById(
        "credits-btn"
    );

	infoModal =
    document.getElementById(
        "info-modal"
    );

	infoModalCloseButton =
    document.getElementById(
        "info-modal-close"
    );

	infoTabButtons =
    document.querySelectorAll(
        "[data-info-page]"
    );
	
	saveManagerButton =
    document.getElementById(
        "save-manager-btn"
    );

	saveManagerModal =
    document.getElementById(
        "save-manager-modal"
    );

	saveManagerCloseButton =
    document.getElementById(
        "save-manager-close-btn"
    );
	
	developerButton =
    document.getElementById(
        "developer-btn"
    );

	developerModal =
    document.getElementById(
        "developer-modal"
    );

	developerCloseButton =
    document.getElementById(
        "developer-close-btn"
    );
	
	blackMarketOpenButton =
    document.getElementById(
        "black-market-open-btn"
    );

	blackMarketCloseButton =
    document.getElementById(
        "black-market-close-btn"
    );

	blackMarketModal =
    document.getElementById(
        "black-market-modal"
    );
	
	infoModal =
    document.getElementById(
        "info-modal"
    );

	infoModalTitle =
    document.getElementById(
        "info-modal-title"
    );

	infoModalContent =
    document.getElementById(
        "info-modal-content"
    );
	
}