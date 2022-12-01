var pays = /** @class */ (function () {
    function pays(nom, nombrePopulation, nombreContamine, nombreSain, nombreMort, tauxSoin, tauxContagion, tauxMortalité) {
        this.nom = nom;
        this.nombrePopulation = nombrePopulation;
        this.nombreContamine = nombreContamine;
        this.nombreSain = nombreSain;
        this.nombreMort = nombreMort;
        this.tauxSoin = tauxSoin; // Dépend de la corpo des médecins
        this.tauxContagion = tauxContagion; // Si, sain, pourcentage d'être contaminé
        this.tauxMortalité = tauxMortalité; // Si infecté, faculté à mourir
    }
    return pays;
}());
var monde = /** @class */ (function () {
    function monde(deltaTauxSoin, nombrePopulation, nombreContamine, nombreSain, nombreMort, listePays) {
        this.deltaTauxSoin = deltaTauxSoin;
        this.nombrePopulation = nombrePopulation;
        this.nombreContamine = nombreContamine;
        this.nombreSain = nombreSain;
        this.nombreMort = nombreMort;
        this.listePays = listePays;
    }
    return monde;
}());


