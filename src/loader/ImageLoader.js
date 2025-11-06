import { Loader } from './Loader.js';

/**
 * @module DSRTImageLoader
 * @class ImageLoader
 * @classdesc
 * Loader for images.
 *
 * @property {boolean} dsrtIsImageLoader - Type guard flag for DSRT.ImageLoader.
 * @see DSRTImageLoader.test.js
 */
class ImageLoader extends Loader {

  constructor(manager = null) {
    super(manager);

    /** @type {boolean} */
    this.dsrtIsImageLoader = true;
  }

  load(url, onLoad, onProgress, onError) {
    const image = new Image();
    image.onload = () => {
      if (onLoad) onLoad(image);
    };
    image.onerror = (err) => {
      if (onError) onError(err);
    };
    image.src = url;
    return image;
  }
}

export { ImageLoader };
