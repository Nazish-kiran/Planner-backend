// script.js
document.addEventListener("DOMContentLoaded", () => {
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    loginTab.addEventListener("click", () => {
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
  
      // Update active tab styling
      loginTab.classList.add("border-blue-500");
      signupTab.classList.remove("border-blue-500");
      signupTab.classList.add("border-none");
      loginTab.classList.remove("border-none");


    });
  
    signupTab.addEventListener("click", () => {
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
  
      // Update active tab styling
      signupTab.classList.add("border-blue-500");
      loginTab.classList.remove("border-blue-500");
      loginTab.classList.add("border-none");
      signupTab.classList.remove("border-none");

    });
  });
  