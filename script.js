const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const randomMeal = document.getElementById("randomMeal");

let search = "";

//APPEL DE L'API=======================================
const fetchSearch = async(url) =>{
    meals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/${url}`)       //partie du lien modulable - renvoie ligne 41 et 48
        .then(res=> res.json())                                 //passe en format JSON
        .then(res=> res.meals)
};

 //FONCTION RECHERCHE=================================
const searchDisplay = async()=>{
    await fetchSearch(search);                              //renvoie ligne 41
    
    //AFFICHER AUCUN RESULTAT EN CAS DE RECHERCHE NULL
    if (meals == null){
        results.innerHTML = '<span class="noResult">Aucun resultat</span>'
    }

    //AFFICHAGE RESULTAT DE LA RECHERCHE============
    results.innerHTML=(
        meals.map(meal =>(
            `<div class="searchContainer">
            <h2>${meal.strMeal}</h2>
            <div class="infos">
              <div>origin : ${meal.strArea}</div>
              <div>category : ${meal.strCategory}</div>
            </div>
            <img src='${meal.strMealThumb}' /></br>
            <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
          </div>`
        )).join('')//pour finir map ajouter : join('')
    );
};

//RECHERCHE==========================================
searchInput.addEventListener("input", (e) => {
    search = `search.php?s=${e.target.value}`//renvoie ligne 10
    searchDisplay();//appel de la fonction
});

//RANDOM==========================
const randomMealDisplay = async()=> {
    await fetchSearch ('random.php'); //renvoie ligne 10

    results.innerHTML =(
        meals.map(meal => (
            
            `<div class="randomContainer">
              <h2>${meal.strMeal}</h2>
              <div class="infos">
                <div>origin : ${meal.strArea}</div>
                <div>catégory : ${meal.strCategory}</div>
              </div>
              <img src='${meal.strMealThumb}' />
              <p>${meal.strInstructions}</p>
              <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
            </div>`
          
        ))
    );
};

randomMeal.addEventListener("click", randomMealDisplay);//appel de la fonction au click

