webpackHotUpdate("main",{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(__webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js"));
const pixi_js_1 = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
const helloWorld_1 = __webpack_require__(/*! ./scenes/helloWorld */ "./src/scenes/helloWorld.ts");
class pays {
    constructor(nom, nombrePopulation, nombreContamine, nombreSain, nombreMort, tauxContagion, tauxMortalité) {
        this.nom = nom;
        this.nombrePopulation = nombrePopulation;
        this.nombreContamine = nombreContamine;
        this.nombreSain = nombreSain;
        this.nombreMort = nombreMort;
        this.tauxContagion = tauxContagion; // Si, sain, pourcentage d'être contaminé
        this.tauxMortalité = tauxMortalité; // Si infecté, faculté à mourir
    }
    // retourne les différences, en premier la diff de gens sains, en second les nouveaux contaminés, en troisième les morts
    updatePas() {
        let diffConta = parseInt((this.nombreContamine * this.tauxContagion / 1000).toFixed(0));
        this.nombreSain -= diffConta;
        this.nombreContamine += diffConta;
        let diffMmort = parseInt((this.tauxMortalité * this.nombreContamine / 1000).toFixed(0));
        this.nombreContamine -= diffMmort;
        this.nombreMort += diffMmort;
        return [-diffConta, diffConta, diffMmort];
    }
}
class monde {
    constructor(deltaTauxSoin, nombrePopulation, nombreContamine, nombreSain, nombreMort, listePays) {
        this.tauxSoin = 0;
        this.deltaTauxSoin = deltaTauxSoin;
        this.nombrePopulation = nombrePopulation;
        this.nombreContamine = nombreContamine;
        this.nombreSain = nombreSain;
        this.nombreMort = nombreMort;
        this.listePays = listePays;
    }
    pasTemp() {
        this.pasSoin();
        let diff = this.pasPopu();
        this.nombreSain += diff[0];
        this.nombreContamine += diff[1];
        this.nombreMort += diff[2];
    }
    pasSoin() {
        this.tauxSoin += this.deltaTauxSoin;
        if (this.tauxSoin >= 1000) {
            // App close
        }
    }
    pasPopu() {
        let diff = [0, 0, 0];
        this.listePays.forEach(pays => {
            let temp = pays.updatePas();
            for (let i in temp) {
                diff[i] += temp[i];
            }
        });
        return diff;
    }
}
class competence {
    constructor(name, description, effects, cost) {
        this.bought = false;
        this.name = name;
        this.description = description;
        this.effets = effects;
        this.cost = cost;
    }
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Main app
    let app = new PIXI.Application();
    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', (e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
    // Init du monde
    let data = __webpack_require__(/*! ../assets/informationPays.json */ "./assets/informationPays.json");
    let listePays = [];
    let contaminationDepart = 100;
    let tauxDepartConta = 20;
    // Création de la liste des pays
    for (const item of data) {
        let pays1 = new pays(item["name"], item["pop"], contaminationDepart, item["pop"] - contaminationDepart, 0, tauxDepartConta, 15);
        listePays.push(pays1);
    }
    // retourne le nombre de population dans le monde
    function nombrePopulationTotale(listePays) {
        let total = 0;
        for (const pays of listePays) {
            total += Number(pays.nombrePopulation);
        }
        return total;
    }
    let modelisationMonde = new monde(3, nombrePopulationTotale(listePays), contaminationDepart * listePays.length, nombrePopulationTotale(listePays) - (contaminationDepart * listePays.length), 0, listePays);
    // Load assets
    document.body.appendChild(app.view);
    // Create the sprite and add it to the stage
    let sprite = PIXI.Sprite.from('assets/monde.webp');
    sprite.width = window.innerWidth;
    // sprite.height = window.innerHeight;
    app.stage.addChild(sprite);
    let barre_fond = new pixi_js_1.Graphics();
    app.stage.addChild(barre_fond);
    let progress_contaminee = 0.8;
    let barre_caca = new pixi_js_1.Graphics();
    app.stage.addChild(barre_caca);
    let progress_morte = 0.5;
    let barre_prout = new pixi_js_1.Graphics();
    app.stage.addChild(barre_prout);
    let competenceJson = __webpack_require__(/*! ../assets/informationCompetences.json */ "./assets/informationCompetences.json");
    let listeCompetence = [];
    for (const Objetcompetence of competenceJson["competences"]) {
        listeCompetence.push(new competence(Objetcompetence["name"], Objetcompetence["description"], Objetcompetence["effects"], Objetcompetence["cost"]));
    }
    //  render :
    let arbre = document.createElement("div");
    arbre.style.position = "absolute";
    arbre.style.width = "45%";
    arbre.style.height = "90%";
    arbre.style.overflow = "scroll";
    arbre.style.zIndex = "100";
    arbre.style.backgroundColor = "#ffffff";
    arbre.style.left = "50%";
    arbre.style.top = "50%";
    arbre.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(arbre);
    let is_arbre_toggled = false;
    let toggle_button = document.createElement("button");
    toggle_button.style.position = "absolute";
    toggle_button.style.top = "3%";
    toggle_button.style.right = "3%";
    toggle_button.innerHTML = "arbre";
    document.body.appendChild(toggle_button);
    toggle_button.onclick = () => {
        is_arbre_toggled = !is_arbre_toggled;
        if (is_arbre_toggled) {
            arbre.style.display = "none";
        }
        else {
            arbre.style.display = "block";
        }
    };
    let currency = 0;
    for (let comp of listeCompetence) {
        let div = document.createElement("div");
        let titre = document.createElement("h3");
        titre.innerHTML = comp.name;
        let desc = document.createElement("p");
        desc.innerHTML = comp.description;
        let btn = document.createElement("button");
        btn.innerHTML = "Acheter";
        btn.onclick = () => {
            if (!comp.bought && currency > comp.cost) {
                comp.bought = true;
                currency -= comp.cost;
                div.style.backgroundColor = "green";
                for (let p of listePays) {
                    p.tauxMortalité += comp.effets[0];
                    p.tauxContagion += comp.effets[1];
                    modelisationMonde.deltaTauxSoin += comp.effets[2];
                }
            }
        };
        div.appendChild(titre);
        div.appendChild(desc);
        div.appendChild(btn);
        setTimeout(() => {
            modelisationMonde.pasTemp();
            barre_fond.clear();
            barre_caca.clear();
            barre_prout.clear();
            barre_fond.beginFill(0);
            barre_fond.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * 0.8, window.innerHeight * 0.025);
            barre_caca.beginFill(0x00FF00);
            barre_caca.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * (progress_contaminee * 0.8), window.innerHeight * 0.025);
            barre_prout.beginFill(0x0000FF);
            barre_prout.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * (progress_morte * 0.8), window.innerHeight * 0.025);
        }, 2000);
        let wallet = document.createElement("p");
        wallet.innerHTML = currency + " capotes percées";
        wallet.style.position = "absolute";
        wallet.style.top = "6%";
        wallet.style.right = "3%";
        document.body.appendChild(waller);
        setTimeout(() => {
            let capote = PIXI.Sprite.from('assets/capote.svg');
            capote.interactive = true;
            capote.x = Math.random() * window.innerWidth;
            capote.y = Math.random() * window.innerHeight;
            capote.on("pointerdown", () => {
                currency += Math.round(Math.random() * 3);
                app.stage.removeChild(capote);
                wallet.innerHTML = currency + " capotes percées";
            });
            app.stage.addChild(capote);
        }, 3000);
        arbre.appendChild(div);
    }
    // Set scene
    var scene = new helloWorld_1.HelloWorld(app);
    app.stage.addChild(scene);
});
main();


/***/ })

})
//# sourceMappingURL=main.2ad0aa75f031578f4258.hot-update.js.map