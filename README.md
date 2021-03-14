# Front-end para prueba tecnica de Bsale

_este repositorio es el lado cliente del proyecto, en el cual se realiza la construccion visual del sitio web obteniendo los datos suministrados desde el [Lado servidor(BackEnd)](https://github.com/MateoCarvajalG/backend-prueba) (consumiendo Api REST)_ 

## Empezando  🖥️

Este repositorio fue desarrollado usando vanilla JavaScript, para la ejecucion del programa se hizo necesario el uso de NodeJS con su modulo live server para mayor facilidad de levantar el programa tanto en un entorno de desarrollo local, como en el despliegue de la aplicacion en heroku. 

# APP.JS

Este archivo encontrando en la raiz del proyecto es la entrada o ejecucion del desarrollo, en este archivo se construyen las rutas tal y como se desea, y se crea una funcion ```router``` que permita separar la url para mas adelante procesarla y sacar informacion. 
```
las rutas que se usaran en la pagina web seran : 
* /

Esta ruta sera la pagina principal

* /product/:id 

Esta ruta renderizara el producto unicamente que coincida con el id

* /search 

esta ruta renderizada los productos que coincidan con lo que se encuentra en el buscador

* /categoria/:id

Esta ruta renderizara los productos de cierta categoria a la que es ingresada

``` 


# VIEWS 

En el interior de esta carpeta se puede encontrar todos los archivos que seran llamados dependiendo de la ruta a la que se ingrese,

Estos archivos hacen la peticion HTTP con la API para javascript llamada Fetch, esta peticion se hace al backend y retornada un archivo JSON con los productos ya filtrados.

posteriormente con la data que se encuentra en este archivo JSON se retorna codigo HTML hacia el archivo .html para ser renderizado y mostrado a los usuarios de forma optima

## Ejemplos:
* la ruta : ``` \ ``` 

en esta ruta incial se muestran todos los productos sin filtro alguno, por eso se realiza la peticion hacia la URL del backend que proporciona estos datos
```
const HomeScreen = {
    render: async () =>{
        const resulttext = await fetch('https://backend-prueba-bsale.herokuapp.com/productos/list',{
        method: 'GET',
        });
        if (resulttext.ok){
            const productos = await resulttext.json()
            return productos.map(producto =>
            `
            <div class="content">
              <img class="imagen"src="${producto.url_image}">
              <h3 class="title-producto">${producto.name}</h3>
              ${producto.discount ? `<h6 style="display:inline; font-family: "Homer Simpson UI";"> Precio : $ ${producto.price} </h6> <h4 style="font-size:20px; color: #39b54a; display:inline;  ">  ${producto.discount}%OFF</h4>` : `<h6> Precio: $ ${producto.price} </h6>` }
              
              <ul>
               
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
              </ul>
              <button onclick = "location.href='#/product/${producto.id}'" class="buy-1">Buy Now</button>
            </div>
            `    
            ).join('')
            
        }else{
            const error=`<h2> No se logro cargar correctamente los productos</h2>`
            document.getElementById("cards").innerHTML = await error
        }
    }
}

``` 


* la ruta ``` /product/id ``` 

de esta ruta se obtiene mediante la funcion ParserequestURL el id con el cual se identificada cada producto, se realiza la peticion al backend con este dato y nos devuelve un JSON con la data
``` 
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
          <img src="${producto.url_image}" class="imagen">
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
``` 