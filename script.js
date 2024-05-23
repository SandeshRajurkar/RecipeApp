const searchBox = document.querySelector('.searchBox');
const searchButton = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// function to get Recipies
const fetchRecipes = async (query) =>{
    recipecontainer.innerHTML= "<h2>Fetching Recipes...</h2>"
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    
        recipecontainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div'); // creating div using javasript createElement
            recipeDiv.classList.add('recipe');               // classList.add method add classname to element
            recipeDiv.innerHTML=`
                <img src= "${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `
    
            const button = document.createElement('button');
            button.textContent = "view Recipe";
            recipeDiv.appendChild(button);
    
            // adding event lister to recipe button
            button.addEventListener('click', ()=>{
                openRecipePopup(meal);
            })
    
            recipecontainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipecontainer.innerHTML= "<h2>Error in Fetching Recipes...</h2>"
    }
   
}


const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="IngredientList">${fetchIngredents(meal)}</ul>
        <div class="RecipeInstructions>
            <h3>Instructiosn:</h3>
            <p">${meal.strInstructions}</p>
        </div>
    `
    
    recipeDetailsContent.parentElement.style.display="block";
}

//fucntion to fetch ingredents and measurements
const fetchIngredents = (meal) =>{
    let ingredentsList = "";
    for(let i=1;i<=20;i++){
        const ingredent = meal[`strIngredient${i}`];
        if(ingredent){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredent}</li>`
        }
        else{
            break;
        }
    }
    return ingredentsList;
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});

searchButton.addEventListener('click',(e) =>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML=`<h2>Type the meal in the search box</h2>`;
        return;
    }

    fetchRecipes(searchInput);
});
