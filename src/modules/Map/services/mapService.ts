export class MapService {
  private static instance: MapService;
  private map: ymaps.Map | null = null;

  private constructor() {}

  static getInstance(): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService();
    }
    return MapService.instance;
  }

  initMap(container: HTMLElement, state: ymaps.IMapState, options?: ymaps.IMapOptions): Promise<ymaps.Map> {
    return new Promise((resolve) => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          this.map = new window.ymaps.Map(container, state, options);
          resolve(this.map);
        });
      }
    });
  }

  getMap(): ymaps.Map | null {
    return this.map;
  }
}

export default MapService.getInstance();
