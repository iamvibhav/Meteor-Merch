document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const updateLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    };
  
    const updateCartDisplay = () => {
      const cartItems = document.getElementById('cart-items');
      const cartTotalValue = document.getElementById('cart-total-value');
  
      if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
  
        cart.forEach((item, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${item.name} - $${item.price}
            <button class="remove-item" data-index="${index}">Remove</button>
          `;
          cartItems.appendChild(li);
          total += item.price;
        });
  
        cartTotalValue.textContent = total.toFixed(2);
      }
    };
  
    const addToCart = (name, price) => {
      cart.push({ name, price });
      updateLocalStorage();
      updateCartDisplay();
    };
  
    const removeFromCart = (index) => {
      cart.splice(index, 1);
      updateLocalStorage();
      updateCartDisplay();
    };
  
    if (document.querySelector('.add-to-cart')) {
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const product = button.closest('.box');
          const name = product.querySelector('h1').textContent;
          const price = parseFloat(product.querySelector('.price').textContent.replace('$', '').split(' - ')[0]);
          addToCart(name, price);
        });
      });
    }
  
    if (document.getElementById('cart-items')) {
      document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
          const index = e.target.getAttribute('data-index');
          removeFromCart(index);
        }
      });
    }
  
    if (document.getElementById('clear-cart')) {
      document.getElementById('clear-cart').addEventListener('click', () => {
        cart.length = 0;
        updateLocalStorage();
        updateCartDisplay();
      });
    }
  
    updateCartDisplay();
  });
  