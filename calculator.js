// Unit conversion state
let heightUnit = 'cm';
let weightUnit = 'kg';

// Goal configuration with custom option
const goalSettings = {
    weightLoss: { protein: 0.35, carbs: 0.35, fat: 0.30, calorieAdjustment: -500, description: "Weight Loss (500 cal deficit)" },
    muscleGain: { protein: 0.30, carbs: 0.45, fat: 0.25, calorieAdjustment: 500, description: "Muscle Gain (500 cal surplus)" },
    maintenance: { protein: 0.30, carbs: 0.40, fat: 0.30, calorieAdjustment: 0, description: "Maintenance (calorie balance)" },
    recomp: { protein: 0.35, carbs: 0.35, fat: 0.30, calorieAdjustment: -200, description: "Body Recomposition (200 cal deficit)" },
    keto: { protein: 0.25, carbs: 0.05, fat: 0.70, calorieAdjustment: 0, description: "Ketogenic (low carb)" },
    custom: { protein: 0.30, carbs: 0.40, fat: 0.30, calorieAdjustment: 0, description: "Custom macro ratios" }
};

// Enhanced food database with recipes and Australian pricing
const foodDatabase = {
    proteins: [
        { 
            name: "Grilled Chicken Breast", 
            protein: 31, carbs: 0, fat: 3.6, calories: 165, 
            serving: "150g", cost: 4.50,
            recipe: {
                prepTime: "10 minutes", cookTime: "15 minutes", servings: 1,
                ingredients: ["150g chicken breast", "1 tsp olive oil", "1 tsp garlic powder", "Salt and pepper to taste", "1 tsp herbs (thyme/rosemary)"],
                instructions: ["Season chicken with garlic powder, salt, pepper, and herbs", "Heat olive oil in pan over medium-high heat", "Cook chicken 6-7 minutes each side until internal temp reaches 75°C", "Rest for 3 minutes before serving", "Slice and serve with vegetables"]
            }
        },
        { 
            name: "Baked Salmon", 
            protein: 22, carbs: 0, fat: 13, calories: 208, 
            serving: "120g", cost: 8.50,
            recipe: {
                prepTime: "5 minutes", cookTime: "12 minutes", servings: 1,
                ingredients: ["120g salmon fillet", "1 tbsp olive oil", "1 lemon (juiced)", "1 tsp dill", "Salt and pepper"],
                instructions: ["Preheat oven to 200°C", "Place salmon on baking tray lined with foil", "Drizzle with olive oil and lemon juice", "Season with dill, salt, and pepper", "Bake for 12-15 minutes until flakes easily"]
            }
        },
        { 
            name: "Scrambled Eggs", 
            protein: 12, carbs: 1, fat: 10, calories: 140, 
            serving: "2 large eggs", cost: 1.20,
            recipe: {
                prepTime: "2 minutes", cookTime: "5 minutes", servings: 1,
                ingredients: ["2 large eggs", "1 tbsp butter", "2 tbsp milk", "Salt and pepper", "Chives for garnish"],
                instructions: ["Crack eggs into bowl and whisk with milk", "Heat butter in non-stick pan over low heat", "Add eggs and gently stir continuously", "Cook until just set but still creamy", "Season and garnish with chives"]
            }
        },
        { 
            name: "Greek Yogurt Bowl", 
            protein: 18, carbs: 7, fat: 0.4, calories: 100, 
            serving: "200g", cost: 2.80,
            recipe: {
                prepTime: "3 minutes", cookTime: "0 minutes", servings: 1,
                ingredients: ["200g Greek yogurt", "1 tbsp honey", "2 tbsp mixed berries", "1 tbsp chopped almonds", "Mint leaves"],
                instructions: ["Place Greek yogurt in serving bowl", "Drizzle with honey", "Top with fresh berries and almonds", "Garnish with mint leaves", "Serve immediately"]
            }
        }
    ],
    carbs: [
        { 
            name: "Brown Rice Pilaf", 
            protein: 2.6, carbs: 23, fat: 0.9, calories: 112, 
            serving: "80g cooked", cost: 0.80,
            recipe: {
                prepTime: "5 minutes", cookTime: "25 minutes", servings: 1,
                ingredients: ["40g brown rice (dry)", "1 cup vegetable stock", "1 tsp olive oil", "1 small onion diced", "Fresh herbs"],
                instructions: ["Heat oil in saucepan, sauté onion until soft", "Add rice and stir for 1 minute", "Add hot stock, bring to boil then simmer covered for 20 minutes", "Rest for 5 minutes before fluffing with fork", "Garnish with fresh herbs"]
            }
        },
        { 
            name: "Quinoa Salad", 
            protein: 4.4, carbs: 21, fat: 1.9, calories: 120, 
            serving: "80g cooked", cost: 2.10,
            recipe: {
                prepTime: "10 minutes", cookTime: "15 minutes", servings: 1,
                ingredients: ["40g quinoa (dry)", "1 cup water", "1 cucumber diced", "1 tomato diced", "Lemon juice", "Olive oil"],
                instructions: ["Rinse quinoa and cook in water for 15 minutes", "Drain and cool completely", "Mix with diced vegetables", "Dress with lemon juice and olive oil", "Season with salt and pepper"]
            }
        },
        { 
            name: "Roasted Sweet Potato", 
            protein: 2, carbs: 27, fat: 0.1, calories: 114, 
            serving: "150g", cost: 1.50,
            recipe: {
                prepTime: "5 minutes", cookTime: "30 minutes", servings: 1,
                ingredients: ["150g sweet potato", "1 tsp olive oil", "Salt and pepper", "Paprika", "Fresh rosemary"],
                instructions: ["Preheat oven to 200°C", "Wash and cube sweet potato", "Toss with olive oil and seasonings", "Roast for 25-30 minutes until tender", "Garnish with rosemary"]
            }
        }
    ],
    fats: [
        { 
            name: "Avocado Toast", 
            protein: 2, carbs: 9, fat: 15, calories: 160, 
            serving: "1/2 medium avocado", cost: 2.50,
            recipe: {
                prepTime: "5 minutes", cookTime: "2 minutes", servings: 1,
                ingredients: ["1/2 ripe avocado", "1 slice whole grain bread", "Lime juice", "Salt", "Red pepper flakes"],
                instructions: ["Toast bread until golden", "Mash avocado with lime juice and salt", "Spread on toast", "Sprinkle with red pepper flakes", "Serve immediately"]
            }
        },
        { 
            name: "Mixed Nuts", 
            protein: 6, carbs: 6, fat: 14, calories: 160, 
            serving: "30g", cost: 1.80,
            recipe: {
                prepTime: "15 minutes", cookTime: "10 minutes", servings: 4,
                ingredients: ["120g mixed raw nuts", "1 tsp olive oil", "1 tsp sea salt", "1 tsp rosemary", "Paprika"],
                instructions: ["Preheat oven to 180°C", "Toss nuts with oil and seasonings", "Spread on baking tray", "Roast 8-10 minutes, stirring once", "Cool completely before storing"]
            }
        }
    ],
    vegetables: [
        { 
            name: "Steamed Broccoli", 
            protein: 2.5, carbs: 6, fat: 0.3, calories: 35, 
            serving: "150g", cost: 1.20,
            recipe: {
                prepTime: "5 minutes", cookTime: "5 minutes", servings: 1,
                ingredients: ["150g broccoli florets", "Salt", "Lemon juice", "1 tsp butter", "Black pepper"],
                instructions: ["Steam broccoli for 4-5 minutes until tender-crisp", "Season with salt and pepper", "Drizzle with lemon juice", "Add butter if desired", "Serve hot"]
            }
        }
    ]
};

