fetch('JSON/tissotproducts.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const container = document.querySelector('.container');
    let row;

    products.forEach((product, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row1');
            container.appendChild(row);
        }

        const card = document.createElement('div');
        card.classList.add('c');

        // Product Image
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img1');
        const img = document.createElement('img');
        img.classList.add('casio');
        img.src = product.image;
        img.alt = product.description;
        imgDiv.appendChild(img);

        // Description
        const descDiv = document.createElement('div');
        descDiv.classList.add('description');
        const heading = document.createElement('p');
        heading.classList.add('casioheading');
        heading.textContent = product.brand;
        const description = document.createElement('p');
        description.classList.add('casiodescription');
        description.textContent = product.description;
        descDiv.appendChild(heading);
        descDiv.appendChild(description);

        // Price
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('price');
        const price = document.createElement('p');
        price.classList.add('rate');
        price.textContent = product.price;
        priceDiv.appendChild(price);

        card.appendChild(imgDiv);
        card.appendChild(descDiv);
        card.appendChild(priceDiv);

       
        card.addEventListener('click', () => {
            
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            // Redirect to PDP page
            window.location.href = 'productdescriptionPageLegacy.html';
        });

        row.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading products:', error));
