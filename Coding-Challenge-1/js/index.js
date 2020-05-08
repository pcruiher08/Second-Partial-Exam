

function fetchData(){
    let food = document.querySelector('.js-query').value;

    let link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
    console.log(link);

    let settings = {
        method : 'GET'
    };

    let results = document.querySelector('.js-search-results');


    fetch(link, settings)
        .then(response =>{
            if(response.status === 200){
                return response.json();
            }

            throw new Error("Meal not found.");
        })
        .then(responseJSON =>{
            console.log(responseJSON);
            //innerHTML
            let cuantasComidas = responseJSON.meals.length;

          
      
            results.innerHTML = ""; //clear
            
            //for cuantasComidas
            for(let i = 0; i<cuantasComidas; i++){
                //console.log(responseJSON.meals[i].strMeal);
                results.innerHTML += `
                <div>Meal name: ${responseJSON.meals[i].strMeal} </div>
                <div>Meal area: ${responseJSON.meals[i].strArea}</div>
                <h4>Instructions of preparation: ${responseJSON.meals[i].strInstructions}</h4>
                <img src="${responseJSON.meals[i].strMealThumb}" alt="picture of ${responseJSON.meals[i].strMeal}">
                `;
            }
        })
        .catch(errorDetected =>{
            console.log(errorDetected);
        });
}

function watchForm(){

    let dataForm = document.querySelector('.js-search-form');


    dataForm.addEventListener('submit', (event) =>{
        //console.log(event);
        event.preventDefault();
        fetchData();
    });
}

function init(){
    watchForm();
}

init();