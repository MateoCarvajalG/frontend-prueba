import HomeScreen from './views/HomeView.js'
import ProductScreen from './views/producto.js'
import falloScreen from './views/fallo.js'
import SearchScreen from './views/search.js'
import listporcategoryScreen from './views/listPerCategory.js'
import{parseRequestURL} from './utils.js'


const routes ={
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/search": SearchScreen,
    "/categoria/:id" : listporcategoryScreen
}
const router = async () =>{
    const request = parseRequestURL();
    const parseURL = (request.resource ? `/${request.resource}` : `/`)+
    (request.id ? '/:id' : '') + 
    (request.verb ? `/${request.verb}`: '');
    const screen = routes[parseURL] ? routes[parseURL] : falloScreen 
    const main = document.getElementById("cards");
    main.innerHTML = await screen.render();

};
 window.addEventListener("load" , router);
 window.addEventListener('hashchange', router)