// JavaScript to handle  QTY button :

document.addEventListener('DOMContentLoaded', function() {
function updateQuantity(element, change) {
    const QTYElement = element.parentElement.querySelector('.QTY-value');
    let currentQuantity = parseInt(QTYElement.innerText);
    const itemTitle = element.closest('.box-content').querySelector('h2').innerText;

    // Minimum quantity checks for specific items
    if (itemTitle.includes("Tea") || itemTitle.includes("Coffee")) {
        if (currentQuantity + change < 10) {
            alert(`Minimum quantity of Order for ${itemTitle} is 10`);
            return;
        }
    }

    // Update quantity if it's valid
    currentQuantity = Math.max(currentQuantity + change, 1);
    QTYElement.innerText = currentQuantity;
}

document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('increase')) {
        updateQuantity(event.target, 1);
    } else if (event.target.classList.contains('decrease')) {
        updateQuantity(event.target, -1);
    }
});
});








// JavaScript for opening the SignUp/SingIn page :

document.addEventListener('DOMContentLoaded', () => {
// Get elements
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close-btn');
const signInLink = document.getElementById('sign-in-link');
const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const switchToSignInBtn = document.getElementById('switch-to-sign-in');
const switchToSignUpBtn = document.getElementById('switch-to-sign-up');

// Open modal and show sign-up form by default
signInLink.addEventListener('click', () => {
    modal.style.display = 'block';
    showSignUpForm(); // Show sign-up form by default
});

// Close the modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Switch to Sign In form
switchToSignInBtn.addEventListener('click', () => {
    showSignInForm();
});

// Switch to Sign Up form
switchToSignUpBtn.addEventListener('click', () => {
    showSignUpForm();
});

// Show Sign In form
function showSignInForm() {
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
    switchToSignInBtn.classList.add('active');
    switchToSignUpBtn.classList.remove('active');
}

// Show Sign Up form
function showSignUpForm() {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
    switchToSignInBtn.classList.remove('active');
    switchToSignUpBtn.classList.add('active');
}
});


document.addEventListener('DOMContentLoaded', function() {
    const userTypeSelect = document.getElementById('user-type');
    const idCardUpload = document.getElementById('id-card-upload');
    const otpInput = document.getElementById('sign-up-otp');
    
    // Function to toggle the visibility of the ID card upload field based on user type
    function updateFormFields() {
        if (userTypeSelect.value === 'student') {
            idCardUpload.style.display = 'block';
        } else {
            idCardUpload.style.display = 'none';
        }
    }

    // Initialize form fields based on the default selection
    updateFormFields();

    // Add event listener to handle changes in user type selection
    userTypeSelect.addEventListener('change', updateFormFields);
});

// To handle the redirection of signup form:
document.addEventListener('DOMContentLoaded', function() {
    const userTypeSelect = document.getElementById('user-type');
    const idCardUpload = document.getElementById('id-card-upload');
    const otpInput = document.getElementById('sign-up-otp');
    const signupForm = document.getElementById('signup-form');
    
    function updateFormFields() {
        if (userTypeSelect.value === 'student') {
            idCardUpload.style.display = 'block';
            otpInput.style.display = 'block';
        } else {
            idCardUpload.style.display = 'none';
            otpInput.style.display = 'block'; // Always show OTP field for simplicity
        }
    }


    // stop to redirect in another page :
    
    updateFormFields();
    userTypeSelect.addEventListener('change', updateFormFields);

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(signupForm);

        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            // Handle the response from the PHP script
            alert(result); // Display a success message or error message
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});















// Home Page: Add to cart functionality :

document.addEventListener('DOMContentLoaded', () => {
if (document.querySelectorAll('.add-cart').length) {
    const addToCartButtons = document.querySelectorAll('.add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const boxContent = event.target.closest('.box-content');
            const itemName = boxContent.querySelector('h2').innerText;
            const itemPrice = boxContent.querySelector('p').innerText;
            const itemQty = boxContent.querySelector('.QTY-value').innerText;

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            const existingItemIndex = cartItems.findIndex(item => item.name === itemName);

            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].qty = parseInt(cartItems[existingItemIndex].qty) + parseInt(itemQty);
            } else {
                const item = {
                    name: itemName,
                    price: itemPrice,
                    qty: itemQty
                };
                cartItems.push(item);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`${itemName} added to cart`);
        });
    });
}














// Cart Page: Display cart items :

if (document.querySelector('.cart-list')) {
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total h2');
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('empty-message');
    emptyMessage.innerText = 'Your cart is empty! Please place some Order.';

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    if (cartItems.length === 0) {
        cartList.appendChild(emptyMessage);
        cartTotal.innerText = `Total: ₹0.00`;
    } else {
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('item-details');

            const itemName = document.createElement('h2');
            itemName.innerText = item.name;

            const itemQty = document.createElement('p');
            itemQty.innerText = `Quantity: ${item.qty}`;

            const itemPrice = document.createElement('p');
            const priceValue = parseFloat(item.price.replace('₹', '').replace('/-', ''));
            itemPrice.innerText = `Price: ₹${priceValue}`;

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemQty);
            itemDetails.appendChild(itemPrice);

            const itemActions = document.createElement('div');
            itemActions.classList.add('item-actions');

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.innerText = 'Remove';

            removeBtn.addEventListener('click', () => {
                cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                cartItem.remove();
                if (cartItems.length === 0) {
                    cartList.appendChild(emptyMessage);
                }
                updateTotal();
            });

            itemActions.appendChild(removeBtn);

            cartItem.appendChild(itemDetails);
            cartItem.appendChild(itemActions);

            cartList.appendChild(cartItem);

            total += priceValue * parseInt(item.qty);
        });

        cartTotal.innerText = `Total: ₹${total}`;
    }

    function updateTotal() {
        let newTotal = 0;
        cartItems.forEach(item => {
            const priceValue = parseFloat(item.price.replace('₹', '').replace('/-', ''));
            newTotal += priceValue * parseInt(item.qty);
        });
        cartTotal.innerText = `Total: ₹${newTotal}`;

        if (newTotal === 0) {
            cartTotal.innerText = `Total: ₹0.00`;
            cartList.appendChild(emptyMessage);
        }
    }
}
});







//Navigation from one page to another :

document.addEventListener('DOMContentLoaded', () => {
const homeLink = document.getElementById('home-page');
const signInLink = document.getElementById('sign-in-link');
const OrderHistoryLink = document.getElementById('Order-history-link');
const cartLink = document.getElementById('cart-link');

// Function to switch pages
function switchPage(pageUrl) {
    window.location.href = pageUrl;
}

// Event listeners for navigation links
if (homeLink) {
    homeLink.addEventListener('click', () => {
        switchPage('Cafeteria.html'); // Ensure this matches the actual home page filename
    });
}

if (OrderHistoryLink) {
    OrderHistoryLink.addEventListener('click', () => {
        switchPage('Order-history.html'); // Ensure this matches the actual Order history page filename
    });
}

if (cartLink) {
    cartLink.addEventListener('click', () => {
        switchPage('Cart.html'); // Ensure this matches the actual cart page filename
    });
}
});








//Scrolling Animation For Products :

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.85 // Adjusted threshold for better visibility
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 120); // Adding a slight delay based on index
          observer.unobserve(entry.target); // Stop observing the element after it becomes visible
        }
      });
    }, observerOptions);
  
    boxes.forEach(box => {
      observer.observe(box);
    });
  });
  











