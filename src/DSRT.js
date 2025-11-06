/**
 * DSRT.js
 * Public entry point for DSRT engine
 * Aggregates all modules for external use
 *
 * Conventions:
 * - Boolean flags: dsrtIs<ClassName>
 * - JSDoc with onboarding clarity
 * - Validation and usage examples
 */

// Core
export { Object3D } from './core/Object3D.js';
export { BufferGeometry } from './core/BufferGeometry.js';
export { BufferAttribute } from './core/BufferAttribute.js';
export { Clock } from './core/Clock.js';
export { EventDispatcher } from './core/EventDispatcher.js';
export { Layers } from './core/Layers.js';
export { Raycaster } from './core/Raycaster.js';
export { Uniform } from './core/Uniform.js';
export { UniformsGroup } from './core/UniformsGroup.js';

// Materials
export { Material } from './materials/Material.js';
export { MeshStandardMaterial } from './materials/MeshStandardMaterial.js';
export { MeshPhysicalMaterial } from './materials/MeshPhysicalMaterial.js';
export { MeshPhongMaterial } from './materials/MeshPhongMaterial.js';
export { MeshLambertMaterial } from './materials/MeshLambertMaterial.js';
export { MeshNormalMaterial } from './materials/MeshNormalMaterial.js';
export { MeshDepthMaterial } from './materials/MeshDepthMaterial.js';
export { MeshDistanceMaterial } from './materials/MeshDistanceMaterial.js';
export { MeshToonMaterial } from './materials/MeshToonMaterial.js';
export { MeshMatcapMaterial } from './materials/MeshMatcapMaterial.js';
export { MeshBasicMaterial } from './materials/MeshBasicMaterial.js';
export { PointsMaterial } from './materials/PointsMaterial.js';
export { SpriteMaterial } from './materials/SpriteMaterial.js';
export { ShaderMaterial } from './materials/ShaderMaterial.js';
export { RawShaderMaterial } from './materials/RawShaderMaterial.js';
export { ShadowMaterial } from './materials/ShadowMaterial.js';
export { LineBasicMaterial } from './materials/LineBasicMaterial.js';
export { LineDashedMaterial } from './materials/LineDashedMaterial.js';

// Math
export { Box2 } from './math/Box2.js';
export { Box3 } from './math/Box3.js';
export { Color } from './math/Color.js';
export { Euler } from './math/Euler.js';
export { Frustum } from './math/Frustum.js';
export { Line3 } from './math/Line3.js';
export { Matrix3 } from './math/Matrix3.js';
export { Matrix4 } from './math/Matrix4.js';
export { Plane } from './math/Plane.js';
export { Quaternion } from './math/Quaternion.js';
export { Ray } from './math/Ray.js';
export { Sphere } from './math/Sphere.js';
export { Spherical } from './math/Spherical.js';
export { Triangle } from './math/Triangle.js';
export { Vector2 } from './math/Vector2.js';
export { Vector3 } from './math/Vector3.js';
export { Vector4 } from './math/Vector4.js';
export { MathUtils } from './math/MathUtils.js';
export { Interpolant } from './math/Interpolant.js';
export { LinearInterpolant } from './math/interpolants/LinearInterpolant.js';
export { CubicInterpolant } from './math/interpolants/CubicInterpolant.js';
export { DiscreteInterpolant } from './math/interpolants/DiscreteInterpolant.js';
export { QuaternionLinearInterpolant } from './math/interpolants/QuaternionLinearInterpolant.js';

// Objects
export { Mesh } from './objects/Mesh.js';
export { Line } from './objects/Line.js';
export { LineSegments } from './objects/LineSegments.js';
export { LineLoop } from './objects/LineLoop.js';
export { Points } from './objects/Points.js';
export { Group } from './objects/Group.js';
export { Bone } from './objects/Bone.js';
export { Skeleton } from './objects/Skeleton.js';
export { SkinnedMesh } from './objects/SkinnedMesh.js';
export { Sprite } from './objects/Sprite.js';
export { LOD } from './objects/LOD.js';
export { InstancedMesh } from './objects/InstancedMesh.js';
export { BatchedMesh } from './objects/BatchedMesh.js';
export { ClippingGroup } from './objects/ClippingGroup.js';

