import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { HelloWorld } from './scenes/helloWorld';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/sida.jpg').load(() => {
            resolve();
        });
    });
};



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
    await load(app);
    document.body.appendChild(app.view);

    // Create the sprite and add it to the stage
    let sprite = PIXI.Sprite.from('assets/monde.webp');
    app.stage.addChild(sprite);

    let barre_fond = new Graphics();
    barre_fond.beginFill(0);
    barre_fond.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * 0.8 ,  window.innerHeight * 0.025)
    app.stage.addChild(barre_fond)

    let progress_contaminee = 0.8;
    let barre_caca = new Graphics();
    barre_caca.beginFill(0x00FF00);
    barre_caca.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * (progress_contaminee * 0.8) ,  window.innerHeight * 0.025)
    app.stage.addChild(barre_caca)

    let progress_morte = 0.5;
    let barre_prout = new Graphics();
    barre_prout.beginFill(0x0000FF);
    barre_prout.drawRect(window.innerWidth * 0.1, window.innerHeight * 0.925, window.innerWidth * (progress_morte * 0.8) ,  window.innerHeight * 0.025)
    app.stage.addChild(barre_prout)

    let competences = []

    let arbre = document.createElement("div")

    for (let comp of competences) {
        let div = document.createElement("div")
        let titre = document.createElement("h3")
        titre.innerHTML = competence.name
        let desc = document.createElement("p")
        desc.innerHTML = competence.description

        div.appendChild(titre)
        div.appendChild(desc)

        arbre.appendChild(div)
    }

    // Set scene
    var scene = new HelloWorld(app);
    app.stage.addChild(scene);
};

main();
