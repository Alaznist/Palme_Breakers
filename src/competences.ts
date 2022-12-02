class competence{

    public constructor(name : String, description : String, effects : number[]){
        this.name = name;
        this.description = description;
        this.effets = effects;
    }

    name : String;
    description : String;
    effets : number[];
}


let competenceJson = require("../assets/informationCompetences.json");
let listeCompetence: competence[] = [];

for (const Objetcompetence of competenceJson["competences"]) {
    listeCompetence.push(new competence(Objetcompetence["name"],Objetcompetence["description"],Objetcompetence["effects"]));   
}

console.log(listeCompetence);