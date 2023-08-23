const hamburgerMenu = document.getElementById('hamburgerMenu');
const hamburgerNavbar = document.getElementById('hamburgerNavbar');
const hamburgerMenuIcon = document.getElementById('hamburgerMenuIcon');

hamburgerMenu.addEventListener('click', function() 
{

    if (hamburgerNavbar.style.display === "flex") 
    {
        hamburgerNavbar.style.display = "none";
        hamburgerMenuIcon.src = "../Assets/general/hamburgermenu.svg"
    } 
    else 
    {
        hamburgerNavbar.style.display = "flex";
        hamburgerMenuIcon.src = "../Assets/general/x_icon.svg";
    }
});

function checkScreenSize() 
{
    let screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenSize >= 1000) 
    {
        hamburgerNavbar.style.display = "none";
        hamburgerMenuIcon.src = "../Assets/general/hamburgermenu.svg"
    }
}
  
window.addEventListener('resize', checkScreenSize);
  