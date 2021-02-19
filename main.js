const consultPokemon = pokemon =>{
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET',`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        xhr.onload = () => {
            if(xhr.status === 200){
                resolve(JSON.parse(xhr.responseText))
                console.log(JSON.parse(xhr.responseText))
            }else{
                reject(console.error(xhr.responseText))
            }
        }
        xhr.onerror = error => {
            console.log(error)
        }
        xhr.send(null)
    })
}
const printResponse = element => {
    let html = 
                `
                <div class="pokemon">
                    <h2>${element['name']}</h2>
                    <h3>Body characteristics</h3>                                                 
                    <ul>                
                        <li><b>Height:</b> ${element['height']}</li>
                        <li><b>Weight:</b> ${element['weight']}</li>                                        
                        <li><b>Type:</b> ${element['types'][0]['type']['name']}</li>  
                    </ul>
                    <h3>Images</h3>  
                    <div class="images_container">                          
                        <ul class="images">                
                            <li><img src="${element['sprites']['front_default']}"></li>
                            <li><img src="${element['sprites']['back_default']}"></li>
                            <li><img src="${element['sprites']['front_shiny']}"></li>                                        
                            <li><img src="${element['sprites']['back_shiny']}"></li>                                        
                        </ul>
                    </div>
                    <h3>Abilities</h3>
                    <div class="abilities">
                        <ul class="abilities_list"></ul>   
                    </div>  
                    <h3>Game appears</h3>
                    <div class="games">
                        <ol class="game_appears"></ol>
                    </div>    
                </div>
                `    
    document.querySelector('div.data').innerHTML = html
    for (let i = 0; i < element['abilities'].length; i++) {
        const abilities = element['abilities'][i];
        let html1 = 
                    `                                                      
                        <li>${abilities['ability']['name']}</li>                                                                                  
                    `      
        document.querySelector('ul.abilities_list').innerHTML += html1
    }
    for (let i = 0; i < element['game_indices'].length; i++) {
        const game_indices = element['game_indices'][i];           
        let html2 = 
                    `
                        <li> - ${game_indices['version']['name']}</li>                                                                
                    `
        document.querySelector('ol.game_appears').innerHTML += html2    
    }
}

document.querySelector('#find').addEventListener('click',e => {
    e.preventDefault()
    let namePokemon = document.forms[0]['name'].value.toLowerCase()
    console.log(namePokemon)
    consultPokemon(namePokemon)
        .then(response => printResponse(response))
        .catch(error => console.log(new Error(error)))
})