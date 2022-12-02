import * as PIXI from 'pixi.js';
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

    // Set scene
    var scene = new HelloWorld(app);
    app.stage.addChild(scene);
};

main();
