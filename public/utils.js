function updateUrl() {
    let url = window.location.href;
    let hElement = document.getElementById('url');
    hElement.textContent = url;
}
  
updateUrl();

function setCookie() {
    fetch("/setcookie");
    fetch("/sethttpcookie");
    fetch("/setpartitioncookie");
    fetch("/setpartitionedhttpcookie");
}