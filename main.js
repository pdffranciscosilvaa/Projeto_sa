const toggleMenu = () => {
    document.body.classList.toggle("open");
  };
  
  const swiper = new Swiper(".swiper", {
    
    loop: true,
    speed: 750,
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });