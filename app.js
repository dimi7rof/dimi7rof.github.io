let certBtn = document.getElementById('certBtn');
certBtn.addEventListener('click', showCertificates);
// let certBtn2 = document.getElementById('certBtn2');
// certBtn.addEventListener('click', showCertificates);


function showCertificates() {
    let div = document.getElementById('cert');
    div.style.display = 'flex';
    certBtn2.style.display = 'none';
}