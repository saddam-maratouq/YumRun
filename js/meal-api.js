const foodContainerMeals = document.getElementById("foodMenu");
const categoryContent = document.getElementById("categoryContent");
let priceCounter = 19;

let cartFoodNumber = document.getElementById("numOfFood");

let sucssesPopUp = document.getElementById('pay-sucsses') 


{
  let  cartPopUp = document.getElementById("cartPopup"); 
 
}



// to show cart when refresh
window.addEventListener("DOMContentLoaded", () => {
  // your code here
  updateCart();
  // restoreCartButtons()
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
          orginalPrice: (priceCounter += 30 / 100).toFixed(2),
        }));
        allMeals = allMeals.concat(simplified);
      }
    })
  );

  console.log("Total meals fetched:", allMeals.length);
    console.log(allMeals);

  showAllMeal(allMeals);
  getCategories(allMeals);
}

getAllMealsByLetters(); 

// get all meals
function showAllMeal(MealsData) {  
  
  let MealsFetched = MealsData.map((item, index) => {
    let { id, title, category, image, orginalPrice } = item;

    const cart = getCartStorage();

    let inCart = cart.some((item) => String(item.id) === String(id));
      //  return cart.some(item => String(item.id) === String(id));
    console.log(inCart);

    const btnClass = inCart ? "add-to-cart-btn btn in-cart"  : "add-to-cart-btn btn"; 
     
    const btnText = inCart ? "Item in cart" : "Add to Cart";

    return ` <div class="food-card"  data-id=${id} >
              <div class="food-image">
                <img  fetchpriority="high" loading="lazy"  src=${image} alt="Double Beef Burger" />
              </div>
              <div class="food-details">
                <h3>${title}</h3>
                <p class="price"> $ ${orginalPrice}</p>
              </div>
              <div class="add-to-cart">
              <button type="button" class="${btnClass}">${btnText}</button>
              </div>
            </div>
           `;
  });

  // class="  ${isCart} ?  add-to-cart-btn btn" :  add-to-cart-btn btn

  MealsFetched = MealsFetched.join("\n");

  foodContainerMeals.innerHTML = MealsFetched;
}


function getCategories(MealsData) {
  let uniqueCategory = [...new Set(MealsData.map((meal) => meal.category))];

  // console.log(uniqueCategory);

  let categoryFiltered = uniqueCategory.map((categoryType) => {
    return `  <span class="btn btn-category "  id='btn-filter' onclick="filterMealsByCategory(allMeals,event)" >${categoryType}</span> `;
  });

  categoryFiltered = categoryFiltered.join("\n");

  categoryContent.innerHTML = categoryFiltered; 


  // active btn filter 

let btnElments = document.querySelectorAll("#btn-filter");
console.log( 'btn filter is '  ,btnElments);



btnElments.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // find first elment has this class name in entire dom ...
    document.querySelector('.btn-category.active')
    document.querySelector('.btn-category.active')?.classList.remove("active"); // ✅ no error, just skips

    btn.classList.add("active");
  });
});


//




}


function filterMealsByCategory(Meals, e) {
  e.preventDefault();

  let filterTypeTarget = e.target.textContent.trim();

  let filteredFood = Meals.filter((meal) => meal.category === filterTypeTarget);

  let foodAfterFilter = filteredFood.map((food) => { 

       const cart = getCartStorage();

    let inCart = cart.some((item) => String(item.id) === String(food.id));
      //  return cart.some(item => String(item.id) === String(id));
    console.log(inCart);

    const btnClass = inCart ? "add-to-cart-btn btn in-cart"  : "add-to-cart-btn btn"; 
     
    const btnText = inCart ? "Item in cart" : "Add to Cart";



    return ` <div class="food-card"   data-id=${food.id} >
              <div class="food-image">
                <img src=${food.image} alt="${food.title}" />
              </div>
              <div class="food-details">
                <h3>${food.title}</h3>
                <p class="price"> $ ${food.orginalPrice}</p>
              </div>
              <div class="add-to-cart">
              <button type="button" class="${btnClass}">${btnText}</button>
              </div>
            </div>
           `;
  });

  foodAfterFilter = foodAfterFilter.join("\n");

  foodContainerMeals.innerHTML = foodAfterFilter; 
}

