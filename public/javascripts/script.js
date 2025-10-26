// script.js

document.addEventListener("DOMContentLoaded", () => {
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  if (loginTab && signupTab && loginForm && signupForm) {
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
  }
  });
  


    // Accordion functionality
        function toggleAccordion(id) {
            const content = document.getElementById(`content-${id}`);
            const icon = document.getElementById(`icon-${id}`);
            const accordionItem = content.parentElement;
            
            if (content.classList.contains('accordion-open')) {
                content.classList.remove('accordion-open');
                icon.classList.remove('accordion-open');
            } else {
                // Close all other accordions
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('accordion-open');
                });
                document.querySelectorAll('.accordion-icon').forEach(item => {
                    item.classList.remove('accordion-open');
                });
                
                // Open selected accordion
                content.classList.add('accordion-open');
                icon.classList.add('accordion-open');
            }
        }
        
        // Animated counters
        function animateCounter(elementId, finalValue, duration = 2000) {
            let start = 0;
            const increment = finalValue / (duration / 16); // 60fps
            const element = document.getElementById(elementId);
            
            function updateCounter() {
                start += increment;
                if (start < finalValue) {
                    element.textContent = Math.floor(start).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = finalValue.toLocaleString();
                }
            }
            
            updateCounter();
        }
        
        // Initialize counters when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit for the page to render
            setTimeout(() => {
                animateCounter('users-counter', 12500);
                animateCounter('goals-counter', 8900);
                animateCounter('plans-counter', 5400);
            }, 500);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });