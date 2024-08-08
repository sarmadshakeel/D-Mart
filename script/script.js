document.querySelectorAll('.rating input').forEach((input) => {
    input.addEventListener('change', (event) => {
        alert(`You rated this ${event.target.value} stars`);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Sumsung", isNew: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_7.jpg", onSale: false, topSeller: 3, price: "$100", description: "Description for Product 1" },
        { id: 2, name: "IPhoneX Protector", isNew: false, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_6.jpg", onSale: false, topSeller: 6, price: "$150", description: "Description for Product 2" },
        { id: 3, name: "Wireless Charger", isNew: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_8.jpg", onSale: true, topSeller: 5, price: "$200", description: "Description for Product 3" },
        { id: 4, name: "Snaker Shoes", isNew: false, onSale: false, image: "https://dmartpakistan.com/wp-content/uploads/2018/09/prod-5-3.jpg", topSeller: 8, price: "$250", description: "Description for Product 4" },
        { id: 5, name: "Charging Stand", isNew: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_10.jpg", onSale: false, topSeller: 2, price: "$900", description: "Description for Product 5" },
        { id: 6, name: "Mafrul", isNew: false, onSale: false, image: "https://dmartpakistan.com/wp-content/uploads/2018/09/prod-2-3.jpg", topSeller: 10, price: "$350", description: "Description for Product 6" },
        { id: 7, name: "Mafrul", isNew: false, onSale: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_1.jpg", topSeller: 10, price: "$1150", description: "Description for Product 7" },
        { id: 8, name: "Mafrul", isNew: false, onSale: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_12.jpg", topSeller: 15, price: "$850", description: "Description for Product 8" },
        { id: 9, name: "Mafrul", isNew: false, onSale: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_4.jpg", topSeller: 9, price: "$450", description: "Description for Product 9" }
    ];

    function renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "col-12 col-md-4 mb-3";
            productDiv.innerHTML = `
                <div class="card product-card border border-0 position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <div class="rating1">
                            <input type="radio" id="star1-${product.id}" name="rating-${product.id}" value="1" /><label for="star1-${product.id}" title="1 stars">☆</label>
                            <input type="radio" id="star2-${product.id}" name="rating-${product.id}" value="2" /><label for="star2-${product.id}" title="2 stars">☆</label>
                            <input type="radio" id="star3-${product.id}" name="rating-${product.id}" value="3" /><label for="star3-${product.id}" title="3 stars">☆</label>
                            <input type="radio" id="star4-${product.id}" name="rating-${product.id}" value="4" /><label for="star4-${product.id}" title="4 stars">☆</label>
                            <input type="radio" id="star5-${product.id}" name="rating-${product.id}" value="5" /><label for="star5-${product.id}" title="5 stars">☆</label>
                        </div>
                        <p class="price d-block text-center">${product.price}</p>
                        <p class="card-text text-center">${product.description}</p>
                    </div>
                    <div class="elements">
                        <i class="fa-solid fa-right-left mt-2"></i>
                        <i class="fa-solid fa-cart-shopping mt-2 add-to-cart" type="button" data-id="${product.id}" data-image="${product.image}" data-name="${product.name}" data-price="${product.price.replace('$', '')}"></i>
                        <i class="fa-regular fa-heart mt-2"></i>
                        <i class="fa-regular fa-eye mt-2"></i>
                    </div>
                </div>
            `;
            container.appendChild(productDiv);
        });
        // Add event listeners to "Add to cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function filterProducts() {
        const newProducts = products.filter(product => product.isNew);
        const onSaleProducts = products.filter(product => product.onSale);
        const topSellerProducts = products.filter(product => product.topSeller > 5);

        renderProducts(newProducts, "home-products");
        renderProducts(onSaleProducts, "profile-products");
        renderProducts(topSellerProducts, "contact-products");
    }

    function addToCart(event) {
        const button = event.target;
        const id = button.dataset.id;
        const image = button.dataset.image;
        const name = button.dataset.name;
        const price = button.dataset.price;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = { id, image, name, price };

        // Check if product already in cart
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            Toastify({
                text: "Product Added Successfully!",
                duration: 2000,
                close: true,
                gravity: "top", // top or bottom
                position: "left",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            existingProduct.quantity++;
        } else {
            Toastify({
                text: "Product Added Successfully!",
                duration: 2000,
                close: true,
                gravity: "top", // top or bottom
                position: "left",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.querySelector('.total-count').textContent = cart.reduce((total, product) => total + product.quantity, 0);
    }

    function showCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty</p>";
            return;
        }

        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "cart-item col-12 col-md-4 mb-3";
            itemDiv.innerHTML = `
              <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">Price: $${product.price}</p>
                      <p class="card-text">Quantity: ${product.quantity}</p>
                      <button data-id="${product.id}" class="btn btn-danger remove-from-cart">Remove</button>
                  </div>
              </div>
            `;
            cartItems.appendChild(itemDiv);
        });
    }

    // Initial render
    filterProducts();
    updateCartCount();

    // Event listeners for tabs
    document.getElementById("home-tab").addEventListener("click", () => renderProducts(products.filter(product => product.isNew), "home-products"));
    document.getElementById("profile-tab").addEventListener("click", () => renderProducts(products.filter(product => product.onSale), "profile-products"));
    document.getElementById("contact-tab").addEventListener("click", () => renderProducts(products.filter(product => product.topSeller > 7), "contact-products"));

    // Event listener for cart modal
    document.getElementById('cartModal').addEventListener('show.bs.modal', showCart);
});






//second tabs js
 // <button type="button" data-id="${product.id}" data-image="${product.image}" data-name="${product.name}" data-price="${product.price.replace('$', '')}" class="default-btn border-radius-5 text-center d-block mx-auto mt-3 add-to-cart">Add to cart</button>
// document.addEventListener("DOMContentLoaded", () => {
//     const products = [
//         { id: 1, name: "Sumsung", isNew: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_3.jpg", onSale: false, topSeller: 3, price: 100, description: "Description for Product 1" },
//         { id: 2, name: "IPhoneX Protector", isNew: false, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_12.jpg", onSale: true, topSeller: 6, price: 150, description: "Description for Product 2" },
//         { id: 3, name: "Wireless Charger", isNew: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_4.jpg", onSale: true, topSeller: 5, price: 200, description: "Description for Product 3" },
//         { id: 4, name: "Charging Stand", isNew: false, onSale: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_1.jpg", topSeller: 8, price: 250, description: "Description for Product 4" },
//         { id: 5, name: "Snaker Shoes", isNew: true, image: "https://dmartpakistan.com/wp-content/uploads/2018/11/ele_5.jpg", onSale: false, topSeller: 2, price: 300, description: "Description for Product 5" },
//         { id: 6, name: "Mafrul", isNew: false, onSale: false, image: "https://dmartpakistan.com/wp-content/uploads/2018/09/prod-2-3.jpg", topSeller: 10, price: 350, description: "Description for Product 6" },
//     ];

//     function renderProducts(products, containerId) {
//         const container = document.getElementById(containerId);
//         container.innerHTML = "";
//         products.forEach(product => {
//             const productDiv = document.createElement("div");
//             productDiv.className = "col-12 col-md-4 mb-3";
//             productDiv.innerHTML = `
//                 <div class="card product-card border border-0 position-relative">
//                     <img src="${product.image}" class="card-img-top" alt="${product.name}">
//                     <div class="card-body">
//                         <div class="rating1">
//                             <input type="radio" id="star1-${product.id}" name="rating-${product.id}" value="1" /><label for="star1-${product.id}" title="1 stars">☆</label>
//                             <input type="radio" id="star2-${product.id}" name="rating-${product.id}" value="2" /><label for="star2-${product.id}" title="2 stars">☆</label>
//                             <input type="radio" id="star3-${product.id}" name="rating-${product.id}" value="3" /><label for="star3-${product.id}" title="3 stars">☆</label>
//                             <input type="radio" id="star4-${product.id}" name="rating-${product.id}" value="4" /><label for="star4-${product.id}" title="4 stars">☆</label>
//                             <input type="radio" id="star5-${product.id}" name="rating-${product.id}" value="5" /><label for="star5-${product.id}" title="5 stars">☆</label>
//                         </div>
//                         <p class="price text-center">$${product.price}</p>
//                         <p class="card-text text-center">${product.description}</p>
//                         <button type="button" data-id="${product.id}" data-image="${product.image}" data-name="${product.name}" data-price="${product.price}" class="default-btn border-radius-5 text-center d-block mx-auto mt-3 add-to-cart">Add to cart</button>
//                     </div>
//                     <div class="elements">
//                         <i class="fa-solid fa-right-left mt-2"></i>
//                         <i class="fa-solid fa-cart-shopping mt-2"></i>
//                         <i class="fa-regular fa-heart mt-2"></i>
//                         <i class="fa-regular fa-eye mt-2"></i>
//                     </div>
//                 </div>
//             `;
//             container.appendChild(productDiv);
//         });
//         document.querySelectorAll('.add-to-cart').forEach(button => {
//             button.addEventListener('click', addToCart);
//         });
//     }

//     function filterProducts(criteria) {
//         let filteredProducts = [];
//         if (criteria === 'isNew') {
//             filteredProducts = products.filter(product => product.isNew);
//             renderProducts(filteredProducts, "new-products");
//         } else if (criteria === 'onSale') {
//             filteredProducts = products.filter(product => product.onSale);
//             renderProducts(filteredProducts, "sail-products");
//         } else if (criteria === 'topSeller') {
//             filteredProducts = products.filter(product => product.topSeller > 8);
//             renderProducts(filteredProducts, "seller-products");
//         }
//     }

//     function addToCart(event) {
//         const button = event.target;
//         const id = button.dataset.id;
//         const image = button.dataset.image;
//         const name = button.dataset.name;
//         const price = button.dataset.price;

//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const product = { id, image, name, price };

//         const existingProduct = cart.find(item => item.id === id);
//         if (existingProduct) {
//             existingProduct.quantity++;
//         } else {
//             product.quantity = 1;
//             cart.push(product);
//         }

//         localStorage.setItem('cart', JSON.stringify(cart));
//         updateCartCount();
//     }

//     function updateCartCount() {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         document.querySelector('.total-count').textContent = cart.reduce((total, product) => total + product.quantity, 0);
//     }

//     function showCart() {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const cartItems = document.getElementById('cart-items');
//         cartItems.innerHTML = "";

//         if (cart.length === 0) {
//             cartItems.innerHTML = "<p>Your cart is empty</p>";
//             return;
//         }

//         cart.forEach(product => {
//             const itemDiv = document.createElement('div');
//             itemDiv.className = "cart-item";
//             itemDiv.innerHTML = `
//               <p>${product.name} - $${product.price} x ${product.quantity}</p>
//               <div>
//                 <button class="increment-quantity" data-id="${product.id}">+</button>
//                 <button class="decrement-quantity" data-id="${product.id}">-</button>
//               </div>
//               <img src="${product.image}" alt="${product.name}" width="50">
//             `;
//             cartItems.appendChild(itemDiv);
//         });

//         document.querySelectorAll('.increment-quantity').forEach(button => {
//             button.addEventListener('click', incrementQuantity);
//         });

//         document.querySelectorAll('.decrement-quantity').forEach(button => {
//             button.addEventListener('click', decrementQuantity);
//         });
//     }

//     function incrementQuantity(event) {
//         const id = event.target.dataset.id;
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];

//         const product = cart.find(item => item.id === id);
//         if (product) {
//             product.quantity++;
//         }

//         localStorage.setItem('cart', JSON.stringify(cart));
//         showCart();
//         updateCartCount();
//     }

//     function decrementQuantity(event) {
//         const id = event.target.dataset.id;
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];

//         const product = cart.find(item => item.id === id);
//         if (product && product.quantity > 1) {
//             product.quantity--;
//         } else if (product) {
//             const index = cart.findIndex(item => item.id === id);
//             cart.splice(index, 1);
//         }

//         localStorage.setItem('cart', JSON.stringify(cart));
//         showCart();
//         updateCartCount();
//     }

//     filterProducts('isNew');
//     updateCartCount();

//     document.getElementById("new-tab").addEventListener("click", () => filterProducts('isNew'));
//     document.getElementById("sail-tab").addEventListener("click", () => filterProducts('onSale'));
//     document.getElementById("seller-tab").addEventListener("click", () => filterProducts('topSeller'));

//     document.getElementById('cartModal').addEventListener('show.bs.modal', showCart);
// });
