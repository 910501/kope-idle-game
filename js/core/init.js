function initializeGame() {
	
	initializeDOM();
	
    initializePlayerMaterials();

    rebuildAllEvents();

    loadGame();

    initializeSettings();

    initializeInput();
	
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