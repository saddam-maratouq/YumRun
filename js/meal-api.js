const foodContainerMeals = document.getElementById("foodMenu");
const categoryContent = document.getElementById("categoryContent");
let priceCounter = 19

let cartFoodNumber = document.getElementById('numOfFood') 
console.log(cartFoodNumber);



// to show cart when refresh 
window.addEventListener('DOMContentLoaded', () => {
  // your code here
    updateCart() 
});



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



    return ` <div class="food-card"  data-id=${id} >
              <div class="food-image">
                <img src=${image} alt="Double Beef Burger" />
              </div>
              <div class="food-details">
                <h3>${title}</h3>
                <p class="price"> $ ${orginalPrice}</p>
              </div>
              <div class="add-to-cart">
                <button type='button' class="add-to-cart-btn btn"  >Add to Cart</button>
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

   e.preventDefault(); 
 
  let filterTypeTarget = e.target.textContent.trim()

  let filteredFood = Meals.filter( meal =>  meal.category === filterTypeTarget )
  
  
  let foodAfterFilter =  filteredFood.map( food => {

      return ` <div class="food-card"   data-id=${food.id} >
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



// helper function 

function getCartStorage() {
  return  JSON.parse(localStorage.getItem('Cart'))  ||  []  
     
}




function addFoodToCart(foodId){


  let  cartItems =  JSON.parse(localStorage.getItem('Cart'))  ||  []  


  let selectedItem = allMeals.find( meal => meal.id == foodId  ) 

  console.log(selectedItem);
  
  cartItems.push({...selectedItem , quantity : 1  }) 
  
  // store cart 
  localStorage.setItem('Cart',JSON.stringify(cartItems))


  updateCart() 


}


const cartList = document.getElementById('cart-list') 
console.log(cartList);



function updateCart() {

  let  cartItems =  JSON.parse(localStorage.getItem('Cart'))  ||  []  


  let cartProducts = cartItems.map(item => {

    let {category , id , image , orginalPrice , quantity , title}  = item 

 
  
    return `  
        <div class="food-item" data-id =${id}  >
          <i class="fa-solid fa-trash-alt trash-icon "></i>
            <img src=${image} alt=${title}> 
            <div class="info">
              <h3 title=${title}  > ${title} </h3>
              <p>$${orginalPrice}</p>
            </div> 
            <div class="quantity-btns" > 
              <a  class="quantity-btn" href=""> + </a> 
              <span> ${quantity} </span>
              <a  class="quantity-btn" href="">-</a>
            </div>
          </div> 
    `
  } )

  cartProducts = cartProducts.join('\n') 

  cartList.innerHTML = cartProducts

  cartFoodNumber.textContent = cartItems.length



}




  // catch btn clicked event delegation 
// one listener for all add-to-cart buttons 
foodContainerMeals.addEventListener('click', (e) => {
  
  const btn = e.target.closest('.add-to-cart-btn');
   
  if (!btn) return; // click not on btn an add button (img text etc ... )

  // const card = btn.closest('.food-card');
  const card = e.target.closest('.food-card') 
  console.log(card); 

  if (!card) return;

  const id = card.dataset.id; 
 
  addFoodToCart(id);  

  btn.classList.add('in-cart') 
  btn.textContent = 'item in cart' 
  
});





// catch btn trash to remove from cart 

cartList.addEventListener('click' , e => { 
 

    let  trashbtn = e.target.closest('.trash-icon') 
    if (!trashbtn) return 

    const cardItem = e.target.closest('.food-item') 
    if (!cardItem) return

    // console.log(cardItem);
    

   let cardId =  cardItem.dataset.id 
  //  console.log(cardId) ; 

  
   //  remove from cart 
  let cartStorage = getCartStorage()  

  
  cartStorage = cartStorage.filter(item => item.id !== cardId);

  localStorage.setItem('Cart', JSON.stringify(cartStorage));

  updateCart() 
   
    
})






