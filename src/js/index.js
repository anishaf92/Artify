import {initializeNavbar} from './navbar';
import {initializeContentLoader} from './contentLoader';
import Favourite from './favourite';
import Image from './image';

initializeNavbar ();
initializeContentLoader ();
//hamburger menu
const navbarToggle = document.querySelector ('.navbar-toggle');
const navbarMenu = document.querySelector ('.navbar-menu');
const menuItems = document.querySelectorAll ('.navbar-menu li a');

navbarToggle.addEventListener ('click', () => {
  if (navbarMenu.style.display !== 'flex') {
    navbarMenu.classList.toggle ('activemenu');
    navbarMenu.style.display = 'flex';
  } else {
    navbarMenu.style.display = 'none';
  }
});

window.addEventListener ('resize', () => {
  if (window.innerWidth > 768) {
    navbarMenu.classList.remove ('activemenu');
    menuItems.forEach (item => {
      item.addEventListener ('click', () => {
        navbarMenu.classList.remove ('activemenu');
        navbarMenu.style.display = 'none';
      });
    });
  }
});


