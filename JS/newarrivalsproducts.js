// fetch the JSON file
fetch('JSON/newarrivalsproducts.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const container = document.querySelector('.container');

    let row;

    products.forEach((product, index) => {
      //  a row every 3  products
      if (index % 3 === 0) {
        row = document.createElement('div');
        row.classList.add('row1');
        container.appendChild(row);
      }

      // create product card
      const card = document.createElement('div');
      card.classList.add('c');

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('img1');
      const img = document.createElement('img');
      img.classList.add('casio');
      img.src = product.image;
      imgDiv.appendChild(img);

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

      const priceDiv = document.createElement('div');
      priceDiv.classList.add('price');
      const price = document.createElement('p');
      price.classList.add('rate');
      price.textContent = `${product.price}`;
      priceDiv.appendChild(price);

      card.appendChild(imgDiv);
      card.appendChild(descDiv);
      card.appendChild(priceDiv);
      row.appendChild(card);

      
      card.addEventListener('click', () => {
        const productData = {
          brand: product.brand,
          description: product.description,
          price: product.price,
          image: product.image
        };
        localStorage.setItem('selectedProduct', JSON.stringify(productData));
        window.location.href = 'productdescriptionPageLegacy.html';
      });
    });
  })
