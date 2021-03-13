import {parseRequestURL} from '../utils.js'


const ProductScreen = {

    render: async () =>{
      const request = parseRequestURL();
        const resulttext = await fetch('https://backend-prueba-bsale.herokuapp.com/productos/product/:'+ request.id ,{
        method: 'GET',
        });
        if(resulttext.ok){
            const producto = await resulttext.json()
        
        return `<div class="wrapper">
        <div class="product-img">
          <img src="${producto.url_image}" height="420" width="327">
        </div>
        <div class="product-info">
          <div class="product-text">
            <h1>${producto.name}</h1>
            

            ${producto.discount ?  `<h3 style= "color: #ff0101 ; margin-bottom:20px ; text-decoration: line-through;"> Precio =  ${producto.price}</h3>` : `<h3 style = "text-decoration: underline overline wavy green; margin-top:15%" > Precio = $${producto.price}</h3>`}
            ${producto.discount  ? `<h2 
            style="text-align:center;
            margin-top:10px;
            margin-bottom:0px">Este producto se encuentra con descuento</h2>`: `<h2></h2>` }          
            ${producto.discount ? `<h3> ${producto.discount} % </h3>`: `<h3></h3>`}
            ${producto.discount ?  `<h3 style= "color: green; text-decoration: overline underline wavy green; " > Precio final =  $ ${producto.price-(producto.price*(producto.discount/100))}</h3>` : `<h3></h3>`}
          </div>
          <div class="product-price-btn">
            <p><span></span></p>
            <button type="button">buy now</button>
          </div>
        </div>
      </div> `
        }
    }
}
export default ProductScreen;