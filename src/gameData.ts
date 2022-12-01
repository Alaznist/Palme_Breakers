class pays{

    nom: string;
    nombrePopulation: number;
    nombreContamine: number;
    nombreSain: number;
    nombreMort: number;
    tauxSoin: number; // Dépend de la corpo des médecins
    tauxContagion: number; // Si, sain, pourcentage d'être contaminé
    tauxMortalité: number; // Si infecté, faculté à mourir

    public constructor(nom: string, nombrePopulation: number, nombreContamine: number, nombreSain: number,
        nombreMort: number,tauxSoin: number,tauxContagion: number,tauxMortalité: number){
            this.nom = nom;
            this.nombrePopulation = nombrePopulation;
            this.nombreContamine = nombreContamine;
            this.nombreSain = nombreSain;
            this.nombreMort = nombreMort;
            this.tauxSoin = tauxSoin; // Dépend de la corpo des médecins
            this.tauxContagion = tauxContagion; // Si, sain, pourcentage d'être contaminé
            this.tauxMortalité = tauxMortalité; // Si infecté, faculté à mourir
    }
}


class monde{
    deltaTauxSoin: number; // à chaque pas de temps, le taux de soin des pays, augmente du delta
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

}