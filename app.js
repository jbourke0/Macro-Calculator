// Advanced Macro Calculator JavaScript

// Application Data
const appData = {
  mealFrequencyOptions: {
    "3_meals": {
      name: "Standard 3 Meals",
      distribution: { breakfast: 0.25, lunch: 0.35, dinner: 0.40 }
    },
    "6_meals": {
      name: "Frequent 6 Meals", 
      distribution: { 
        breakfast: 0.15, morning_snack: 0.10, lunch: 0.25,
        afternoon_snack: 0.15, dinner: 0.25, evening_snack: 0.10
      }
    }
  },
  macronutrientPresets: {
    weight_loss: { name: "Weight Loss Focus", protein: 0.35, carbs: 0.35, fat: 0.30, calorie_adjustment: -500 },
    muscle_gain: { name: "Muscle Building", protein: 0.30, carbs: 0.45, fat: 0.25, calorie_adjustment: 500 },
    maintenance: { name: "Weight Maintenance", protein: 0.30, carbs: 0.40, fat: 0.30, calorie_adjustment: 0 },
    body_recomp: { name: "Body Recomposition", protein: 0.35, carbs: 0.35, fat: 0.30, calorie_adjustment: -200 },
    keto: { name: "Ketogenic", protein: 0.25, carbs: 0.05, fat: 0.70, calorie_adjustment: 0 }
  },
  foodDatabase: {
    proteins: [
      { name: "Chicken Breast (Skinless)", protein: 31.0, carbs: 0.0, fat: 3.6, calories: 165, cost_per_100g: 1.50, serving: "100g", allergies: [], dietary_restrictions: ["halal"] },
      { name: "Salmon (Atlantic)", protein: 25.4, carbs: 0.0, fat: 12.3, calories: 208, cost_per_100g: 3.20, serving: "100g", allergies: ["fish"], dietary_restrictions: [] },
      { name: "Beef Mince (Lean)", protein: 26.0, carbs: 0.0, fat: 5.0, calories: 155, cost_per_100g: 1.80, serving: "100g", allergies: [], dietary_restrictions: ["halal"] },
      { name: "Eggs (Large)", protein: 12.6, carbs: 0.6, fat: 10.6, calories: 143, cost_per_100g: 0.60, serving: "2 large (100g)", allergies: ["eggs"], dietary_restrictions: ["vegetarian"] },
      { name: "Greek Yogurt (Low Fat)", protein: 10.0, carbs: 6.0, fat: 0.4, calories: 68, cost_per_100g: 0.80, serving: "100g", allergies: ["dairy"], dietary_restrictions: ["vegetarian"] },
      { name: "Tofu (Firm)", protein: 15.7, carbs: 4.3, fat: 8.7, calories: 144, cost_per_100g: 1.20, serving: "100g", allergies: ["soy"], dietary_restrictions: ["vegan", "vegetarian", "halal"] }
    ],
    carbs: [
      { name: "Brown Rice (Cooked)", protein: 2.6, carbs: 23.0, fat: 0.9, calories: 112, cost_per_100g: 0.30, serving: "1/2 cup (125g)", allergies: [], dietary_restrictions: ["gluten-free", "vegan", "halal"] },
      { name: "Sweet Potato (Baked)", protein: 2.0, carbs: 20.1, fat: 0.1, calories: 86, cost_per_100g: 0.50, serving: "1 medium (150g)", allergies: [], dietary_restrictions: ["vegan", "gluten-free", "halal"] },
      { name: "Wholemeal Bread", protein: 9.2, carbs: 41.3, fat: 4.2, calories: 247, cost_per_100g: 0.35, serving: "2 slices (60g)", allergies: ["gluten"], dietary_restrictions: ["vegan", "halal"] },
      { name: "Oats (Rolled)", protein: 13.2, carbs: 67.0, fat: 6.5, calories: 379, cost_per_100g: 0.25, serving: "1/2 cup (40g)", allergies: [], dietary_restrictions: ["gluten-free", "vegan", "halal"] }
    ],
    fats: [
      { name: "Avocado", protein: 2.0, carbs: 8.5, fat: 14.7, calories: 160, cost_per_100g: 1.50, serving: "1/2 medium (100g)", allergies: [], dietary_restrictions: ["vegan", "gluten-free", "halal"] },
      { name: "Olive Oil (Extra Virgin)", protein: 0.0, carbs: 0.0, fat: 100.0, calories: 884, cost_per_100g: 1.20, serving: "1 tbsp (15g)", allergies: [], dietary_restrictions: ["vegan", "gluten-free", "halal"] },
      { name: "Almonds", protein: 21.2, carbs: 21.6, fat: 49.9, calories: 579, cost_per_100g: 2.50, serving: "30g handful", allergies: ["tree nuts"], dietary_restrictions: ["vegan", "gluten-free", "halal"] }
    ],
    vegetables: [
      { name: "Broccoli", protein: 2.8, carbs: 7.0, fat: 0.4, calories: 34, cost_per_100g: 0.80, serving: "1 cup (150g)", allergies: [], dietary_restrictions: ["vegan", "gluten-free", "halal"] },
      { name: "Spinach", protein: 2.9, carbs: 3.6, fat: 0.4, calories: 23, cost_per_100g: 1.20, serving: "2 cups (60g)", allergies: [], dietary_restrictions: ["vegan", "gluten-free", "halal"] },
      { name: "Carrots", protein: 0.9, carbs: 9.6, fat: 0.2, calories: 41, cost_per_100g: 0.40, serving: "1 medium (60g)", allergies: [], dietary_restrictions: ["vegan", "gluten-free", "halal"] }
    ]
  }
};