// Meal frequency configurations
const mealFrequencyTemplates = {
    1: { name: "OMAD", times: ["6:00 PM"], distribution: [1.0] },
    2: { name: "2 Meals", times: ["12:00 PM", "6:00 PM"], distribution: [0.4, 0.6] },
    3: { name: "Traditional", times: ["8:00 AM", "12:30 PM", "6:30 PM"], distribution: [0.25, 0.35, 0.4] },
    4: { name: "3 + Snack", times: ["8:00 AM", "12:30 PM", "3:30 PM", "6:30 PM"], distribution: [0.25, 0.35, 0.1, 0.3] },
    5: { name: "5 Meals", times: ["8:00 AM", "10:30 AM", "1:00 PM", "4:00 PM", "7:00 PM"], distribution: [0.25, 0.15, 0.25, 0.15, 0.2] },
    6: { name: "6 Meals", times: ["7:00 AM", "10:00 AM", "1:00 PM", "3:30 PM", "6:00 PM", "8:30 PM"], distribution: [0.2, 0.15, 0.25, 0.1, 0.25, 0.05] }
};

// Event listeners
document.getElementById('heightCm').addEventListener('click', () => toggleHeightUnit('cm'));
document.getElementById('heightFt').addEventListener('click', () => toggleHeightUnit('ft'));
document.getElementById('weightKg').addEventListener('click', () => toggleWeightUnit('kg'));
document.getElementById('weightLbs').addEventListener('click', () => toggleWeightUnit('lbs'));
document.getElementById('generateMealBtn').addEventListener('click', generateMealPlan);
document.getElementById('mealFrequency').addEventListener('change', handleMealFrequencyChange);
document.getElementById('closeModal').addEventListener('click', closeRecipeModal);

