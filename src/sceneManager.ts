export interface Scene {
  enter(): void;
  update(): void;
  render(ctx: CanvasRenderingContext2D): void;
  exit(): void;
  onMouseEvent?(type: 'mouseevent' | 'click', pos: Point): void;
}

export class SceneManager {
  private scenes: Map<string, Scene> = new Map();
  private currentScene: Scene | null = null;

  registerScene(name: string, scene: Scene): void {
    this.scenes.set(name, scene);
  }

  switchSceneByName(name: string): void {
    const scene = this.scenes.get(name);
    if (scene) {
      if (this.currentScene) {
        this.currentScene.exit();
      }
      this.currentScene = scene;
      this.currentScene.enter();
    } else {
      console.error(`Scene ${name} not found.`)
    }
  }

  switchScene(scene: Scene): void {
    if (this.currentScene) {
      this.currentScene.exit();
    }
    this.currentScene = scene;
    this.currentScene.enter();
  }

  update(): void {
    if (this.currentScene) {
      this.currentScene.update();
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.currentScene) {
      this.currentScene.render(ctx);
    }
  }

  handleMouseEvent(type: 'mouseevent' | 'click', pos: Point): void {
    if (this.currentScene && this.currentScene.onMouseEvent) {
      this.currentScene.onMouseEvent(type, pos);
    }
  }
}
