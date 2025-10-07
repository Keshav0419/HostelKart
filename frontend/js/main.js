document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("currentOrder"));

  const title = document.getElementById('item-title');
  const condition = document.getElementById('item-condition');
  const description = document.getElementById('item-description');
  const location = document.getElementById('item-location');
  const price = document.getElementById('item-price');
  const image = document.getElementById('item-image');

  if (order) {
    title.innerText = order.name;
    condition.innerText = order.condition;
    description.innerText = order.description;
    location.innerText = order.location;
    price.innerText = '₹' + order.price;
    image.src = order.image;
  } else {
    // Show placeholder content
    title.innerText = "No item selected";
    condition.innerText = "";
    description.innerText = "Please select an item from browse page.";
    location.innerText = "";
    price.innerText = "";
    image.src = "https://via.placeholder.com/400x240?text=No+Item";
  }

  const form = document.getElementById("buy-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!order) {
      alert("Cannot submit. No item selected.");
      return;
    }

    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const block = document.getElementById("block").value;
    const notes = document.getElementById("notes").value;

    try {
      const res = await fetch("http://localhost:5000/api/orders/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: order.name,
          condition: order.condition,
          description: order.description,
          location: order.location,
          price: Number(order.price),
          image: order.image,
          fullname,
          phone,
          block,
          notes
        })
      });

      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("currentOrder");
        window.location.href = "order-confirm.html";
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error. Check backend console.");
    }
  });
});
