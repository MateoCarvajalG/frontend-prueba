const getAllProducts = async() =>{
    const resulttext = await fetch('http://localhost:3000/productos/list',{
        method: 'GET',
    });
    if (resulttext.ok){
        const productos = await resulttext.json()
    
        const cards=productos.map(producto =>{

            // const name = producto.name;
            // const id = producto.id;
            // const url_image = producto.url_image;
            // const price = producto.price;
            // const discount = producto.discount;
            // const category= producto.category
            const card = `
            <div class="content">
              <img src="${producto.url_image}">
              <h3>${producto.name}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <h6>${producto.price}</h6>
              ${producto.discount ? producto.discount : `<p> Este producto no tiene descuento</p>` }
              <ul>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
              </ul>
              <button class="buy-1">Buy Now</button>
            </div>`;
            return card
        }).join("") 
        document.getElementById("cards").innerHTML = await cards
    }else{
        const error=`<h2> No se logro cargar correctamente los productos</h2>`
        document.getElementById("cards").innerHTML = await error
    }
    
}

getAllProducts()