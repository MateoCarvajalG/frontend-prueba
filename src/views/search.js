import {parseRequestURL} from '../utils.js'

const SearchScreen = {
    render: async () =>{
        const request = parseRequestURL();
        console.log(request)
        const url = window.location.search.split("=")
        console.log(url)
        const resulttext = await fetch('http://localhost:3000/productos/search/'+url[1].replace("+", " "),{
        method: 'GET',
        });
        if (resulttext.ok){
            const productos = await resulttext.json()
            if(productos.length > 0 ){
            return productos.map(producto =>
            `
            <div class="content">
              <img class="imagen"src="${producto.url_image}">
              <h3>${producto.name}</h3>
              ${producto.discount ? `<h6 style="display:inline; font-family: "Homer Simpson UI";"> Precio : $ ${producto.price} </h6> <h4 style="font-size:20px; color: #39b54a; display:inline;  ">  ${producto.discount}%OFF</h4>` : `<h6> Precio: $ ${producto.price} </h6>` }
              
              <ul>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
              </ul>
              <button onclick = "location.href='#/product/${producto.id}'" class="buy-1">Buy Now</button>
            </div>
            `    
            ).join('')
        }else if(productos.length === 0){
            return`<h2> No se encontraron coincidencias</h2>`
        }
        }else {
           return `<h2> No se logro cargar correctamente los productos</h2>`
        }
        
    }
}

export default SearchScreen
