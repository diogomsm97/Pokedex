const pokedexelements = document.getElementById("pokedex");

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
        RedditInfo(pokemon);
        RenderIndex(pokemon);
    });

    const RedditInfo = (pokemon) => {
        var pokenames = [];
        pokenames.push(pokemon.map(result => `${result.name}`));
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
    <li class="card">
    <img class="card-pic" src="${result.picture}"/>
    <h1 class="card-title">${result.id}.${result.name}</h1>
    <p class="card-type">Type: ${result.type}</p>
    </li>
    `).join('');
    pokedexelements.innerHTML = cards;
};


pokedata();