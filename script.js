document.getElementById("subscription-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const phoneRegex = /^\+254-\d{3}-\d{6}$/;

    if (!phoneRegex.test(phone)) {
        alert("Invalid phone number format. Use +254-XXX-XXXXXX.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, transactionCode: "TestCode" }),
        });
        const data = await response.json();
        if (data.success) {
            alert(`Subscription successful for MasomoPlus!\nEmail: ${email}\nPhone: ${phone}`);
        } else {
            alert("Subscription failed: " + data.message);
        }
    } catch (err) {
        alert("Error connecting to the server.");
    }
});
