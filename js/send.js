document
  .querySelector(".contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.querySelector(".form-name-input").value.trim();
    const email = document.querySelector(".form-email-input").value.trim();
    const title = document.querySelector(".form-title-input").value.trim();
    const message = document.querySelector(".form-textarea").value.trim();
    const formData = { name, email, title, message };
    localStorage.setItem("pendingFormData", JSON.stringify(formData));
    try {
      await sendToServer(name, email, title, message);
      localStorage.removeItem("pendingFormData");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  });

async function sendToServer(name, email, title, message) {
  const url = "https://portfolioserv.onrender.com/sendMessage";
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, title, message }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }
  alert("Message sent successfully ");
}

window.addEventListener("load", async () => {
  const savedData = localStorage.getItem("pendingFormData");
  if (savedData) {
    const { name, email, title, message } = JSON.parse(savedData);
    try {
      await sendToServer(name, email, title, message);
      localStorage.removeItem("pendingFormData");
    } catch (error) {
      console.error("Retry error:", error);
    }
  }
});
