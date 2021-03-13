import {parseRequestURL} from '../utils.js'

const listporcategoryScreen = {

    render: async () =>{
      const request = parseRequestURL();
      console.log(request)
      console.log(request.id)
        const resulttext = await fetch('https://backend-prueba-bsale.herokuapp.com/productos/categoria/'+ request.id ,{
        method: 'GET',
        });
        if(resulttext.ok){
            const productos = await resulttext.json()
        return  productos.map(producto =>
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
        }
    }
}
export default listporcategoryScreen;