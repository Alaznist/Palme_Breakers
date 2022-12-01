import * as PIXI from 'pixi.js';
//import { HelloWorld } from './scenes/helloWorld';

const main = async () => {


    // Main app
    let screenCanvas = document.createElement("canvas");
    let app = new PIXI.Application({
        width: 640, height: 360,
        view: screenCanvas
    });
    document.body.appendChild(screenCanvas);


    // Create the sprite and add it to the stage
    let sprite = PIXI.Sprite.from('assets/sida.jpg');
    app.stage.addChild(sprite);

    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    app.ticker.add((delta) => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
    });

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', (e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

};

main();
