$(document).ready(function () {
  $(window).scroll(function () {
    // Sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // Scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // Slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // Removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // Applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // Toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .social").toggleClass("active");
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // Contact
  const btn = document.querySelector('button');
  const inputs = document.querySelector('form');

  btn.addEventListener('click', () => {
    Email.send({
      Host: "smtp.mailtrap.io",
      Username: "68b04df644f768",
      Password: "ad906a5936a775",
      To: 'abdulpangandaman22@gmail.com',
      From: inputs.elements["email"].value,
      Subject: "Contact Me",
      Body: inputs.elements["message"].value + "<br/>" + inputs.elements["name"].value
    }).then(
      message => alert("Your message sent successfully. Thank you!")
    );
  });
});
