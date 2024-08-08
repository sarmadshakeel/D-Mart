document.addEventListener("DOMContentLoaded", () => {

    function calculateTotalPrice(product) {
        return product.quantity * product.price;
    }

    function showCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center d-block mx-auto">Your cart is empty!</p>';
            document.getElementById('total-price').textContent = '';
            return;
        }

        let totalPrice = 0;

        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item mb-3 border border-2 border-black rounded mx-auto py-3';
            itemDiv.innerHTML = `
                <div class="col-4 m-auto">
                    <img src="${product.image}" class="img-fluid" alt="${product.name}">
                </div>
                <div class="col-4 m-auto">
                    <h5>${product.name}</h5>
                    <p class="text-warning">$${product.price}</p>
                    <div class="">
                        <button class="btn btn-sm btn-danger decrease-quantity" data-id="${product.id}">-</button>
                        <span class="mx-2">${product.quantity}</span>
                        <button class="btn btn-sm btn-primary increase-quantity" data-id="${product.id}">+</button>
                        <p>Total: $${calculateTotalPrice(product).toFixed(2)}</p>
                        <button class="btn btn-sm btn-danger remove-product" data-id="${product.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(itemDiv);
            totalPrice += calculateTotalPrice(product);
        });

        // Display total price for all items
        document.getElementById('total-price').textContent = `Total Price: $${totalPrice.toFixed(2)}`;

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', changeQuantity);
        });
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', changeQuantity);
        });
        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', removeProduct);
        });
    }

    function changeQuantity(event) {
        const button = event.target;
        const id = button.dataset.id;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const product = cart.find(item => item.id === id);
        if (button.classList.contains('decrease-quantity')) {
            if (product.quantity > 1) {
                product.quantity--;
                Toastify({
                    text: "Quantity decreased!",
                    duration: 2000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "red",
                    },
                }).showToast();
            }
        } else if (button.classList.contains('increase-quantity')) {
            product.quantity++;
            Toastify({
                text: "Quantity increased!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "green",
                },
            }).showToast();
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }

    function removeProduct(event) {
        const button = event.target;
        const id = button.dataset.id;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter(item => item.id !== id);
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

        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }

    function purchaseProducts() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            Toastify({
                text: "Your cart is empty!",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            return;
        }

        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }

    showCart();
    document.getElementById('purchase-btn').addEventListener('click', purchaseProducts);
});