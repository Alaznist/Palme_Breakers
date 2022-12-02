var pays = /** @class */ (function () {
    function pays(nom, nombrePopulation, nombreContamine, nombreSain, nombreMort, tauxContagion, tauxMortalité) {
        this.nom = nom;
        this.nombrePopulation = nombrePopulation;
        this.nombreContamine = nombreContamine;
        this.nombreSain = nombreSain;
        this.nombreMort = nombreMort;
        this.tauxContagion = tauxContagion; // Si, sain, pourcentage d'être contaminé
        this.tauxMortalité = tauxMortalité; // Si infecté, faculté à mourir
    }
    // retourne les différences, en premier la diff de gens sains, en second les nouveaux contaminés, en troisième les morts
    pays.prototype.updatePas = function () {
        var diffConta = parseInt((this.nombreContamine * this.tauxContagion / 1000).toFixed(0));
        console.log("diffConta : " + diffConta);
        this.nombreSain -= diffConta;
        this.nombreContamine += diffConta;
        var diffMmort = parseInt((this.tauxMortalité * this.nombreContamine / 1000).toFixed(0));
        console.log("diffMort : " + diffMmort);
        this.nombreContamine -= diffMmort;
        this.nombreMort += diffMmort;
        return [-diffConta, diffConta, diffMmort];
    };
    return pays;
}());
var monde = /** @class */ (function () {
    function monde(deltaTauxSoin, nombrePopulation, nombreContamine, nombreSain, nombreMort, listePays) {
        this.tauxSoin = 0;
        this.deltaTauxSoin = deltaTauxSoin;
        this.nombrePopulation = nombrePopulation;
        this.nombreContamine = nombreContamine;
        this.nombreSain = nombreSain;
        this.nombreMort = nombreMort;
        this.listePays = listePays;
    }
    monde.prototype.pasTemp = function () {
        this.pasSoin();
        var diff = this.pasPopu();
        this.nombreSain += diff[0];
        this.nombreContamine += diff[1];
        this.nombreMort += diff[2];
    };
    monde.prototype.pasSoin = function () {
        this.tauxSoin += this.deltaTauxSoin;
        if (this.tauxSoin >= 1000) {
            // App close
        }
    };
    monde.prototype.pasPopu = function () {
        var diff = [0, 0, 0];
        this.listePays.forEach(function (pays) {
            var temp = pays.updatePas();
            for (var i in temp) {
                diff[i] += temp[i];
            }
        });
        return diff;
    };
    return monde;
}());
var data = require('../assets/informationPays.json');
var listePays = [];
var contaminationDepart = 100;
var tauxDepartConta = 20;
// Création de la liste des pays
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var item = data_1[_i];
    var pays1 = new pays(item["name"], item["pop"], contaminationDepart, item["pop"] - contaminationDepart, 0, tauxDepartConta, 15);
    listePays.push(pays1);
}
// retourne le nombre de population dans le monde
function nombrePopulationTotale(listePays) {
    var total = 0;
    for (var _i = 0, listePays_1 = listePays; _i < listePays_1.length; _i++) {
        var pays_1 = listePays_1[_i];
        total += Number(pays_1.nombrePopulation);
    }
    return total;
}
var modelisationMonde = new monde(3, nombrePopulationTotale(listePays), contaminationDepart * listePays.length, nombrePopulationTotale(listePays) - (contaminationDepart * listePays.length), 0, listePays);
console.log(modelisationMonde);
modelisationMonde.pasTemp();
console.log(modelisationMonde);