// Geometries
export { BoxGeometry } from './geometries/BoxGeometry.js';
export { CapsuleGeometry } from './geometries/CapsuleGeometry.js';
export { CircleGeometry } from './geometries/CircleGeometry.js';
export { ConeGeometry } from './geometries/ConeGeometry.js';
export { CylinderGeometry } from './geometries/CylinderGeometry.js';
export { DodecahedronGeometry } from './geometries/DodecahedronGeometry.js';
export { EdgesGeometry } from './geometries/EdgesGeometry.js';
export { ExtrudeGeometry } from './geometries/ExtrudeGeometry.js';
export { IcosahedronGeometry } from './geometries/IcosahedronGeometry.js';
export { LatheGeometry } from './geometries/LatheGeometry.js';
export { OctahedronGeometry } from './geometries/OctahedronGeometry.js';
export { PlaneGeometry } from './geometries/PlaneGeometry.js';
export { PolyhedronGeometry } from './geometries/PolyhedronGeometry.js';
export { RingGeometry } from './geometries/RingGeometry.js';
export { ShapeGeometry } from './geometries/ShapeGeometry.js';
export { SphereGeometry } from './geometries/SphereGeometry.js';
export { TetrahedronGeometry } from './geometries/TetrahedronGeometry.js';
export { TorusGeometry } from './geometries/TorusGeometry.js';
export { TorusKnotGeometry } from './geometries/TorusKnotGeometry.js';
export { TubeGeometry } from './geometries/TubeGeometry.js';
export { WireframeGeometry } from './geometries/WireframeGeometry.js';

// Renderers
export { WebGLRenderer } from './renderers/WebGLRenderer.js';
export { WebGLRenderTarget } from './renderers/WebGLRenderTarget.js';
export { WebGLCubeRenderTarget } from './renderers/WebGLCubeRenderTarget.js';
export { WebGLArrayRenderTarget } from './renderers/WebGLArrayRenderTarget.js';
export { WebGL3DRenderTarget } from './renderers/WebGL3DRenderTarget.js';
export { WebGPURenderer } from './renderers/webgpu/WebGPURenderer.js';
export { WebXRManager } from './renderers/webxr/WebXRManager.js';

// Textures
export { Texture } from './textures/Texture.js';
export { CanvasTexture } from './textures/CanvasTexture.js';
export { CubeTexture } from './textures/CubeTexture.js';
export { DataTexture } from './textures/DataTexture.js';
export { Data3DTexture } from './textures/Data3DTexture.js';
export { DataArrayTexture } from './textures/DataArrayTexture.js';
export { DepthTexture } from './textures/DepthTexture.js';
export { FramebufferTexture } from './textures/FramebufferTexture.js';
export { VideoTexture } from './textures/VideoTexture.js';
export { VideoFrameTexture } from './textures/VideoFrameTexture.js';
export { CompressedTexture } from './textures/CompressedTexture.js';
export { CompressedCubeTexture } from './textures/CompressedCubeTexture.js';
export { CompressedArrayTexture } from './textures/CompressedArrayTexture.js';
export { ExternalTexture } from './textures/ExternalTexture.js';
export { Source } from './textures/Source.js';

// Helpers
export { ArrowHelper } from './helpers/ArrowHelper.js';
export { AxesHelper } from './helpers/AxesHelper.js';
export { BoxHelper } from './helpers/BoxHelper.js';
export { Box3Helper } from './helpers/Box3Helper.js';
export { CameraHelper } from './helpers/CameraHelper.js';
export { DirectionalLightHelper } from './helpers/DirectionalLightHelper.js';
export { GridHelper } from './helpers/GridHelper.js';
export { HemisphereLightHelper } from './helpers/HemisphereLightHelper.js';
export { PlaneHelper } from './helpers/PlaneHelper.js';
export { PointLightHelper } from './helpers/PointLightHelper.js';
export { PolarGridHelper } from './helpers/PolarGridHelper.js';
export { SkeletonHelper } from './helpers/SkeletonHelper.js';
export { SpotLightHelper } from './helpers/SpotLightHelper.js';

// Animation
export { AnimationAction } from './animation/AnimationAction.js';
export { AnimationClip } from './animation/AnimationClip.js';
export { AnimationMixer } from './animation/AnimationMixer.js';
export { AnimationObjectGroup } from './animation/AnimationObjectGroup.js';
export { AnimationUtils } from './animation/AnimationUtils.js';
export { KeyframeTrack } from './animation/KeyframeTrack.js';
export { PropertyBinding } from './animation/PropertyBinding.js';
export { PropertyMixer } from './animation/PropertyMixer.js';
export { BooleanKeyframeTrack } from './animation/tracks/BooleanKeyframeTrack.js';
export { ColorKeyframeTrack } from './animation/tracks/ColorKeyframeTrack.js';
export { NumberKeyframeTrack } from './animation/tracks/NumberKeyframeTrack.js';
export { QuaternionKeyframeTrack } from './animation/tracks/QuaternionKeyframeTrack.js';
export { StringKeyframeTrack } from './animation/tracks/StringKeyframeTrack.js';
export { VectorKeyframeTrack } from './animation/tracks/VectorKeyframeTrack.js';

/* ================================================================================================
 * Audio
 * ============================================================================================== */
