// fix_profile.js - monkey-patch for profile saving/renaming bugs
(function() {
    const originalOnPetTypeChange = window.onPetTypeChange;
    const originalLoadProfileData = window.loadProfileData;

    // Patch onPetTypeChange to force UI updates
    if (originalOnPetTypeChange) {
        window.onPetTypeChange = function(...args) {
            originalOnPetTypeChange.apply(this, args);
            // Force UI refresh after state change
            setTimeout(() => {
                updateUI();
            }, 0);
        };
    }

    // Patch loadProfileData to force UI updates
    if (originalLoadProfileData) {
        window.loadProfileData = function(...args) {
            originalLoadProfileData.apply(this, args);
            // Force UI refresh after loading profile
            setTimeout(() => {
                updateUI();
            }, 0);
        };
    }

    // Helper to update all UI elements based on current state
    function updateUI() {
        // Update pet type selection UI
        const petTypeSelect = document.getElementById('petType');
        if (petTypeSelect) {
            petTypeSelect.value = window.currentPetType || 'cat';
        }

        // Update weight input
        const weightInput = document.getElementById('weight');
        if (weightInput && window.currentWeight) {
            weightInput.value = window.currentWeight;
        }

        // Update activity level
        const activitySelect = document.getElementById('activityLevel');
        if (activitySelect && window.currentActivityLevel) {
            activitySelect.value = window.currentActivityLevel;
        }

        // Recalculate and display results
        if (window.calculateFoodAmount) {
            window.calculateFoodAmount();
        }
    }

    console.log('fix_profile.js loaded successfully');
})();
