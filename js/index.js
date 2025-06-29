document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const error = document.getElementById("error");

  if (localStorage.getItem("taskflow_user")) {
    window.location.href = "app.html";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const dobInput = document.getElementById("dob").value;
    if (!name || !dobInput) {
      error.textContent = "Name and date of birth are required.";
      error.classList.remove("hidden");
      return;
    }

    const dob = new Date(dobInput);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (isNaN(dob.getTime()) || age <= 10) {
      error.textContent = "You must be older than 10 to use this app.";
      error.classList.remove("hidden");
      return;
    }

    localStorage.setItem("taskflow_user", JSON.stringify({ name, dob: dob.toISOString() }));
    window.location.href = "app.html";
  });
});
