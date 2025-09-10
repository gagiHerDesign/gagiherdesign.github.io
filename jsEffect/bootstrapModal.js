    document.querySelectorAll('.thumbnail').forEach(img => {
        img.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-img-src');
            document.getElementById('modalImage').setAttribute('src', imgSrc);
        });
    });