// Custom macro slider event listeners
document.getElementById('proteinSlider').addEventListener('input', updateMacroSliders);
document.getElementById('carbsSlider').addEventListener('input', updateMacroSliders);
document.getElementById('fatSlider').addEventListener('input', updateMacroSliders);

// Goal change event listener to show/hide custom macro controls
document.querySelectorAll('input[name="goal"]').forEach(radio => {
    radio.addEventListener('change', handleGoalChange);
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        closeRecipeModal();
    }
});

function handleGoalChange() {
    const selectedGoal = document.querySelector('input[name="goal"]:checked').value;
    const customMacroRow = document.getElementById('customMacroRow');
    
    if (selectedGoal === 'custom') {
        customMacroRow.style.display = 'flex';
    } else {
        customMacroRow.style.display = 'none';
    }
}

function updateMacroSliders() {
    const proteinValue = parseInt(document.getElementById('proteinSlider').value);
    const carbsValue = parseInt(document.getElementById('carbsSlider').value);
    const fatValue = parseInt(document.getElementById('fatSlider').value);
    
    document.getElementById('proteinPercent').textContent = proteinValue;
    document.getElementById('carbsPercent').textContent = carbsValue;
    document.getElementById('fatPercent').textContent = fatValue;
    
    const total = proteinValue + carbsValue + fatValue;
    document.getElementById('macroTotal').textContent = total;
    
    const warningElement = document.getElementById('macroWarning');
    if (total !== 100) {
        warningElement.textContent = `(Must equal 100%)`;
        warningElement.style.color = '#e74c3c';
    } else {
        warningElement.textContent = '✓';
        warningElement.style.color = '#2ECC40';
    }
    
    // Update custom goal settings
    if (total === 100) {
        goalSettings.custom.protein = proteinValue / 100;
        goalSettings.custom.carbs = carbsValue / 100;
        goalSettings.custom.fat = fatValue / 100;
    }
}

function handleMealFrequencyChange() {
    const customRow = document.getElementById('customMealRow');
    const frequency = document.getElementById('mealFrequency').value;
    
    if (frequency === 'custom') {
        customRow.style.display = 'flex';
        document.getElementById('customMeals').required = true;
    } else {
        customRow.style.display = 'none';
        document.getElementById('customMeals').required = false;
    }
}

function toggleHeightUnit(unit) {
    heightUnit = unit;
    document.getElementById('heightCm').classList.toggle('active', unit === 'cm');
    document.getElementById('heightFt').classList.toggle('active', unit === 'ft');
    
    const heightInput = document.getElementById('height');
    if (unit === 'cm') {
        heightInput.placeholder = 'e.g., 175';
        heightInput.step = '1';
    } else {
        heightInput.placeholder = 'e.g., 5.9';
        heightInput.step = '0.1';
    }
}

function toggleWeightUnit(unit) {
    weightUnit = unit;
    document.getElementById('weightKg').classList.toggle('active', unit === 'kg');
    document.getElementById('weightLbs').classList.toggle('active', unit === 'lbs');
    
    const weightInput = document.getElementById('weight');
    if (unit === 'kg') {
        weightInput.placeholder = 'e.g., 70';
    } else {
        weightInput.placeholder = 'e.g., 154';
    }
}

