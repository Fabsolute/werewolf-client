import {Clock} from 'three';
import {Container} from 'typedi';
import {CAMERA, RENDERER, SCENE, STATS} from '../services';

export default function initializeEngine() {
    const scene = Container.get(SCENE);
    window.onresize = scene.onResize;

    const clock = new Clock();

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        scene.update(delta);
    }

    async function initialize() {
        await scene.add(Container.get(RENDERER));
        await scene.add(Container.get(STATS));
        await scene.add(Container.get(CAMERA));
        await scene.awake();
    }

    initialize().then(animate);
}
