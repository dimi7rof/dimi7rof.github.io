let certBtn = document.getElementById('certBtn');
certBtn.addEventListener('click', showCertificates);

function showCertificates() {
    let div = document.getElementById('cert');
    div.style.display = 'flex';
}