document.addEventListener("DOMContentLoaded", () => {
  const typedTextSpan = document.querySelector(".typing");
  const textArray = ["Full-Stack Developer", "Web Enthusiast", "Tech Lover"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  const skillsSvg = document.getElementById("skills-svg");
  skillsSvg.addEventListener("load", () => {
    const svgDoc = skillsSvg.contentDocument;
    const paths = svgDoc.querySelectorAll(".hover-path");

    paths.forEach((path) => {
      path.addEventListener("mouseenter", () => {
        path.style.fill = "url(#violet-blue-gradient)";
      });

      path.addEventListener("mouseleave", () => {
        path.style.fill = "";
      });
    });
  });

  function updateActiveLink() {
    const currentHash = window.location.hash || "#home";
    document.querySelectorAll(".nav a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      }
    });
  }

  document.querySelectorAll(".nav a").forEach((item) => {
    item.addEventListener("click", function (event) {
      document.querySelectorAll(".nav a").forEach((link) => {
        link.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Collect form data
      const formData = new FormData(this);

      // Send form data using Fetch API or XMLHttpRequest
      fetch("https://formspree.io/f/mzzpzely", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          Toastify({
            text: "Message sent successfully!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
          }).showToast();
          this.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          Toastify({
            text: "Failed to send message. Please try again later.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
          }).showToast();
        });
    });

  function scrollLeft() {
    const row = document.querySelector(".project-content .row");
    row.scrollBy({
      left: -200, // Adjust this value to control the scroll distance
      behavior: "smooth",
    });
    checkScroll();
  }

  function scrollRight() {
    const row = document.querySelector(".project-content .row");
    row.scrollBy({
      left: 200, // Adjust this value to control the scroll distance
      behavior: "smooth",
    });
    checkScroll();
  }

  function checkScroll() {
    const row = document.querySelector(".project-content .row");
    const prevButton = document.querySelector("button.prev");
    const nextButton = document.querySelector("button.next");

    // Disable prev button if at start
    if (row.scrollLeft === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    // Disable next button if at end
    if (row.scrollWidth - row.clientWidth - row.scrollLeft <= 1) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  document.querySelector("button.prev").addEventListener("click", scrollLeft);
  document.querySelector("button.next").addEventListener("click", scrollRight);

  document.addEventListener("DOMContentLoaded", checkScroll);
  window.addEventListener("resize", checkScroll);
  
  updateActiveLink();
  type();
});
