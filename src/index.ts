import { SceneManager } from './sceneManager.js';
import { MenuScene } from './menuScene.js';
import { GameScene } from './gameScene.js';

('use strict');

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const sceneManager = new SceneManager();

if (typeof window !== 'undefined') {
  window.onload = () => {
    initializeCanvas();
    initializeScenes();
    startGameLoop();
  };
}

function initializeCanvas(): void {
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d')!;
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas, false);
}

function resizeCanvas(): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // the font looks like shit but I can't get this to work.

  //const dpr = window.devicePixelRatio;
  //const rect = canvas.getBoundingClientRect();

  //canvas.width = rect.width * dpr;
  //canvas.height = rect.height * dpr;

  //ctx.scale(dpr, dpr);

  //canvas.style.width = `${rect.width}px`;
  //canvas.style.height = `${rect.height}px`;
}

function initializeScenes(): void {
  const menuScene = new MenuScene(sceneManager, canvas);
  const gameScene = new GameScene();

  sceneManager.registerScene('menu', menuScene);
  sceneManager.registerScene('game', gameScene);

  sceneManager.switchSceneByName('menu');
}

function startGameLoop(): void {
  function gameLoop(): void {
    sceneManager.update();
    sceneManager.render(ctx);
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
