const updateUrl = () => {
    let url = window.location.href;
    let hElement = document.getElementById('url');
    hElement.textContent = url;
}

updateUrl();

const setCookie = () => {
    fetch("/setunpartitionedcookie");
    fetch("/setunpartitionedhttpcookie");
    fetch("/setpartitioncookie");
    fetch("/setpartitionedhttpcookie");
}
const postCookies = () => {
    fetch("/auth", { method: 'POST' });
}

