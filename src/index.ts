import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { HelloWorld } from './scenes/helloWorld';


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
}




const main = async () => {
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
    let data = require('../assets/informationPays.json');
    let listePays: pays[] = [];
    let contaminationDepart: number = 100;
    let tauxDepartConta : number = 20;
    // Création de la liste des pays
    for (const item of data) {
        let pays1 = new pays(item["name"],item["pop"] as number,contaminationDepart,item["pop"] as number-contaminationDepart,0,tauxDepartConta,15);
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
    
    // Load assets
    document.body.appendChild(app.view);

    // Create the sprite and add it to the stage
    let sprite = PIXI.Sprite.from('assets/monde.webp');
    sprite.width = window.innerWidth;
    sprite.height = window.innerHeight;
    app.stage.addChild(sprite);

    let barre_fond = new Graphics();
    app.stage.addChild(barre_fond)

    let progress_contaminee = 0.8;
    let barre_caca = new Graphics();
    app.stage.addChild(barre_caca)

    let progress_morte = 0.5;
    let barre_prout = new Graphics();
    app.stage.addChild(barre_prout)

    let competenceJson = require("../assets/informationCompetences.json");
    let listeCompetence: competence[] = [];

    for (const Objetcompetence of competenceJson["competences"]) {
        listeCompetence.push(new competence(Objetcompetence["name"],Objetcompetence["description"],Objetcompetence["effects"],Objetcompetence["cost"]));   
    }

//  render :
     
    let arbre = document.createElement("div")
    arbre.style.position = "absolute"
    arbre.style.width = "45%"
    arbre.style.height = "90%";
    arbre.style.overflow = "scroll";
    arbre.style.zIndex = "100";
    arbre.style.backgroundColor = "#ffffff"
    arbre.style.left = "50%"
    arbre.style.top = "50%"
    arbre.style.transform = "translate(-50%, -50%)"
    document.body.appendChild(arbre)

    let is_arbre_toggled = false;
    let toggle_button = document.createElement("button")
    toggle_button.style.position = "absolute"
    toggle_button.style.top = "3%"
    toggle_button.style.right = "3%"
    toggle_button.innerHTML = "arbre"
    document.body.appendChild(toggle_button)
    toggle_button.onclick = () => {
        is_arbre_toggled = !is_arbre_toggled
        if (is_arbre_toggled) {
            arbre.style.display = "none"
        }
        else {
            arbre.style.display = "block"
        }
    }

    let currency = 0;

    let wallet = document.createElement("p")
    wallet.innerHTML = currency + " capotes percées";
    wallet.style.position = "absolute"
    wallet.style.top = "6%"
    wallet.style.right = "3%"
    document.body.appendChild(wallet)   

    for (let comp of listeCompetence) {
        let div = document.createElement("div")
        let titre = document.createElement("h3")
        titre.innerHTML = comp.name
        let desc = document.createElement("p")
        desc.innerHTML = comp.description

        let btn = document.createElement("button")
        btn.innerHTML = "Acheter"
        btn.onclick = () => {
            if (!comp.bought && currency > comp.cost) {
                comp.bought = true;
                currency -= comp.cost;
                div.style.backgroundColor = "green"
                wallet.innerHTML = currency +" capotes percées"

                for (let p of listePays) {
                    p.tauxMortalité += comp.effets[0]
                    p.tauxContagion += comp.effets[1]
                    modelisationMonde.deltaTauxSoin += comp.effets[2]
                }
            }
        }
        
        div.appendChild(titre)
        div.appendChild(desc)
        div.appendChild(btn)

        arbre.appendChild(div)
    }

    setInterval(() => {
        modelisationMonde.pasTemp()
        progress_contaminee = listePays[0].tauxContagion / 1000
        progress_morte = modelisationMonde.nombreMort / modelisationMonde.nombrePopulation

        barre_fond.clear()
        barre_caca.clear()
        barre_prout.clear()

        barre_fond.beginFill(0);
        barre_fond.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * 0.8 ,  window.innerHeight * 0.025)
       
        barre_caca.beginFill(0x00FF00);
        barre_caca.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * (progress_contaminee * 0.8) ,  window.innerHeight * 0.025)

        barre_prout.beginFill(0x0000FF);
        barre_prout.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * (progress_morte * 0.8) ,  window.innerHeight * 0.025)
        }, 2000)


    setInterval(() => {
        let capote = PIXI.Sprite.from('assets/capote.svg');
        capote.interactive = true
        capote.x = Math.random() * window.innerWidth
        capote.y= Math.random() * window.innerHeight
        capote.on("pointerdown", () => {
            currency += Math.round(Math.random() * 3);
            app.stage.removeChild(capote)
            wallet.innerHTML = currency +" capotes percées"
        })
        app.stage.addChild(capote)  
    }, 3000)

    


    // Set scene
    var scene = new HelloWorld(app);
    app.stage.addChild(scene);
};


main();
