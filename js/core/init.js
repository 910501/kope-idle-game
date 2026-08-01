function initializeGame() {
	
	initializeDOM();
	
    initializePlayerMaterials();

    rebuildAllEvents();

    loadGame();

    initializeSettings();

    initializeModals();
	
	 if (exploreToggleButton) {

        exploreToggleButton.addEventListener(
            "click",
            toggleExploration
        );

    }
	
    updateUI();

    setCharacterState("idle");

    showRandomCharacterLine(
        characterDialogue.greeting
    );

}