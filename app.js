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
console.log(pokecount());
const pokedata = () => {
    pokecount();
    console.log(pokecount())
    for (let i = 1; i <= 150; i++) {
        var url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            const pokemon = {
                id: data.id,
                name: data.name,
                picture: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', ')

            };

            console.log(pokemon);

            //code not working properly retuing undefined as aditional first param
            // pokemon['id'] = data.id;
            // pokemon['name'] = data.name;
            // pokemon['picture'] = data.sprites['front_default'];
            // data.types.forEach((type) => {
            //     //data from array of array tem que se concatenar 
            //     pokemon['type'] = pokemon['type'] + ',' + type.type.name
            // });
            // console.log(data);
            // console.log(pokemon);
        });
    };
}

//pokedata();