// Form submission
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate custom macros if selected
    const selectedGoal = document.querySelector('input[name="goal"]:checked').value;
    if (selectedGoal === 'custom') {
        const total = parseInt(document.getElementById('proteinSlider').value) + 
                     parseInt(document.getElementById('carbsSlider').value) + 
                     parseInt(document.getElementById('fatSlider').value);
        
        if (total !== 100) {
            alert('Custom macro percentages must equal 100% before calculating.');
            return;
        }
    }
    
    calculateResults();
    generateMealPlan();
});

function calculateResults() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const goalConfig = goalSettings[goal];

    // Convert units
    if (heightUnit === 'ft') height = height * 30.48;
    if (weightUnit === 'lbs') weight = weight / 2.205;

    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const tdee = bmr * activityLevel;
    const targetCalories = tdee + goalConfig.calorieAdjustment;

    // Calculate macros
    const proteinCalories = targetCalories * goalConfig.protein;
    const carbsCalories = targetCalories * goalConfig.carbs;
    const fatCalories = targetCalories * goalConfig.fat;

    const proteinGrams = proteinCalories / 4;
    const carbsGrams = carbsCalories / 4;
    const fatGrams = fatCalories / 9;

    // Update display
    document.getElementById('bmrValue').textContent = Math.round(bmr);
    document.getElementById('tdeeValue').textContent = Math.round(tdee);
    document.getElementById('targetCalories').textContent = Math.round(targetCalories);
    document.getElementById('targetDescription').textContent = goalConfig.description;

    document.getElementById('proteinGrams').textContent = Math.round(proteinGrams) + 'g';
    document.getElementById('proteinCals').textContent = Math.round(proteinCalories) + ' calories';
    document.getElementById('carbsGrams').textContent = Math.round(carbsGrams) + 'g';
    document.getElementById('carbsCals').textContent = Math.round(carbsCalories) + ' calories';
    document.getElementById('fatGrams').textContent = Math.round(fatGrams) + 'g';
    document.getElementById('fatCals').textContent = Math.round(fatCalories) + ' calories';

    // Update macro bars
    const proteinPercent = Math.round(goalConfig.protein * 100);
    const carbsPercent = Math.round(goalConfig.carbs * 100);
    const fatPercent = Math.round(goalConfig.fat * 100);
    
    document.getElementById('proteinBar').style.width = proteinPercent + '%';
    document.getElementById('proteinBar').textContent = 'Protein ' + proteinPercent + '%';
    document.getElementById('carbsBar').style.width = carbsPercent + '%';
    document.getElementById('carbsBar').textContent = 'Carbs ' + carbsPercent + '%';
    document.getElementById('fatBar').style.width = fatPercent + '%';
    document.getElementById('fatBar').textContent = 'Fat ' + fatPercent + '%';

    // Update meal plan title
    const frequency = document.getElementById('mealFrequency').value;
    const frequencyText = frequency === 'custom' ? 'Custom' : mealFrequencyTemplates[frequency]?.name || 'Sample';
    document.getElementById('mealPlanTitle').textContent = `${frequencyText} Meal Plan`;

    document.getElementById('results').classList.add('show');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function generateMealPlan() {
    const mealPlanContent = document.getElementById('mealPlanContent');
    mealPlanContent.innerHTML = '';
    
    const proteinTarget = parseInt(document.getElementById('proteinGrams').textContent);
    const carbsTarget = parseInt(document.getElementById('carbsGrams').textContent);
    const fatTarget = parseInt(document.getElementById('fatGrams').textContent);
    const calorieTarget = parseInt(document.getElementById('targetCalories').textContent);
    
    const frequency = document.getElementById('mealFrequency').value;
    let mealConfig;
    
    if (frequency === 'custom') {
        const customMeals = parseInt(document.getElementById('customMeals').value) || 3;
        const evenDistribution = 1 / customMeals;
        mealConfig = {
            name: 'Custom',
            times: Array(customMeals).fill().map((_, i) => `Meal ${i + 1}`),
            distribution: Array(customMeals).fill(evenDistribution)
        };
    } else {
        mealConfig = mealFrequencyTemplates[frequency] || mealFrequencyTemplates[3];
    }
    
    let totalCost = 0;
    
    mealConfig.times.forEach((mealTime, index) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'meal-category';
        
        const header = document.createElement('h4');
        header.textContent = `${mealTime} (${Math.round(mealConfig.distribution[index] * 100)}% of daily calories)`;
        categoryElement.appendChild(header);
        
        const mealCalories = calorieTarget * mealConfig.distribution[index];
        const mealProtein = proteinTarget * mealConfig.distribution[index];
        const mealCarbs = carbsTarget * mealConfig.distribution[index];
        const mealFat = fatTarget * mealConfig.distribution[index];
        
        // Add foods based on meal size and goal
        const goal = document.querySelector('input[name="goal"]:checked').value;
        
        if (mealCalories > 100) {
            // Add protein
            const proteinFood = getRandomFood(foodDatabase.proteins);
            const proteinItem = createMealItemWithRecipe(proteinFood);
            categoryElement.appendChild(proteinItem);
            totalCost += proteinFood.cost;
            
            // Add carbs (if not keto and sufficient calories)
            if (goal !== 'keto' && mealCalories > 200) {
                const carbFood = getRandomFood(foodDatabase.carbs);
                const carbItem = createMealItemWithRecipe(carbFood);
                categoryElement.appendChild(carbItem);
                totalCost += carbFood.cost;
            }
            
            // Add healthy fats
            if (mealCalories > 150) {
                const fatFood = getRandomFood(foodDatabase.fats);
                const fatItem = createMealItemWithRecipe(fatFood);
                categoryElement.appendChild(fatItem);
                totalCost += fatFood.cost;
            }
            
            // Add vegetables
            const vegetable = getRandomFood(foodDatabase.vegetables);
            const vegItem = createMealItemWithRecipe(vegetable);
            categoryElement.appendChild(vegItem);
            totalCost += vegetable.cost;
        }
        
        mealPlanContent.appendChild(categoryElement);
    });
    
    // Add cost summary
    const costSummary = document.createElement('div');
    costSummary.style.textAlign = 'center';
    costSummary.style.marginTop = '20px';
    costSummary.style.padding = '15px';
    costSummary.style.background = 'linear-gradient(90deg, #2ECC40, #1B5E20)';
    costSummary.style.color = 'white';
    costSummary.style.borderRadius = '8px';
    costSummary.innerHTML = `<strong>Estimated Daily Cost: $${totalCost.toFixed(2)} AUD</strong>`;
    mealPlanContent.appendChild(costSummary);
}

