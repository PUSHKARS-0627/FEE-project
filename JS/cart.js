document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  function loadCart() {
    fetch("http://localhost:3000/cart")
      .then(res => res.json())
      .then(data => {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (data.length === 0) {
          cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
          totalPriceElement.textContent = "₹0";
          return;
        }

        data.forEach(item => {
          const itemElement = document.createElement("div");
          itemElement.classList.add("cart-item");

          itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.brand}">
            <div class="item-details">
              <h3>${item.brand}</h3>
              <p>${item.description}</p>
              <p class="price">${item.price}</p>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
          `;

          cartItemsContainer.appendChild(itemElement);

          // Parse price (₹3,695 → 3695)
          const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""));
          total += numericPrice;
        });

        totalPriceElement.textContent = `₹${total.toLocaleString()}`;
      })
      .catch(err => {
        console.error("Error loading cart:", err);
      });
  }

  // Event delegation for remove buttons
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.getAttribute("data-id");
      fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE"
      })
        .then(() => loadCart());
    }
  });

  loadCart();
});
