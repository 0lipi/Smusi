//function to check if the user has already accepted the banner
function checkCookieConsent() 
{
    let isCookieAccepted = localStorage.getItem('cookieConsent');
    return isCookieAccepted === 'true';
}

//Function to confirm the cookie banner
function acceptCookies() 
{
    localStorage.setItem('cookieConsent', 'true');
    document.getElementById('cookieBanner').style.display = 'none';
}

//Check if the user has already accepted the banner
if (!checkCookieConsent()) 
{
    //makes the cookie banner visible
    document.getElementById('cookieBanner').style.display = 'flex';
    //add eventlistener to button
    document.getElementById('acceptCookiesBtn').addEventListener('click', acceptCookies);
}