// helper function

function getCartStorage() {
  return JSON.parse(localStorage.getItem("Cart")) || [];
}


function ClearCart() { 
  
  let cartItems =  []; 
  localStorage.setItem("Cart", JSON.stringify(cartItems));

  updateCart() 

  totalPrice.textContent = 0 
  cartPopUp.classList.remove("cart-active");

  sucssesPopUp.classList.add('active') 

  setTimeout(() => {
    sucssesPopUp.classList.remove('active') 
  }, 2500);

  // handle class add in cart later 
  setTimeout(() => {
  location.reload();
}, 3000);

}

// 

function addFoodToCart(foodId) {
 

  let cartItems = JSON.parse(localStorage.getItem("Cart")) || [];

  let selectedItem = allMeals.find((meal) => meal.id == foodId);

  // console.log(selectedItem);

  cartItems.push({ ...selectedItem, quantity: 1 });

  // store cart
  localStorage.setItem("Cart", JSON.stringify(cartItems));

  updateCart();
}

const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById('cartTotal')




function updateCart() { 

  let cartItems = JSON.parse(localStorage.getItem("Cart")) || [];

   let total = 0 ;

  let cartProducts = cartItems.map((item,index) => {
    let { category, id, image, orginalPrice, quantity, title  } = item;

    let subTotalItem = Math.floor(orginalPrice * quantity * 100) / 100; 

   
     total += subTotalItem 
    //  console.log( typeof total);
     
         
     totalPrice.textContent = `$${total.toFixed(2)}` 
     

    return `  
        <div class="food-item" data-id =${id}  >
          <i class="fa-solid fa-trash-alt trash-icon "></i>
            <img src=${image} alt=${title}> 
            <div class="info">
              <h3 title=${title}  > ${title} </h3>
              <p>$${subTotalItem}</p>
            </div> 
            <div class="quantity-btns" > 
              <a  onclick='increseQuantity(${index})'  class="quantity-btn" > + </a> 
              <span> ${quantity} </span>
              <a   onclick='decreseQuantity(${index})' class="quantity-btn" >-</a>
            </div>
          </div> `; 
  });

  cartProducts = cartProducts.join("\n");

  cartList.innerHTML = cartProducts;

  cartFoodNumber.textContent = cartItems.length;

  // restoreCartButtons()
}


function increseQuantity(index) { 
    const cart = getCartStorage() 
    cart[index].quantity += 1 ; 
    localStorage.setItem('Cart',JSON.stringify(cart)) 
    updateCart() 

}


function decreseQuantity(index) { 
    const cart = getCartStorage() 
    if (cart[index].quantity > 1 ) {
      cart[index].quantity -= 1 ; 
    }
    localStorage.setItem('Cart',JSON.stringify(cart)) 
    updateCart() 
}


// catch btn clicked
// one listener for all add-to-cart buttons
foodContainerMeals.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart-btn");

  if (!btn) return; // click not on btn an add button (img text etc ... )

  // const card = btn.closest('.food-card');
  const card = e.target.closest(".food-card");
  // console.log(card);

  if (!card) return;

  const id = card.dataset.id;

  addFoodToCart(id);

  btn.classList.add("in-cart");
  btn.textContent = "Item in cart";
});

// catch btn trash to remove from cart
cartList.addEventListener("click", (e) => {
  let trashbtn = e.target.closest(".trash-icon");
  if (!trashbtn) return;

  const cardItem = e.target.closest(".food-item");
  if (!cardItem) return;

  let cardId = cardItem.dataset.id;

  //  remove from cart
  let cartStorage = getCartStorage();

  cartStorage = cartStorage.filter((item) => item.id !== cardId);

  localStorage.setItem("Cart", JSON.stringify(cartStorage));

  updateCart();

  // reset add to cart btn after delete from cart
  const card = document.querySelector(`.food-card[data-id="${cardId}"]`);
  //  console.log('card is ' , card);

  if (card) {
    const btn = card.querySelector(".add-to-cart-btn");

    if (btn) {
      btn.classList.remove("in-cart");
      btn.textContent = "Add to cart";
    }
  }


});



