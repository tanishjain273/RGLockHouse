const grid = document.querySelector("#product-grid");

const createCard = (product) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy" />
    <div class="product-card-body">
      <span class="product-meta">${product.category} • ${product.id}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    </div>
  `;
  return card;
};

const renderProducts = (products) => {
  grid.innerHTML = "";
  products.forEach((product) => grid.appendChild(createCard(product)));
};

fetch("data/products.json")
  .then((response) => response.json())
  .then((products) => renderProducts(products))
  .catch(() => {
    grid.innerHTML =
      "<p>We are refreshing the catalogue. Please check back soon.</p>";
  });
