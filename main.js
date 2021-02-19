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
                    <h3>${element['name']}</h3>
                    <h5>Body characteristics</h5>                                                 
                    <ul>                
                        <li><b>Height:</b> ${element['height']}</li>
                        <li><b>Weight:</b> ${element['weight']}</li>                                        
                    </ul>
                    <h5>Images</h5>                            
                    <ul>                
                        <li><img src="${element['sprites']['front_default']}"></li>
                        <li><img src="${element['sprites']['back_default']}"></li>                                        
                    </ul>
                    <h5>Abilities</h5>     
                </div>
                `    
    document.querySelector('div.data').innerHTML = html
    for (let i = 0; i < element['abilities'].length; i++) {
        const abilities = element['abilities'][i];
        let html1 = `                    
                    <ul>                
                        <li>${abilities['ability']['name']}</li>                                                                
                    </ul> 
                    `      
        document.querySelector('div.pokemon').innerHTML += html1
    }
}

document.querySelector('#find').addEventListener('click',e => {
    e.preventDefault()
    let namePokemon = document.forms[0]['name'].value
    console.log(namePokemon)
    consultPokemon(namePokemon)
        .then(response => printResponse(response))
        .catch(error => console.log(new Error(error)))
})