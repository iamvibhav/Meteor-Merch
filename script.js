let searchForm=document.querySelector('.search-form');

document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');

}

let loginForm=document.querySelector('.login-form');

document.querySelector('#login-btn').onclick=()=>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');


}

let navbar=document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick=()=>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll=()=>{
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');

}

var swiper = new Swiper(".product-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });


  var swiper = new Swiper(".review-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });


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
  