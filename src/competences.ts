class competence{

    public constructor(name : String, description : String, effects : number[], cost : number){
        this.name = name;
        this.description = description;
        this.effets = effects;
        this.cost = cost;
    }

    name : String;
    description : String;
    effets : number[];

    cost : number;

    buyed : boolean = false;

    public buy(){
        if (!this.buyed){
            // check l'argent et l'enlever
            
        }
    }
}


let competenceJson = require("../assets/informationCompetences.json");
let listeCompetence: competence[] = [];

for (const Objetcompetence of competenceJson["competences"]) {
    listeCompetence.push(new competence(Objetcompetence["name"],Objetcompetence["description"],Objetcompetence["effects"],Objetcompetence["cost"]));   
}

console.log(listeCompetence);