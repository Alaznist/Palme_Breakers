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
        let diffConta = parseInt((this.nombreContamine * this.tauxContagion / 1000).toFixed(0));
        this.nombreSain -= diffConta;
        this.nombreContamine += diffConta;
        let diffMmort = parseInt((this.tauxMortalité * this.nombreContamine / 1000).toFixed(0));
        this.nombreContamine -= diffMmort;
        this.nombreMort += diffMmort;
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
