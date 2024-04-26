// gallery json
fetch('/js/ImageGallery.json') 
.then(response => response.json()) 
.then(gallery =>
   { 
    // show all gallery
    displaygallery(gallery);
    //
    // category btn
     document.querySelectorAll('.button-value').forEach( button => { 
        button.addEventListener('click', function() { 
          document.querySelectorAll('.button-value').forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          const category = this.textContent.trim(); 
          const filteredgallery = category === 'All Photos' ? gallery: gallery.filter(image => image.category === category);
          displaygallery(filteredgallery);
          });
        });

      }) 
      .catch(error => console.log(error)); 

      // gallery json
      function displaygallery(gallery) { 
        let output = ''; 
        for (let item of gallery) {
            output += `
            <div class="image">
            <a href="${item.image}" data-lightbox="cars" data-title="Image of car 1">
            <img src="${item.image}" alt="${item.image}">
            </a>
            </div>`;
        }
        document.querySelector(".gallery").innerHTML = output;
} 

const imageContainer = document.querySelector('.gallery');
const gallery = Array.from(imageContainer.querySelectorAll('.image'));