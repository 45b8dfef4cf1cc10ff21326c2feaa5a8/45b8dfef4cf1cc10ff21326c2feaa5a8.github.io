document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("send");
  
    button.addEventListener("click", function(event) {
      event.preventDefault(); 
      
      var nameInput = document.getElementById("name");
      var emailInput = document.getElementById("email");
      var messageInput = document.getElementById("message");
  
      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var message = messageInput.value.trim();
  
      if (name === "") {
        nameInput.setCustomValidity("Please fill in this field.");
        nameInput.reportValidity();
        return;
      } else {
        nameInput.setCustomValidity("");
      }
  
      if (email === "") {
        emailInput.setCustomValidity("Please fill in this field.");
        emailInput.reportValidity();
        return;
      } else if (!isValidEmail(email)) {
        emailInput.setCustomValidity("Please enter a valid email address.");
        emailInput.reportValidity();
        return;
      } else {
        emailInput.setCustomValidity("");
      }
  
      if (message === "") {
        messageInput.setCustomValidity("Please fill in this field.");
        messageInput.reportValidity();
        return; 
      } else {
        messageInput.setCustomValidity("");
      }
  
      button.classList.toggle('clicked');
      var buttonText = button.querySelector('p');
      buttonText.textContent = (buttonText.textContent === "Sent!") ? "Send" : "Sent!";
      document.getElementById("contactform").submit();
    });
  
    var inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('input', function() {
        this.setCustomValidity('');
      });
    });
  });
  
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }