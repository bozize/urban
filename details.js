document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rentalId = params.get("id");

  const container = document.getElementById("rental-details-container");

  if (!rentalId) {
    container.innerHTML = "<p>Rental not found.</p>";
    return;
  }

  fetch("rentals.json")
    .then((res) => res.json())
    .then((data) => {
      const rental = data.find((item) => String(item.id) === rentalId);
      if (!rental) {
        container.innerHTML = "<p>Rental not found.</p>";
        return;
      }

      const imagesHTML = (rental.images || [])
        .map(
          (img) => `<div><img src="${img}" alt="${rental.title}" class="details-image" /></div>`
        )
        .join("");

      const amenitiesHTML = (rental.amenities || [])
        .map((amenity) => `<li>${amenity}</li>`)
        .join("");

      const featuresHTML = (rental.features || [])
        .map((feature) => `<li>${feature}</li>`)
        .join("");

      const detailsHTML = `
        <div class="details-container">
          <div class="details-header">
            <h2>${rental.title}</h2>
            <div class="details-location">${rental.address}</div>
          </div>

          <div class="glider-contain">
            <div class="glider">${imagesHTML}</div>
            <button class="glider-prev">«</button>
            <button class="glider-next">»</button>
            <div role="tablist" class="dots"></div>
          </div>

          <div class="details-description">
            <h3>Description</h3>
            ${rental.description || "No description provided."}
          </div>

          <div class="details-amenities">
            <h3>Features</h3>
            <ul>${featuresHTML || "<li>No amenities listed.</li>"}</ul>
          </div>

          <div class="details-amenities">
            <h3>Amenities</h3>
            <ul>${amenitiesHTML || "<li>No amenities listed.</li>"}</ul>
          </div>

          <button class="details-contact-btn">Contact For Full Details</button>
        </div>
      `;

      container.innerHTML = detailsHTML;

      // Initialize Glider after content is rendered
      new Glider(document.querySelector(".glider"), {
        slidesToShow: 1,
        draggable: true,
        dots: ".dots",
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next"
        }
      });

      // WhatsApp contact on button click
      const contactBtn = document.querySelector(".details-contact-btn");
      if (contactBtn) {
        contactBtn.addEventListener("click", () => {
          const phoneNumber = "254700518994"; // WhatsApp format (no + sign)
          const message = encodeURIComponent(
            `Hello, I'm interested in this property titled "${rental.title}". Please provide more details.`
          );
          const url = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(url, "_blank");
        });
      }
    })
    .catch((err) => {
      console.error("Failed to load rental data:", err);
      container.innerHTML = "<p>Something went wrong.</p>";
    });
});

  
  