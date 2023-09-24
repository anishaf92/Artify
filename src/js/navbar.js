// navbar.js

export function initializeNavbar () {
  const navbarToggle = document.querySelector ('.navbar-toggle');
  // Get the menu items
  const menuItems = document.querySelectorAll ('.navbar-menu li a');

  // Function to handle menu item clicks
  function handleMenuItemClick (event) {
    // Remove the "active" class from all menu items
    menuItems.forEach (item => item.classList.remove ('active'));

    // Add the "active" class to the clicked menu item
    event.target.classList.add ('active');
  }

  // Add a click event listener to each menu item
  menuItems.forEach (item =>
    item.addEventListener ('click', handleMenuItemClick)
  );

  // Toggle the "active" class for navbarMenu and update the active menu item
  navbarToggle.addEventListener ('click', () => {
    const navbarMenu = document.querySelector ('.navbar-menu');
    navbarMenu.classList.toggle ('active');

    if (navbarMenu.classList.contains ('active')) {
      // When the menu is open, ensure the currently active item remains active
      const activeMenuItem = document.querySelector (
        '.navbar-menu li a.active'
      );
      if (activeMenuItem) activeMenuItem.classList.add ('active');
    } else {
      // When the menu is closed, remove the active class from all items
      menuItems.forEach (item => item.classList.remove ('active'));
    }
  });
}
