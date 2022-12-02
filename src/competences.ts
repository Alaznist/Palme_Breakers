class competence{

    public constructor(name : string, description : string, effects : number[], cost : number){
        this.name = name;
        this.description = description;
        this.effets = effects;
        this.cost = cost;
    }

    public name : string;
    public description : string;
    public effets : number[];

    cost : number;

    bought : boolean = false;

    public buy(){
        if (!this.bought){
            // check l'argent et l'enlever
            
        }
    }
}
 
