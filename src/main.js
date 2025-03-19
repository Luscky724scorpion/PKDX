let pokemon=[
  "fire","water","grass"

  

]

let fire=[
   {gen1:"Charmander",
    gen3:"Torchick",
    gen2:"Cyndaquil"
      

   },
 

]
let water=[
   {  
    gen1:"Squirtle",
       gen2:"Totodile",
       gen3:"Mudkip",
      

   
  }
]
let grass=[
   {  
      
        gen1:"Bulbasaur",
        gen2:"Chikorita",
       gen3:"Treeko"

   
  }
]

let gens=
pokemon.filter((pokemon) => pokemon.fire==="gen1"
);
console.log("gens")






/*getting form elements from dom
const pokemonPicking = document.getElementsByClassName("type");

//handle display on submit
pokemonPicking.addEventListner("submit", (event) => {
  event.preventDefault();

  //data object for getting pokemon
  let formData = new FormData(pokemonPicking);
});*/