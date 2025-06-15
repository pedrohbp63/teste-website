document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Delicious Burger', description: 'Juicy beef patty with fresh vegetables.', price: 8.99, image: 'burger.jpg' },
        { id: 2, name: 'Crispy Fries', description: 'Golden crispy potato fries.', price: 3.49, image: 'fries.jpg' },
        { id: 3, name: 'Refreshing Drink', description: 'Chilled soft drink.', price: 1.99, image: 'drink.jpg' },
        { id: 4, name: 'Cheesy Pizza', description: 'Hot and cheesy pizza with your favorite toppings.', price: 12.99, image: 'pizza.jpg' }
    ];

    const productsSection = document.getElementById('products');
    const productList = document.createElement('div');
    productList.className = 'product-list';

    let cartItemCount = 0;
    const cartStatus = document.getElementById('cart-status');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}" style="width:100px; height:100px; object-fit: cover;">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    productsSection.innerHTML = '<h2>Our Menu</h2>';
    productsSection.appendChild(productList);

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItemCount++;
            cartStatus.textContent = `Cart (${cartItemCount})`;
            // Optional: Add some visual feedback, like changing button text
            this.textContent = 'Added!';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.disabled = false;
            }, 1000); // Reset button after 1 second
        });
    });
});
