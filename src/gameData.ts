class pays{

    nom: string;
    nombrePopulation: number;
    nombreContamine: number;
    nombreSain: number;
    nombreMort: number;
    tauxContagion: number; // Si, sain, pourcentage d'être contaminé
    tauxMortalité: number; // Si infecté, faculté à mourir

    public constructor(nom: string, nombrePopulation: number, nombreContamine: number, nombreSain: number,
        nombreMort: number,tauxContagion: number,tauxMortalité: number){
            this.nom = nom;
            this.nombrePopulation = nombrePopulation;
            this.nombreContamine = nombreContamine;
            this.nombreSain = nombreSain;
            this.nombreMort = nombreMort;
            this.tauxContagion = tauxContagion; // Si, sain, pourcentage d'être contaminé
            this.tauxMortalité = tauxMortalité; // Si infecté, faculté à mourir
    }

    // retourne les différences, en premier la diff de gens sains, en second les nouveaux contaminés, en troisième les morts
    public updatePas(): number[]{
        let diffConta = parseInt((this.nombreContamine * this.tauxContagion / 10000).toFixed(0));
        console.log("diff Conta : " + diffConta);
        this.nombreSain -= diffConta;
        this.nombreContamine += diffConta;
        let diffMmort = parseInt((this.tauxMortalité * this.nombreContamine / 100).toFixed(0));
        this.nombreMort += diffMmort;
        this.nombreContamine -= diffMmort;
        return [-diffConta, diffConta, diffMmort];
    }
}


class monde{
    deltaTauxSoin: number; // à chaque pas de temps, le taux de soin des pays augmente du delta
    tauxSoin : number = 0;
    nombrePopulation: number;
    nombreContamine: number;
    nombreSain: number;
    nombreMort: number;
    listePays: pays[];

    public constructor(deltaTauxSoin: number,nombrePopulation: number, nombreContamine: number
        , nombreSain: number,nombreMort: number,listePays: pays[]){
            this.deltaTauxSoin = deltaTauxSoin;
            this.nombrePopulation = nombrePopulation;
            this.nombreContamine = nombreContamine;
            this.nombreSain = nombreSain;
            this.nombreMort = nombreMort;
            this.listePays = listePays;
    }

    public pasTemp(){
        this.pasSoin();
        let diff: number[] = this.pasPopu();
        this.nombreSain += diff[0];
        this.nombreContamine += diff[1];
        this.nombreMort += diff[2];
    }

    public pasSoin(){
        this.tauxSoin += this.deltaTauxSoin;
        if (this.tauxSoin >= 1000){
            // App close
        }
    }

    public pasPopu(): number[]{
        let diff : number[] = [0, 0, 0];
        this.listePays.forEach(pays => {
            let temp : number[] = pays.updatePas();
            for (let i in temp){
                diff[i] += temp[i];
            }
        })
        return diff;
    }
}

let data = require('../assets/informationPays.json');

let listePays: pays[] = [];
let contaminationDepart: number = 100;
let tauxDepartConta : number = 10;

// Création de la liste des pays
for (const item of data) {
    let pays1 = new pays(item["name"],item["pop"] as number,contaminationDepart,item["pop"] as number-contaminationDepart,0,tauxDepartConta,17);
    listePays.push(pays1);
}

// retourne le nombre de population dans le monde
function nombrePopulationTotale(listePays: pays[]){
    let total:number = 0;
    for (const pays of listePays) {
        total += Number(pays.nombrePopulation);
    }

    return total;
}

let modelisationMonde: monde = new monde(3,nombrePopulationTotale(listePays),contaminationDepart*listePays.length,nombrePopulationTotale(listePays)-(contaminationDepart*listePays.length),0,listePays);
console.log(modelisationMonde);
modelisationMonde.pasTemp();
console.log(modelisationMonde);

