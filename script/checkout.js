document.addEventListener("DOMContentLoaded", () => {
    const checkoutCartItems = document.getElementById('checkout-cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        checkoutCartItems.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="row product mb-3 ">
             <div class="col-12 col-md-6 ">
                <img src="${product.image}" class="img-fluid my-3 rounded-circle " alt="${product.name}">
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-between">
                <h5 class="d-flex align-items-center">${product.name}</h5>
                <p class="mx-5 d-flex mb-0 align-items-center">Price: $${product.price} </p>
            </div>
                <p class="total-price">Total: $${(product.price * product.quantity).toFixed(2)}</p>
        </div>    
        `;
        checkoutCartItems.appendChild(itemDiv);
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
                gravity: "top", // top or bottom
                position: 'center', // left, center or right
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
        // Handle form submission and clear cart
        localStorage.removeItem('cart');
        alert('Thank you for your purchase!');
    
        window.location.href = 'home.html'; // Redirect back to the main page
    });
});
