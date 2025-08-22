const foodContainerMeals = document.getElementById("foodMenu");
const categoryContent = document.getElementById("categoryContent");
let priceCounter = 19



const letters = "abcdefghijklmnopqrstuvwxyz".split("");
let allMeals = [];

async function getAllMealsByLetters() {
  await Promise.all(
    letters.map(async (letter) => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      const json = await res.json();
      if (json.meals) { 
        const simplified = json.meals.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          category: meal.strCategory,
          image: meal.strMealThumb,
          orginalPrice : (priceCounter += (30 / 100)).toFixed(2) 
        }));
        allMeals = allMeals.concat(simplified);
      }
    })
  );

  console.log("Total meals fetched:", allMeals.length);
  //   console.table(allMeals);

  showAllMeal(allMeals);
  getCategories(allMeals);
}


getAllMealsByLetters();

// get all meals
function showAllMeal(MealsData) { 
  
  let MealsFetched = MealsData.map((item , index ) => { 

    let { id, title, category, image , orginalPrice  } = item;



    return ` <div class="food-card">
              <div class="food-image">
                <img src=${image} alt="Double Beef Burger" />
              </div>
              <div class="food-details">
                <h3>${title}</h3>
                <p class="price"> $ ${orginalPrice}</p>
              </div>
              <div class="add-to-cart">
                <button class="add-to-cart-btn btn">Add to Cart</button>
              </div>
            </div>
           `;
  });

  MealsFetched = MealsFetched.join("\n");

  foodContainerMeals.innerHTML = MealsFetched;
}


function getCategories(MealsData) {
  let uniqueCategory = [...new Set(MealsData.map((meal) => meal.category))];

  // console.log(uniqueCategory);

  let categoryFiltered = uniqueCategory.map((categoryType) => { 

    return `  <span class="btn" onclick="filterMealsByCategory(allMeals,event)" >${categoryType}</span> `;
  });

  categoryFiltered = categoryFiltered.join("\n");

  categoryContent.innerHTML = categoryFiltered;
}



function filterMealsByCategory(Meals, e ) {
 
  let filterTypeTarget = e.target.textContent.trim()

  let filteredFood = Meals.filter( meal =>  meal.category === filterTypeTarget )
  
  
  let foodAfterFilter =  filteredFood.map( food => {

      return ` <div class="food-card">
              <div class="food-image">
                <img src=${food.image} alt="${food.title}" />
              </div>
              <div class="food-details">
                <h3>${food.title}</h3>
                <p class="price"> $ ${food.orginalPrice}</p>
              </div>
              <div class="add-to-cart">
                <button class="add-to-cart-btn btn">Add to Cart</button>
              </div>
            </div>
           `;

  })


  foodAfterFilter = foodAfterFilter.join('\n') 

  foodContainerMeals.innerHTML = foodAfterFilter

 
}

