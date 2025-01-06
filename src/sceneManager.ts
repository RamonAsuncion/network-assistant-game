export interface Scene {
  enter(): void;
  update(): void;
  render(ctx: CanvasRenderingContext2D): void;
  exit(): void;
  onMouseEvent?(type: 'mousemove' | 'click', pos: Point): void;
}

export class SceneManager {
  private _scenes: Map<string, Scene> = new Map();
  private _currentScene: Scene | null = null;

  registerScene(name: string, scene: Scene): void {
    this._scenes.set(name, scene);
  }

  switchSceneByName(name: string): void {
    const scene = this._scenes.get(name);
    if (scene) {
      if (this._currentScene) {
        this._currentScene.exit();
      }
      this._currentScene = scene;
      this._currentScene.enter();
    } else {
      console.error(`Scene ${name} not found.`)
    }
  }

  switchScene(scene: Scene): void {
    if (this._currentScene) {
      this._currentScene.exit();
    }
    this._currentScene = scene;
    this._currentScene.enter();
  }

  update(): void {
    if (this._currentScene) {
      this._currentScene.update();
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this._currentScene) {
      this._currentScene.render(ctx);
    }
  }

  handleMouseEvent(type: 'mousemove' | 'click', pos: Point): void {
    if (this._currentScene && this._currentScene.onMouseEvent) {
      this._currentScene.onMouseEvent(type, pos);
    }
  }
}
