import { ImageLoader } from './ImageLoader.js';

/**
 * @module DSRTTextureLoader
 * @class TextureLoader
 * @classdesc
 * Loader for textures (wraps ImageLoader).
 *
 * @property {boolean} dsrtIsTextureLoader - Type guard flag for DSRT.TextureLoader.
 * @see DSRTTextureLoader.test.js
 */
class TextureLoader extends ImageLoader {

  constructor(manager = null) {
    super(manager);

    /** @type {boolean} */
    this.dsrtIsTextureLoader = true;
  }

  load(url, onLoad, onProgress, onError) {
    return super.load(url, (image) => {
      const texture = { image, dsrtIsTexture: true };
      if (onLoad) onLoad(texture);
    }, onProgress, onError);
  }
}

export { TextureLoader };
