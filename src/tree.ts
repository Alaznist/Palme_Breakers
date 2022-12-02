class Competence{

    public constructor(name : String, description : String, effects : number[]){
        this.name = name;
        this.description = description;
        this.effets = effects;
    }

    public doCompet(){
        // var modif here
    }

    name : String;
    description : String;
    effets : number[];
}

class Noeux{

    public constructor(countCompetence : number, competence : Competence, to : Noeux[]){
        this.coutCompetence = countCompetence;
        this.competance = competence;
        this.to = to;
    }

    public unlockNoeux() {
        if (!this.unlocked){
            this.unlocked = true;
        }
    }

    public unlockTo(){
        this.to.forEach(element => {
            element.unlockNoeux();
        });
    }

    // fonc a appeler pour acheter un noeux
    public buyNoeux(){
        if (this.unlocked && !this.buyed /* && money > this.coutCompetence */){
            // Link here money actions
            this.competance.doCompet();
            this.unlockTo()
        }
    }

    coutCompetence : number;
    unlocked : boolean = false;
    buyed : boolean = false;
    competance : Competence;
    to : Noeux[];
}

class Arbre{

    public constructor(name : String, noeux : Noeux){
        this.name = name;
        this.baseNoeux = noeux;
    }

    name : String;
    baseNoeux : Noeux;
}

