// JavaScript file

const storeItems = document.querySelectorAll('#storeItems li');
const boughtItems = document.getElementById('boughtItems');
const totalSpentDisplay = document.getElementById('totalSpent'); // Select the total spent display
let money = 10000000000;
let totalSpent = 0; // Keep track of the total spent

updateBalance();
updateTotalSpent(); // Update the initial total spent display

storeItems.forEach(item => {
  item.addEventListener('click', buyItem);
});

boughtItems.addEventListener('click', removeItem);

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetSimulation);

function buyItem(e) {
  const clickedImage = e.target.tagName === 'IMG' ? e.target : e.target.querySelector('img');
  const price = parseInt(clickedImage.parentElement.dataset.price);

  if (money >= price) {
    money -= price;
    totalSpent += price; // Update total spent
    updateBalance();
    updateTotalSpent(); // Update total spent display
    addItemToBoughtItems(clickedImage.parentElement.textContent);
    e.target.parentElement.classList.add('purchased');
    setTimeout(() => {
      e.target.parentElement.classList.remove('purchased');
    }, 1000);
  } else {
    alert('Not enough money!');
  }
}

function updateBalance() {
  document.getElementById('money').textContent = `$${money.toLocaleString()}`;
}

function updateTotalSpent() {
  totalSpentDisplay.textContent = `$${totalSpent.toLocaleString()}`; // Update total spent display
}

function addItemToBoughtItems(item) {
  const li = document.createElement('li');
  li.textContent = item;
  li.dataset.price = parseInt(item.split('$')[1].replace(/,/g, '')); // Extract price from the item text
  boughtItems.appendChild(li);
}

function removeItem(e) {
  if (e.target.tagName === 'LI') {
    money += parseInt(e.target.dataset.price);
    totalSpent -= parseInt(e.target.dataset.price); // Update total spent when an item is removed
    updateBalance();
    updateTotalSpent(); // Update total spent display
    e.target.remove();
  }
}

function resetSimulation() {
  money = 10000000000;
  totalSpent = 0; // Reset total spent
  boughtItems.innerHTML = '';
  updateBalance();
  updateTotalSpent(); // Update total spent display
}
