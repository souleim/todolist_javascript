const taches = JSON.parse(localStorage.getItem('stocks'));

if(taches){
    taches.forEach(tache => ajouterTaches(tache));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    ajouterTaches()
})

// fonction permettant l'ajout de tâches à réaliser

function ajouterTaches(tache){

    let saisieTexte = saisie.value;

    if(tache){
        saisieTexte = tache.text;
    }
    
    if(saisieTexte){
        const listeEl = document.createElement('li'); 

        if(tache && tache.terminer){
            listeEl.classList.add('terminer')
        }

        listeEl.innerText = saisieTexte;
              
        listeEl.addEventListener('click', (e) => {
            e.preventDefault();
            listeEl.classList.toggle('terminer');
            stockageTaches();
        })
    
        // Suppression d'une tache en cliquant su le bouton droit   
        listeEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if(listeEl.classList.contains('terminer')){
                listeEl.remove();
            }
            stockageTaches()    
        })
    
        liste.appendChild(listeEl);

        saisie.value = "";

        stockageTaches();
    }

}

// Stockage des données dans le navigateur
function stockageTaches(){

    let listesEl = document.querySelectorAll('li');
    let stocks = [];
    listesEl.forEach(listeEl => {
      
        stocks.push({
            text: listeEl.innerText,
            terminer: listeEl.classList.contains('terminer')
        })

    })
    
    localStorage.setItem('stocks', JSON.stringify(stocks));
}
