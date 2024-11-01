// order-page
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.item');
    const totalPriceElement = document.getElementById('total-price');

    function calculateTotal() {
        let total = 0;
        items.forEach(item => {
            const price = parseInt(item.querySelector('.item-price').textContent);
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            total += price * quantity;
        });
        totalPriceElement.textContent = total;
    }

    items.forEach(item => {
        const decreaseBtn = item.querySelector('.decrease');
        const increaseBtn = item.querySelector('.increase');
        const quantityInput = item.querySelector('.item-quantity');

        decreaseBtn.addEventListener('click', function () {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                calculateTotal();
            }
        });

        increaseBtn.addEventListener('click', function () {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.innerHTML = quantity;
            calculateTotal();
        });
    });

    calculateTotal();
});


//menupage
//for add to cart
let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartPopup = document.getElementById('cart-popup');
const cartItemsTable = document.querySelector('#cart-items tbody');
const cartTotalElement = document.getElementById('cart-total');


// function toggleCartPopup() {
//     cartPopup.classList.toggle('active');
// }

function closeCart() {
    cartPopup.classList.remove('active');
}

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCartUI();
}


function updateCartUI() {
    cartItemsTable.innerHTML = '';

    let total = 0;


    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.price.toFixed(2)}</td>
            <td>Rs. ${itemTotal.toFixed(2)}</td>
        `;
        cartItemsTable.appendChild(row);
    });

    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.length;
}

const questionsAndAnswers = {
    "What are the opening hours?": "Our opening hours are from 8 AM to 8 PM.",
    "How can I order food?": "You can order food from the menu section of our site.",
    "What payment methods do you accept?": "We accept cash, card, and digital payments.",
    "Do you offer delivery?": "Yes, we offer delivery services.",
    "Can I reserve a table?": "Reservations can be made through our contact page.",
    "What is your cancellation policy?": "Cancellations must be made 24 hours in advance.",
    "Do you have vegetarian options?": "Yes, we have a variety of vegetarian dishes.",
    "Is there a loyalty program?": "Yes, we offer a loyalty program for frequent customers.",
    "How can I contact support?": "You can contact support through the contact page.",
    "Do you have any special promotions?": "Check our website for the latest promotions."
};

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbotPopup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbotBody = document.getElementById('chatbotBody');
    
    if (userInput) {
        const userMessage = document.createElement('div');
        userMessage.textContent = "You: " + userInput;
        chatbotBody.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.textContent = "Bot: " + (questionsAndAnswers[userInput] || "I'm sorry, I don't understand that.");
        chatbotBody.appendChild(botMessage);
        
        // Clear the input
        document.getElementById('userInput').value = '';
        
        // Scroll to the bottom of the chat
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
}

