const pokedexelements = document.getElementById("pokedex");
const PokeInfo = document.getElementById("Modal_pokeinfo");

//fecthing data from Api
// `` ecma6 notation for template literals
const pokecount = () => {
        var Pokecount = 0;
        var Pokecounturl = `https://pokeapi.co/api/v2/pokemon-species/`;
        fetch(Pokecounturl).then(response => {
            return response.json();
        }).then(data => {
            console.log(data.count);
            let Pokecount = data.count;


        });


    }
    // console.log(pokecount());
var apicalls = [];
var apicallreddit = [];
const pokedata = () => {
    for (let i = 1; i <= 150; i++) {
        var url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        apicalls.push(fetch(url).then((response) => response.json()));
    }
    //promise that returns an array of objects
    Promise.all(apicalls).then(results => {
        const pokemon = results.map(data => ({
            id: data.id,
            name: data.name,
            picture: data.sprites['front_default'],
            pictureback: data.sprites['back_default'],
            shinypic: data.sprites['front_shiny'],
            shinypicback: data.sprites['back_shiny'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));

        // var pokenames = [];
        // pokenames.push(pokemon.map(result => `${result.name}`));
        // console.log(pokenames);
        // console.log(pokemon.map(result => `${result.name}`));
        // for (let i = 1; i <= 150; i++) {
        //     const reddit_url = `https://www.reddit.com/r/pokemon/search.json?t=year&sort=relevance&q=${pokenames[i]}`;
        //     apicallreddit.push(fetch(reddit_url).then((response) => response.json()));
        // }
        //RedditInfo(pokemon);
        RenderIndex(pokemon);
        testmodal();
        LoadModal(pokemon);
    });

    const RedditInfo = (pokemon) => {

        const pokenames = pokemon.map(result => `${result.name}`);
        console.log(pokenames);
        for (let i = 1; i <= 150; i++) {
            const reddit_url = `https://www.reddit.com/r/pokemon/search.json?t=year&sort=relevance&q=${pokenames[i]}`;
            apicallreddit.push(fetch(reddit_url).then((response) => response.json()));
        }

    }

    // .then(data => {
    //     console.log(data);
    //     const pokemon = {
    //     };

    //     console.log(pokemon);

    //     //code not working properly retuing undefined as aditional first param
    //     // pokemon['id'] = data.id;
    //     // pokemon['name'] = data.name;
    //     // pokemon['picture'] = data.sprites['front_default'];
    //     // data.types.forEach((type) => {
    //     //     //data from array of array tem que se concatenar
    //     //     pokemon['type'] = pokemon['type'] + ',' + type.type.name
    //     // });
    //     // console.log(data);
    //     // console.log(pokemon);
    // });

};

const RenderIndex = (pokemon) => {
    // console.log(pokemon);

    const cards = pokemon.map(result => `
    <li  id="show_modal"class="card">
    <img class="card-pic " src="${result.picture}"/>
    <h1 class="card-title">#${result.id} ${result.name}</h1>
    <p class="card-type">Type: ${result.type}</p>
    </li>
    `).join('');

    pokedexelements.innerHTML = cards;
    testmodal();
    // const openModal = document.querySelectorAll('#show_modal');
    // openModal.addEventListener('click', toggleModal);
    // const closemodal = document.querySelectorAll('.modal_close');
    // closemodal.addEventListener('click', toggleModal);

};
const testmodal = () => {
    var lists = document.getElementsByClassName('card');
    
    
    var numlists = lists.length;
   
    console.log(numlists);
    for (var i = 0; i <= numlists; i++) {
        lists[i].addEventListener('click', toggleModal);
        
    }
}

const toggleModal = () => {
    document.querySelector('.modal').classList.toggle('modal_hidden');
};

const LoadModal = (pokemon) => {
    const modal = pokemon.map(result => `
    <div id="show_modal" class="">
    <img class="card-pic " src="${result.shinypic}"/>
    <h1 class="card-title">${result.name}</h1>
    <p class="card-type">Type: ${result.type}</p>
    </div>
    `).join('');
    PokeInfo.innerHTML = modal;

};
pokedata();