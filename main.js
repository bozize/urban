// main.js for Apartments.com homepage clone

// Area for upcoming interactive JS (e.g., search input, toggles, etc.)

document.addEventListener("DOMContentLoaded", () => {
    fetch("rentals.json")
      .then((res) => res.json())
      .then((data) => {
        const container = document.querySelector(".rental-cards");
        container.innerHTML = ""; // Clear static HTML if any
        data.forEach((rental) => {
          const thumbnail = rental.images?.[0];
          const card = document.createElement("div");
          card.className = "rental-card";
          card.innerHTML = `
            <img class="rental-img" src="${thumbnail}" alt="${rental.title}">
            <div class="rental-info">
              <h3>${rental.title}</h3>
              <p>${rental.address}</p>
            </div>
          `;
  
          // 🔗 Make card clickable
          card.style.cursor = "pointer";
          card.addEventListener("click", () => {
            window.location.href = `details.html?id=${rental.id}`;
          });
  
          container.appendChild(card);
        });
      })
      .catch((err) => {
        console.error("Failed to load rental data:", err);
      });
});
  
  