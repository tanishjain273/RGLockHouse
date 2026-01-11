const form = document.querySelector("#product-form");
const list = document.querySelector("#product-list");
const jsonOutput = document.querySelector("#json-output");
const importInput = document.querySelector("#import-json");
const loadButton = document.querySelector("#load-json");
const copyButton = document.querySelector("#copy-json");
const downloadButton = document.querySelector("#download-json");

let products = [];

const renderList = () => {
  if (!products.length) {
    list.innerHTML = "<p>No products added yet.</p>";
    jsonOutput.value = "[]";
    return;
  }

  list.innerHTML = products
    .map(
      (product, index) => `
        <div class="product-list-item">
          <div>
            <strong>${product.name}</strong>
            <p>${product.description}</p>
            <span>${product.category} • ${product.id}</span>
          </div>
          <button class="secondary-button" data-index="${index}">Remove</button>
        </div>
      `
    )
    .join("");

  jsonOutput.value = JSON.stringify(products, null, 2);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const product = Object.fromEntries(data.entries());
  products = [...products, product];
  form.reset();
  renderList();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const index = Number(button.dataset.index);
  if (Number.isNaN(index)) return;
  products = products.filter((_, idx) => idx !== index);
  renderList();
});

loadButton.addEventListener("click", () => {
  try {
    const parsed = JSON.parse(importInput.value || "[]");
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be an array.");
    }
    products = parsed;
    renderList();
  } catch (error) {
    alert("Could not load JSON. Please check the format and try again.");
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(jsonOutput.value);
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy JSON";
    }, 1200);
  } catch (error) {
    alert("Copy failed. You can still select and copy the JSON manually.");
  }
});

downloadButton.addEventListener("click", () => {
  const blob = new Blob([jsonOutput.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "products.json";
  link.click();
  URL.revokeObjectURL(url);
});

renderList();
