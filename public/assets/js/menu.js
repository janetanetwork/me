document.getElementById('menu-button').addEventListener('click', function() {
  var menu = document.getElementById('menu');
  menu.classList.add('open');
  this.style.display = 'none';
});

document.getElementById('close-button').addEventListener('click', function() {
  var menu = document.getElementById('menu');
  var menuButton = document.getElementById('menu-button');
  menu.classList.remove('open');
  menuButton.style.display = 'block';
});