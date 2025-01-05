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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.addEventListener('mousemove', (event) => handleMouseEvent('mouseevent', event));
  canvas.addEventListener('click', (event) => handleMouseEvent('click', event));
}

function initializeScenes(): void {
  const menuScene = new MenuScene();
  const gameScene = new GameScene();

  sceneManager.registerScene('menu', menuScene);
  sceneManager.registerScene('game', gameScene);

  sceneManager.switchSceneByName('menu');
}

function handleMouseEvent(type: 'mouseevent' | 'click', event: MouseEvent): void {
  const mousePos = getMousePosition(canvas, event);
  sceneManager.handleMouseEvent(type, mousePos);
}

// rewrite for mouse event because i want to be handling it also in like the
// main menu to be able to click on the option

function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function isInsideRect(pos: Point, rect: Rectangle): boolean {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}

function startGameLoop(): void {
  function gameLoop(): void {
    sceneManager.update();
    sceneManager.render(ctx);
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