function getRandomFood(foodArray) {
    const randomIndex = Math.floor(Math.random() * foodArray.length);
    return foodArray[randomIndex];
}

function createMealItemWithRecipe(food) {
    const mealItem = document.createElement('div');
    mealItem.className = 'meal-item';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'meal-name';
    nameSpan.textContent = food.name;
    
    const portionSpan = document.createElement('span');
    portionSpan.className = 'meal-portion';
    portionSpan.textContent = food.serving;
    
    const recipeBtn = document.createElement('button');
    recipeBtn.textContent = 'View Recipe';
    recipeBtn.className = 'recipe-btn';
    recipeBtn.addEventListener('click', () => showRecipeModal(food));
    
    mealItem.appendChild(nameSpan);
    mealItem.appendChild(portionSpan);
    mealItem.appendChild(recipeBtn);
    
    return mealItem;
}

function showRecipeModal(food) {
    const modal = document.getElementById('recipeModal');
    const recipe = food.recipe;
    
    document.getElementById('recipeTitle').textContent = food.name;
    document.getElementById('recipeServings').textContent = recipe.servings;
    document.getElementById('recipePrepTime').textContent = recipe.prepTime;
    document.getElementById('recipeCookTime').textContent = recipe.cookTime;
    document.getElementById('recipeCost').textContent = `$${food.cost.toFixed(2)} AUD`;
    
    document.getElementById('recipeCalories').textContent = food.calories;
    document.getElementById('recipeProtein').textContent = food.protein + 'g';
    document.getElementById('recipeCarbs').textContent = food.carbs + 'g';
    document.getElementById('recipeFat').textContent = food.fat + 'g';
    
    // Populate ingredients
    const ingredientsList = document.getElementById('recipeIngredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Populate instructions
    const instructionsList = document.getElementById('recipeInstructions');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    
    modal.style.display = 'block';
}

function closeRecipeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

// Initialize
toggleHeightUnit('cm');
toggleWeightUnit('kg');
