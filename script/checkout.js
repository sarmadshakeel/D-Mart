document.addEventListener("DOMContentLoaded", () => {
    const checkoutCartItems = document.getElementById('checkout-cart-items');
    const totalPriceElement = document.getElementById('total-price'); // Make sure this element exists in your HTML
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartDisplay = () => {
        checkoutCartItems.innerHTML = ''; // Clear existing items
        if (cart.length === 0) {
            checkoutCartItems.innerHTML = '<p>Your cart is empty!</p>';
            totalPriceElement.textContent = 'Total Price: $0.00'; // Reset total price
            return;
        }

        let totalPrice = 0; // Initialize total price

        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class="row product mb-3 ">
                <div class="col-12 col-md-4 ">
                    <img src="${product.image}" class="img-fluid rounded-circle" alt="${product.name}">
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-between align-items-center">
                    <h5 class="d-flex align-items-center">${product.name}</h5>
                    <p class="mx-5 mb-0 align-items-center text-warning price">Price: $${product.price}</p>
                </div>
                <div class="col-12 col-md-4 py-3 button-remove ">
                    <button class="btn btn-secondary decrease border-0 rounded-circle" data-id="${product.id}">-</button>
                    <span class="mx-2">${product.quantity}</span>
                    <button class="btn btn-secondary increase border-0 rounded-circle" data-id="${product.id}">+</button>
                    <i class="fa-solid fa-trash-can remove" data-id="${product.id}"></i>
                </div>
                <div class="col-12 col-md-12">
                <p class="total-price ">Total: $${(product.price * product.quantity).toFixed(2)}</p>
                </div>
            </div>    
            `;
            checkoutCartItems.appendChild(itemDiv);

            // Add to total price
            totalPrice += product.price * product.quantity;
        });

        // Display total price for all items
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    };

    updateCartDisplay();

    // Event delegation for quantity and remove buttons
    checkoutCartItems.addEventListener('click', (event) => {
        const button = event.target;
        const id = button.dataset.id;

        if (button.classList.contains('decrease')) {
            changeQuantity(id, -1);
        } else if (button.classList.contains('increase')) {
            changeQuantity(id, 1);
        } else if (button.classList.contains('remove')) {
            removeProduct(id);
        }
    });

    function changeQuantity(id, change) {
        const product = cart.find(item => item.id === id);
        if (product) {
            product.quantity += change;
            if (product.quantity < 1) product.quantity = 1; // Prevent quantity from going below 1

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();

            Toastify({
                text: change > 0 ? "Quantity increased!" : "Quantity decreased!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: change > 0 ? "green" : "red",
                },
            }).showToast();
        }
    }

    function removeProduct(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    
        Toastify({
            text: "Product removed!",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "red",
            },
        }).showToast();
    
        // Check if the cart is empty and redirect to home page
        if (cart.length === 0) {
            setTimeout(() => {
                window.location.href = 'home.html'; // Replace with your home page
            }); 
        }
    }
    

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let email = document.getElementById('inputEmail4').value;
        let name = document.getElementById('inputName4').value;
        let phone = document.getElementById('inputPhone').value;
        let address2 = document.getElementById('inputAddress2').value;
        let city = document.getElementById('inputCity').value;
        
        
        if (!email || !name || !phone || !address2 || !city) {
            Toastify({
                text: "Please fill in all required fields!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: 'center',
                backgroundColor: "#ff0000",
            }).showToast();
            return;
        }

        const userData = {
            name: name,
            email: email,
            phone: phone,
            address2: address2,
            city: city,
          
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.removeItem('cart');
        alert('Thank you for your purchase!');
    
        window.location.href = 'home.html';
    });
});




/// <button class="btn btn-danger my-3"></button>