// Application State
let userProfile = {};
let calculatedMacros = {};
let generatedMealPlan = {};
let shoppingList = {};

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const calculateBtn = document.getElementById('calculate-btn');
const regenerateBtn = document.getElementById('regenerate-plan');
const printBtn = document.getElementById('print-list');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeSliders();
});

function initializeEventListeners() {
  // Tab Navigation
  tabButtons.forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  // Unit Toggle Buttons
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', toggleUnit);
  });

  // Advanced Macro Toggle
  const advancedToggle = document.getElementById('advanced-macros');
  advancedToggle.addEventListener('change', toggleAdvancedMacros);

  // Fitness Goal Change
  document.getElementById('fitness-goal').addEventListener('change', handleGoalChange);

  // Calculate Button
  calculateBtn.addEventListener('click', calculateAndGenerate);

  // Regenerate Meal Plan
  regenerateBtn.addEventListener('click', regenerateMealPlan);

  // Print Shopping List
  printBtn.addEventListener('click', printShoppingList);

  // Macro Sliders
  document.querySelectorAll('.macro-slider').forEach(slider => {
    slider.addEventListener('input', updateMacroValues);
  });
}

function switchTab(tabId) {
  // Update tab buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

  // Update tab panels
  tabPanels.forEach(panel => panel.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function toggleUnit(event) {
  const container = event.target.closest('.unit-toggle');
  const buttons = container.querySelectorAll('.unit-btn');
  const input = container.previousElementSibling;
  
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Convert values if needed
  const currentValue = parseFloat(input.value);
  const newUnit = event.target.dataset.unit;
  
  if (input.id === 'weight' && currentValue) {
    if (newUnit === 'lbs' && !input.dataset.unit || input.dataset.unit === 'kg') {
      input.value = (currentValue * 2.20462).toFixed(1);
    } else if (newUnit === 'kg' && input.dataset.unit === 'lbs') {
      input.value = (currentValue / 2.20462).toFixed(1);
    }
  } else if (input.id === 'height' && currentValue) {
    if (newUnit === 'ft' && (!input.dataset.unit || input.dataset.unit === 'cm')) {
      input.value = (currentValue / 30.48).toFixed(1);
      input.placeholder = "5.8";
    } else if (newUnit === 'cm' && input.dataset.unit === 'ft') {
      input.value = (currentValue * 30.48).toFixed(0);
      input.placeholder = "175";
    }
  }
  
  input.dataset.unit = newUnit;
}

function toggleAdvancedMacros() {
  const macroControls = document.getElementById('macro-sliders');
  const isChecked = document.getElementById('advanced-macros').checked;
  
  if (isChecked) {
    macroControls.classList.remove('hidden');
  } else {
    macroControls.classList.add('hidden');
  }
}

function handleGoalChange() {
  const goal = document.getElementById('fitness-goal').value;
  const preset = appData.macronutrientPresets[goal];
  
  if (preset && !document.getElementById('advanced-macros').checked) {
    // Update slider values with preset
    updateSliders(preset);
  }
}

function updateSliders(preset) {
  document.getElementById('protein-slider').value = preset.protein * 100;
  document.getElementById('carbs-slider').value = preset.carbs * 100;
  document.getElementById('fat-slider').value = preset.fat * 100;
  updateMacroValues();
}

function initializeSliders() {
  updateMacroValues();
}

function updateMacroValues() {
  const protein = document.getElementById('protein-slider').value;
  const carbs = document.getElementById('carbs-slider').value;
  const fat = document.getElementById('fat-slider').value;
  
  document.getElementById('protein-value').textContent = protein;
  document.getElementById('carbs-value').textContent = carbs;
  document.getElementById('fat-value').textContent = fat;
  
  const total = parseInt(protein) + parseInt(carbs) + parseInt(fat);
  document.getElementById('macro-total').textContent = total;
  
  // Color code the total
  const totalElement = document.getElementById('macro-total');
  if (total === 100) {
    totalElement.style.color = 'var(--color-success)';
  } else {
    totalElement.style.color = 'var(--color-error)';
  }
}

function calculateAndGenerate() {
  if (!validateInputs()) return;
  
  collectUserData();
  calculateMacros();
  generateMealPlan();
  generateShoppingList();
  displayResults();
  
  // Switch to meal plan tab
  switchTab('meal-plan');
}

function validateInputs() {
  const requiredFields = ['age', 'gender', 'weight', 'height', 'activity', 'fitness-goal'];
  
  for (const field of requiredFields) {
    const element = document.getElementById(field);
    if (!element.value) {
      alert(`Please fill in the ${field.replace('-', ' ')} field.`);
      return false;
    }
  }
  
  // Validate macro totals if advanced mode is on
  if (document.getElementById('advanced-macros').checked) {
    const total = parseInt(document.getElementById('macro-total').textContent);
    if (total !== 100) {
      alert('Macro percentages must total 100%');
      return false;
    }
  }
  
  return true;
}

function collectUserData() {
  // Get weight in kg
  let weight = parseFloat(document.getElementById('weight').value);
  const weightUnit = document.querySelector('.unit-btn.active[data-unit]').dataset.unit;
  if (weightUnit === 'lbs') {
    weight = weight / 2.20462;
  }
  
  // Get height in cm
  let height = parseFloat(document.getElementById('height').value);
  const heightUnit = document.querySelector('#height').closest('.input-group').querySelector('.unit-btn.active').dataset.unit;
  if (heightUnit === 'ft') {
    height = height * 30.48;
  }
  
  // Collect allergies
  const allergies = Array.from(document.querySelectorAll('input[name="allergies"]:checked'))
    .map(cb => cb.value);
  
  // Collect dietary preference
  const dietPreference = document.querySelector('input[name="diet-preference"]:checked').value;
  
  // Collect budget
  const budget = document.querySelector('input[name="budget"]:checked').value;
  
  // Collect meal frequency
  const mealFrequency = document.querySelector('input[name="meal-frequency"]:checked').value;
  
  userProfile = {
    age: parseInt(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    weight: weight,
    height: height,
    activity: parseFloat(document.getElementById('activity').value),
    goal: document.getElementById('fitness-goal').value,
    allergies: allergies,
    dietPreference: dietPreference,
    budget: budget,
    mealFrequency: mealFrequency,
    foodDislikes: document.getElementById('food-dislikes').value
  };
}

function calculateMacros() {
  // Calculate BMR using Mifflin-St Jeor equation
  let bmr;
  if (userProfile.gender === 'male') {
    bmr = (10 * userProfile.weight) + (6.25 * userProfile.height) - (5 * userProfile.age) + 5;
  } else {
    bmr = (10 * userProfile.weight) + (6.25 * userProfile.height) - (5 * userProfile.age) - 161;
  }
  
  // Calculate TDEE
  const tdee = bmr * userProfile.activity;
  
  // Get goal preset or custom macros
  let macroRatios;
  if (document.getElementById('advanced-macros').checked) {
    macroRatios = {
      protein: parseInt(document.getElementById('protein-slider').value) / 100,
      carbs: parseInt(document.getElementById('carbs-slider').value) / 100,
      fat: parseInt(document.getElementById('fat-slider').value) / 100,
      calorie_adjustment: 0
    };
  } else {
    macroRatios = appData.macronutrientPresets[userProfile.goal];
  }
  
  // Adjust calories based on goal
  const targetCalories = tdee + macroRatios.calorie_adjustment;
  
  // Calculate macro grams
  const macroGrams = {
    protein: Math.round((targetCalories * macroRatios.protein) / 4),
    carbs: Math.round((targetCalories * macroRatios.carbs) / 4),
    fat: Math.round((targetCalories * macroRatios.fat) / 9)
  };
  
  calculatedMacros = {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    macroGrams: macroGrams,
    macroRatios: macroRatios
  };
}

function generateMealPlan() {
  const mealDistribution = appData.mealFrequencyOptions[userProfile.mealFrequency].distribution;
  const meals = {};
  
  Object.keys(mealDistribution).forEach(mealName => {
    const mealCalories = calculatedMacros.targetCalories * mealDistribution[mealName];
    const mealMacros = {
      protein: calculatedMacros.macroGrams.protein * mealDistribution[mealName],
      carbs: calculatedMacros.macroGrams.carbs * mealDistribution[mealName],
      fat: calculatedMacros.macroGrams.fat * mealDistribution[mealName]
    };
    
    meals[mealName] = generateMealItems(mealCalories, mealMacros, mealName);
  });
  
  generatedMealPlan = {
    meals: meals,
    totalCalories: calculatedMacros.targetCalories,
    totalMacros: calculatedMacros.macroGrams
  };
}

function generateMealItems(targetCalories, targetMacros, mealType) {
  const availableFoods = filterFoodsByRestrictions();
  const mealItems = [];
  let remainingCalories = targetCalories;
  let remainingMacros = { ...targetMacros };
  
  // Prioritize protein first
  if (remainingMacros.protein > 0) {
    const proteinFood = getRandomFood(availableFoods.proteins);
    if (proteinFood) {
      const amount = Math.min(150, Math.max(50, remainingMacros.protein / proteinFood.protein * 100));
      mealItems.push({
        ...proteinFood,
        amount: Math.round(amount),
        macros: {
          protein: Math.round(proteinFood.protein * amount / 100),
          carbs: Math.round(proteinFood.carbs * amount / 100),
          fat: Math.round(proteinFood.fat * amount / 100),
          calories: Math.round(proteinFood.calories * amount / 100)
        }
      });
      
      remainingCalories -= proteinFood.calories * amount / 100;
      remainingMacros.protein -= proteinFood.protein * amount / 100;
      remainingMacros.carbs -= proteinFood.carbs * amount / 100;
      remainingMacros.fat -= proteinFood.fat * amount / 100;
    }
  }
  
  // Add carbs if needed
  if (remainingMacros.carbs > 0 && remainingCalories > 0) {
    const carbFood = getRandomFood(availableFoods.carbs);
    if (carbFood) {
      const amount = Math.min(200, Math.max(30, remainingMacros.carbs / carbFood.carbs * 100));
      mealItems.push({
        ...carbFood,
        amount: Math.round(amount),
        macros: {
          protein: Math.round(carbFood.protein * amount / 100),
          carbs: Math.round(carbFood.carbs * amount / 100),
          fat: Math.round(carbFood.fat * amount / 100),
          calories: Math.round(carbFood.calories * amount / 100)
        }
      });
      
      remainingCalories -= carbFood.calories * amount / 100;
      remainingMacros.carbs -= carbFood.carbs * amount / 100;
      remainingMacros.fat -= carbFood.fat * amount / 100;
    }
  }
  
  // Add fats
  if (remainingMacros.fat > 0 && remainingCalories > 0) {
    const fatFood = getRandomFood(availableFoods.fats);
    if (fatFood) {
      const amount = Math.min(50, Math.max(10, remainingMacros.fat / fatFood.fat * 100));
      mealItems.push({
        ...fatFood,
        amount: Math.round(amount),
        macros: {
          protein: Math.round(fatFood.protein * amount / 100),
          carbs: Math.round(fatFood.carbs * amount / 100),
          fat: Math.round(fatFood.fat * amount / 100),
          calories: Math.round(fatFood.calories * amount / 100)
        }
      });
    }
  }
  
  // Add vegetables
  const vegetable = getRandomFood(availableFoods.vegetables);
  if (vegetable) {
    const amount = Math.random() * 100 + 50; // 50-150g
    mealItems.push({
      ...vegetable,
      amount: Math.round(amount),
      macros: {
        protein: Math.round(vegetable.protein * amount / 100),
        carbs: Math.round(vegetable.carbs * amount / 100),
        fat: Math.round(vegetable.fat * amount / 100),
        calories: Math.round(vegetable.calories * amount / 100)
      }
    });
  }
  
  return mealItems;
}

function filterFoodsByRestrictions() {
  const filtered = { proteins: [], carbs: [], fats: [], vegetables: [] };
  
  Object.keys(appData.foodDatabase).forEach(category => {
    filtered[category] = appData.foodDatabase[category].filter(food => {
      // Check allergies
      const hasAllergy = userProfile.allergies.some(allergy => 
        food.allergies.includes(allergy)
      );
      if (hasAllergy) return false;
      
      // Check dietary restrictions
      if (userProfile.dietPreference !== 'none') {
        if (!food.dietary_restrictions.includes(userProfile.dietPreference)) {
          return false;
        }
      }
      
      return true;
    });
  });
  
  return filtered;
}

function getRandomFood(foods) {
  if (foods.length === 0) return null;
  return foods[Math.floor(Math.random() * foods.length)];
}

function generateShoppingList() {
  const ingredients = {};
  
  Object.values(generatedMealPlan.meals).forEach(meal => {
    meal.forEach(item => {
      if (ingredients[item.name]) {
        ingredients[item.name].amount += item.amount;
        ingredients[item.name].cost += (item.cost_per_100g * item.amount / 100);
      } else {
        ingredients[item.name] = {
          ...item,
          cost: item.cost_per_100g * item.amount / 100
        };
      }
    });
  });
  
  // Group by category
  const categorized = {
    proteins: [],
    carbs: [],
    fats: [],
    vegetables: []
  };
  
  Object.values(ingredients).forEach(ingredient => {
    Object.keys(appData.foodDatabase).forEach(category => {
      if (appData.foodDatabase[category].some(food => food.name === ingredient.name)) {
        categorized[category].push(ingredient);
      }
    });
  });
  
  const totalCost = Object.values(ingredients).reduce((sum, item) => sum + item.cost, 0);
  
  shoppingList = {
    categories: categorized,
    totalCost: totalCost
  };
}

function displayResults() {
  displayNutritionSummary();
  displayMealPlan();
  displayShoppingList();
}

function displayNutritionSummary() {
  const summaryHTML = `
    <div class="nutrition-summary">
      <h3>Your Nutrition Targets</h3>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <div class="nutrition-item__value">${calculatedMacros.bmr}</div>
          <div class="nutrition-item__label">BMR (kcal)</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-item__value">${calculatedMacros.tdee}</div>
          <div class="nutrition-item__label">TDEE (kcal)</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-item__value">${calculatedMacros.targetCalories}</div>
          <div class="nutrition-item__label">Target Calories</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-item__value">${calculatedMacros.macroGrams.protein}g</div>
          <div class="nutrition-item__label">Protein</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-item__value">${calculatedMacros.macroGrams.carbs}g</div>
          <div class="nutrition-item__label">Carbs</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-item__value">${calculatedMacros.macroGrams.fat}g</div>
          <div class="nutrition-item__label">Fat</div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('meal-plan-results').innerHTML = summaryHTML + document.getElementById('meal-plan-results').innerHTML;
}

function displayMealPlan() {
  let mealsHTML = '';
  
  Object.keys(generatedMealPlan.meals).forEach(mealName => {
    const meal = generatedMealPlan.meals[mealName];
    const mealTotals = meal.reduce((totals, item) => ({
      calories: totals.calories + item.macros.calories,
      protein: totals.protein + item.macros.protein,
      carbs: totals.carbs + item.macros.carbs,
      fat: totals.fat + item.macros.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    const mealDisplayName = mealName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    mealsHTML += `
      <div class="card meal-card">
        <div class="card__header">
          <h3>${mealDisplayName}</h3>
          <div class="meal-card__macros">
            <span class="macro-badge">${Math.round(mealTotals.calories)} kcal</span>
            <span class="macro-badge">P: ${Math.round(mealTotals.protein)}g</span>
            <span class="macro-badge">C: ${Math.round(mealTotals.carbs)}g</span>
            <span class="macro-badge">F: ${Math.round(mealTotals.fat)}g</span>
          </div>
        </div>
        <div class="card__body">
          ${meal.map(item => `
            <div class="food-item">
              <div class="food-item__name">${item.name}</div>
              <div class="food-item__amount">${item.amount}g (${getServingDescription(item)})</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  
  document.getElementById('meal-plan-results').innerHTML = document.querySelector('.nutrition-summary').outerHTML + mealsHTML;
}

function displayShoppingList() {
  const categoryNames = {
    proteins: 'Proteins',
    carbs: 'Carbohydrates', 
    fats: 'Healthy Fats',
    vegetables: 'Vegetables'
  };
  
  let listHTML = '';
  let totalCost = 0;
  
  Object.keys(shoppingList.categories).forEach(category => {
    if (shoppingList.categories[category].length > 0) {
      listHTML += `
        <div class="shopping-category">
          <h3>${categoryNames[category]}</h3>
          ${shoppingList.categories[category].map(item => {
            totalCost += item.cost;
            return `
              <div class="shopping-item">
                <div class="shopping-item__info">
                  <input type="checkbox" class="shopping-item__checkbox">
                  <span>${item.name} - ${item.amount}g (${getServingDescription(item)})</span>
                </div>
                <div class="shopping-item__cost">$${item.cost.toFixed(2)}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  });
  
  listHTML += `
    <div class="shopping-total">
      <span>Estimated Total Cost:</span>
      <span>$${shoppingList.totalCost.toFixed(2)} AUD</span>
    </div>
  `;
  
  // Add cost breakdown chart
  listHTML += `
    <div class="chart-card">
      <h3>Cost Breakdown by Category</h3>
      <img src="https://pplx-res.cloudinary.com/image/upload/v1750646305/pplx_code_interpreter/32ac4cc7_zf14de.jpg" alt="Shopping List Cost Breakdown by Food Category" class="chart-image">
    </div>
  `;
  
  document.getElementById('shopping-list-results').innerHTML = listHTML;
}

function getServingDescription(item) {
  // Convert grams to cups/tablespoons where appropriate
  const amount = item.amount;
  
  if (item.name.includes('Oil')) {
    const tbsp = Math.round(amount / 15);
    return `~${tbsp} tbsp`;
  } else if (item.name.includes('Rice')) {
    const cups = (amount / 125).toFixed(1);
    return `~${cups} cups cooked`;
  } else if (item.name.includes('Oats')) {
    const cups = (amount / 40).toFixed(1);
    return `~${cups} cups dry`;
  } else {
    return item.serving;
  }
}

function regenerateMealPlan() {
  generateMealPlan();
  generateShoppingList();
  displayMealPlan();
  displayShoppingList();
}

function printShoppingList() {
  const printContent = document.getElementById('shopping-list-results').innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Shopping List</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .shopping-category h3 { color: #75D244; border-bottom: 2px solid #75D244; }
          .shopping-item { display: flex; justify-content: space-between; padding: 8px 0; }
          .shopping-total { font-weight: bold; margin-top: 20px; padding: 16px; background: #f5f5f5; }
          .chart-card { display: none; }
        </style>
      </head>
      <body>
        <h1>Shopping List</h1>
        ${printContent}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}