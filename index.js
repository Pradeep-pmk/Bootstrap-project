
// Cart toggle buttons
const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

// Show/Hide cart when clicking cart icon and close button
btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});
btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

// Load cart content and listeners
function loadFood() {
    loadContent();
}

function loadContent() {
    // Remove food items from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    // Update quantity when changed
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    // Add product to cart
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    // Update the total
    updatetotal();
}

// Remove food items from cart
function removeItem() {
    if (confirm('Are you sure you want to remove this item?')) {
        let title = this.parentElement.querySelector('.cart-cake-title').innerHTML;
        // Filter out the item from the itemList
        itemList = itemList.filter(el => el.title !== title);
        this.parentElement.remove();
        loadContent(); // Reload cart
    }
}

// Change quantity of cart items
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1; // Default to 1 if invalid
    }
    loadContent(); // Reload cart to reflect changes
}

// List to store items in the cart
let itemList = [];

// Add item to cart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.cake-title').innerHTML;
    let price = parseFloat(food.querySelector('.cake-bo').innerHTML.replace('From ₹', ''));
    let imgSrc = food.querySelector('.cake-img').src;

    // Create a new product object
    let newProduct = { title, price, imgSrc };

    // Check if the product already exists in the cart
    if (itemList.find((el) => el.title === newProduct.title)) {
        alert("Product already added to cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    // Create and insert the new product element into the cart
    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;

    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent(); // Reload cart after adding
}

// Function to create HTML structure for the cart product
function createCartProduct(title, price, imgSrc) {
    return `
        <div class="cart-box">
            <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-cake-title">${title}</div>
                <div class="price-box">
                    <div class="cart-price">Rs.${price.toFixed(2)}</div>
                    <div class="cart-amt">Rs.${price.toFixed(2)}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
        </div>
    `;
}

// Update the total price in the cart
function updatetotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;

    // Loop through cart items to calculate total price
    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", "")) || 0;
        let qty = parseFloat(product.querySelector('.cart-quantity').value) || 1;
        total += (price * qty);

        // Update product's total price (amount for this product)
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty).toFixed(2);
    });

    // Update the total price display
    totalValue.innerHTML = "Rs." + total.toFixed(2);

    // Update product count in the cart icon
    const cartCount = document.querySelector('.cart-outline');
    let count = cartItems.length;
    cartCount.innerHTML = count;

    // Toggle the cart count display (hide if no items)
    if (count === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}

// Dummy function to handle placing orders
function placeOrder() {
    if (itemList.length > 0) {
        alert('Order placed successfully!');
    } else {
        alert('Your cart is empty!');
    }
}















/*
const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});
btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);
function loadFood() {
    loadContent();
}

function loadContent() {
    //Remove food items erom cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });


    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    //product add cart
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart)
    });

    updatetotal();
    

}

//remove food items
function removeItem() {
    if (confirm('Are Your Sure to Remove')){
        let title=this.parentElement.querySelector('.cart-cake-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    }
}

//change event
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;

    }
loadContent();
}
let itemList=[];


//Add cart    
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.cake-title').innerHTML;
    let price = food.querySelector('.cake-bo').innerHTML;
    let imgSrc = food.querySelector('.cake-img').src;
    //  console.log(title,price,imgSrc);


    let newProduct={title,price,imgSrc}
    
    //check product already exist in cart
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert("product already Added in cart");
        return;
    }else{
        itemList.push(newProduct);
    }

    let newProductElement = createCartproduct(title, price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;

    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}


function createCartproduct(title, price, imgSrc) {
    return `
<div class="cart-box">
                        <img src="${imgSrc}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-cake-title">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
                    </div>
                    `;

}


function updatetotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;

    // Loop through cart items to calculate the total price and update each product's amount
    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", "")) || 0; // Ensure price is a valid number
        let qty = parseFloat(product.querySelector('.cart-quantity').value) || 0; // Ensure quantity is a valid number
        total += (price * qty);

        // Update each product's total amount
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty).toFixed(2); // Fix to 2 decimal points for better formatting
    });

    // Update the total price value
    totalValue.innerHTML = "Rs." + total.toFixed(2); // Fix to 2 decimal points

    // Add product count in cart icon
    const cartCount = document.querySelector('.cart-outline');
    let count = cartItems.length;  // Use cartItems to get the count of products in the cart
    cartCount.innerHTML = count;

    // Toggle cart count display based on the number of items
    if (count == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}

*/













