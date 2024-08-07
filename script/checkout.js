document.addEventListener("DOMContentLoaded", () => {
    const checkoutCartItems = document.getElementById('checkout-cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        checkoutCartItems.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    const updateCartDisplay = () => {
        checkoutCartItems.innerHTML = ''; // Clear existing items
        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class="row product mb-3 ">
                <div class="col-12 col-md-4 ">
                    <img src="${product.image}" class="img-fluid my-3 rounded-circle " alt="${product.name}">
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-between align-items-center">
                    <h5 class="d-flex align-items-center">${product.name}</h5>
                    <p class="mx-5 mb-0 align-items-center">Price: $${product.price}</p>
                </div>
                <div class="col-12 col-md-4 py-3">
                        <button class="btn btn-secondary decrease" data-id="${product.id}">-</button>
                        <span class="mx-2">${product.quantity}</span>
                        <button class="btn btn-secondary increase" data-id="${product.id}">+</button>
                        <button class="btn btn-danger mt-3 remove" data-id="${product.id}">Remove</button>
                </div>
                <p class="total-price">Total: $${(product.price * product.quantity).toFixed(2)}</p>
            </div>    
            `;
            checkoutCartItems.appendChild(itemDiv);
        });
    };

    updateCartDisplay();

    // Event delegation for quantity and remove buttons
    checkoutCartItems.addEventListener('click', (event) => {
        const target = event.target;
        const productId = target.getAttribute('data-id');

        if (target.classList.contains('remove')) {
            // Remove product
            const updatedCart = cart.filter(product => product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            updateCartDisplay();
        } else if (target.classList.contains('increase')) {
            // Increase quantity
            const product = cart.find(product => product.id === productId);
            if (product) {
                product.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        } else if (target.classList.contains('decrease')) {
            // Decrease quantity
            const product = cart.find(product => product.id === productId);
            if (product && product.quantity > 1) {
                product.quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        }
    });

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let email = document.getElementById('inputEmail4').value;
        let password = document.getElementById('inputPassword4').value;
        let address = document.getElementById('inputAddress').value;
        let address2 = document.getElementById('inputAddress2').value;
        let city = document.getElementById('inputCity').value;
        let state = document.getElementById('inputState').value;
        let zip = document.getElementById('inputZip').value;
        
        if (!email || !password || !address || !address2 || !city || !state || !zip) {
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
            email: email,
            password: password,
            address: address,
            address2: address2,
            city: city,
            state: state,
            zip: zip,
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.removeItem('cart');
        alert('Thank you for your purchase!');
    
        window.location.href = 'home.html';
    });
});

