function addIngredient() {
    let ingredientGroup = document.querySelector(".ingredient-group");
    let newIngredient = document.createElement("div");
    newIngredient.innerHTML = `
              <div class="mb-2">
                  <input type="text" class="border border-gray-400 p-2 rounded-lg w-1/2 mr-2" placeholder="Ingredient" name="ingredient">
                  <input type="text" class="border border-gray-400 p-2 rounded-lg w-1/2" placeholder="Quantity" name="quantity">
              </div>
          `;
    ingredientGroup.appendChild(newIngredient);
}

function addInstruction() {
    const instructionGroup = document.querySelector(".instruction-group");
    const newInstruction = document.createElement("div");
    newInstruction.innerHTML = `
              <div class="mb-2">
                  <input class="border border-gray-400 p-2 rounded-lg w-full" type="text" name="instruction" required>
              </div>
          `;
    instructionGroup.appendChild(newInstruction);
}