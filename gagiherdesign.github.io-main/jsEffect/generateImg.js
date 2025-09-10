function generateImages(imageContainerId, imageCount, imageSrcTemplate) {
  const imageContainer = document.getElementById(imageContainerId);
  
  for (let i = 1; i <= imageCount; i++) {
      const img = document.createElement('img');
      img.src = imageSrcTemplate.replace('{i}', i);
      img.className = 'thumbnail img-fluid';
      img.setAttribute('data-bs-toggle', 'modal');
      img.setAttribute('data-bs-target', '#imageModal');
      img.setAttribute('data-img-src', img.src);
      imageContainer.appendChild(img);
  }

  document.querySelectorAll('.thumbnail').forEach(img => {
      img.addEventListener('click', function () {
          const imgSrc = this.getAttribute('data-img-src');
          document.getElementById('modalImage').setAttribute('src', imgSrc);
      });
  });
}