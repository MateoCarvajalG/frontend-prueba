import HomeScreen from './views/HomeView.js'
const router = async () =>{
    const main = document.getElementById("cards");
    main.innerHTML = await HomeScreen.render();
};
 window.addEventListener("load" , router);