export { Audio } from './audio/Audio.js';
export { AudioAnalyser } from './audio/AudioAnalyser.js';
export { AudioContext } from './audio/AudioContext.js';
export { AudioListener } from './audio/AudioListener.js';
export { PositionalAudio } from './audio/PositionalAudio.js';

/* ================================================================================================
 * Lights
 * ============================================================================================== */
export { AmbientLight } from './lights/AmbientLight.js';
export { DirectionalLight } from './lights/DirectionalLight.js';
export { DirectionalLightShadow } from './lights/DirectionalLightShadow.js';
export { HemisphereLight } from './lights/HemisphereLight.js';
export { Light } from './lights/Light.js';
export { LightProbe } from './lights/LightProbe.js';
export { LightShadow } from './lights/LightShadow.js';
export { PointLight } from './lights/PointLight.js';
export { PointLightShadow } from './lights/PointLightShadow.js';
export { RectAreaLight } from './lights/RectAreaLight.js';
export { SpotLight } from './lights/SpotLight.js';
export { SpotLightShadow } from './lights/SpotLightShadow.js';

/* ================================================================================================
 * Loaders
 * ============================================================================================== */
export { AnimationLoader } from './loaders/AnimationLoader.js';
export { AudioLoader } from './loaders/AudioLoader.js';
export { BufferGeometryLoader } from './loaders/BufferGeometryLoader.js';
export { Cache } from './loaders/Cache.js';
export { CompressedTextureLoader } from './loaders/CompressedTextureLoader.js';
export { CubeTextureLoader } from './loaders/CubeTextureLoader.js';
export { DataTextureLoader } from './loaders/DataTextureLoader.js';
export { FileLoader } from './loaders/FileLoader.js';
export { ImageBitmapLoader } from './loaders/ImageBitmapLoader.js';
export { ImageLoader } from './loaders/ImageLoader.js';
export { Loader } from './loaders/Loader.js';
export { LoaderUtils } from './loaders/LoaderUtils.js';
export { LoadingManager } from './loaders/LoadingManager.js';
export { MaterialLoader } from './loaders/MaterialLoader.js';
export { ObjectLoader } from './loaders/ObjectLoader.js';
export { TextureLoader } from './loaders/TextureLoader.js';

/* ================================================================================================
 * Scenes
 * ============================================================================================== */
export { Scene } from './scenes/Scene.js';
export { Fog } from './scenes/Fog.js';
export { FogExp2 } from './scenes/FogExp2.js';

/* ================================================================================================
 * Extras
 * ============================================================================================== */
// Core
export { Curve } from './extras/core/Curve.js';
export { CurvePath } from './extras/core/CurvePath.js';
export { Interpolations } from './extras/core/Interpolations.js';
export { Path } from './extras/core/Path.js';
export { Shape } from './extras/core/Shape.js';
export { ShapePath } from './extras/core/ShapePath.js';

// Curves
export { ArcCurve } from './extras/curves/ArcCurve.js';
export { CatmullRomCurve3 } from './extras/curves/CatmullRomCurve3.js';
export { CubicBezierCurve } from './extras/curves/CubicBezierCurve.js';
export { CubicBezierCurve3 } from './extras/curves/CubicBezierCurve3.js';
export { Curves } from './extras/curves/Curves.js';
export { EllipseCurve } from './extras/curves/EllipseCurve.js';
export { LineCurve } from './extras/curves/LineCurve.js';
export { LineCurve3 } from './extras/curves/LineCurve3.js';
export { QuadraticBezierCurve } from './extras/curves/QuadraticBezierCurve.js';
export { QuadraticBezierCurve3 } from './extras/curves/QuadraticBezierCurve3.js';
export { SplineCurve } from './extras/curves/SplineCurve.js';

// Lib
export { earcut } from './extras/lib/earcut.js';

// Utilities
export { Controls } from './extras/Controls.js';
export { DataUtils } from './extras/DataUtils.js';
export { Earcut } from './extras/Earcut.js';
export { ImageUtils } from './extras/ImageUtils.js';
export { PMREMGenerator } from './extras/PMREMGenerator.js';
export { ShapeUtils } from './extras/ShapeUtils.js';
export { TextureUtils } from './extras/TextureUtils.js';

/* ================================================================================================
 * Nodes
 * ============================================================================================== */
export { Nodes } from './nodes/Nodes.js';
export { TSL } from './nodes/TSL.js';
// Optional curated exports if DSRT wants onboarding clarity
// export * from './nodes/core/index.js';
// export * from './nodes/math/index.js';
// export * from './nodes/lighting/index.js';
// export * from './nodes/functions/index.js';

/* ================================================================================================
 * End of DSRT.js
 * ============================================================================================== */
