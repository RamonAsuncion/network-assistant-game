import { Scene } from "./sceneManager";

export class GameScene implements Scene {
  enter(): void {
    console.log("Entering game scene");
  }

  update(): void {
    console.log("Updating game scene");
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game scene in Progress", 200, 200);
  }

  exit(): void {
    console.log("Exiting game scene");
  }
}
