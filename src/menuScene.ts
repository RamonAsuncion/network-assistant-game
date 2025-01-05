import { Scene } from "./sceneManager";

// https://docs.godotengine.org/en/3.0/getting_started/step_by_step/ui_main_menu.html

export class MenuScene implements Scene {
   enter(): void {
    console.log("Entering main menu");
  }

   update(): void {
    console.log("Updating main menu");
  }

   render(ctx: CanvasRenderingContext2D): void {
  }

   exit(): void {
    console.log("Exiting main menu");

    // destory the scene. should be called when
    // 1. press play
    // 2. exit game.

  }

   onMouseEvent(type: 'mouseevent' | 'click', pos: Point): void {
    if (type == 'click') {
      console.log(`Clicked mouse at ${pos.x} ${pos.y}`);
    }
  }
}
