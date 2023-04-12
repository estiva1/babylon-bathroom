const canvas = document.getElementById("renderCanvas");

const startRenderLoop = (engine) => {
  engine.runRenderLoop(() => {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

const createDefaultEngine = () => {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const pointLight = new BABYLON.PointLight(
    "light1",
    new BABYLON.Vector3(-50, 100, -200),
    scene
  );
  pointLight.intensity = 35;

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    1.3,
    0,
    1.5,
    BABYLON.Vector3(0.3, 1.8, -2.5),
    scene
  );

  camera.attachControl(canvas, false);

  BABYLON.SceneLoader.ImportMesh(
    null,
    "./models/",
    "babylonBathroom.glb",
    scene,
    () => {
      camera.alpha = 0;
      camera.beta = 0;
      camera.radius = 1.5;
      camera.target = new BABYLON.Vector3(0, 1.5, -2.5);

      engine.hideLoadingUI();

      const popup = document.createElement("div");
      popup.style.position = "absolute";
      popup.style.top = "50px";
      popup.style.left = "50px";
      popup.style.width = "200px";
      popup.style.height = "200px";
      popup.style.background = "#fff";
      popup.style.overflow = "scroll";
      popup.style.display = "none";
      document.body.appendChild(popup);

      const textures = [
        "textures/tile1(30x30).jpg",
        "textures/tile2(30x30).jpg",
        "textures/tile4(60x30).jpg",
        "textures/tile4_1(30x60).jpg",
        "textures/tile4_2(30x30).jpg",
        "textures/tile5(30x30).jpg",
        "textures/tile5_1(30x60).jpg",
        "textures/tile6(30x30).jpg",
        "textures/tile6_1(60x60).jpg",
        "textures/tile7(30x30).jpg",
        "textures/tile9(60x60).jpg",
        "textures/Water_Sp.jpg",
        "textures/Asphal01.jpg",
        "textures/Grass_01.jpg",
      ];

      for (let i = 0; i < textures.length; i++) {
        ((texture) => {
          const textureObject = new BABYLON.Texture(texture, scene);
          const textureContainer = document.createElement("div");
          textureContainer.style.margin = "5px";
          textureContainer.style.padding = "0";

          const icon = document.createElement("img");
          icon.src = textures[i];
          //console.log(icon.src);
          icon.style.width = "50px";
          icon.style.height = "50px";
          icon.style.margin = "0";
          icon.style.cursor = "pointer";

          const nameTexEl = document.createElement("p");
          nameTexEl.style.margin = "0";
          nameTexEl.style.fontSize = "10px";

          const nameTexture = textures[i].slice(9, -4);
          nameTexEl.innerHTML = nameTexture;
          textureContainer.appendChild(icon);
          textureContainer.appendChild(nameTexEl);

          const currentTileWidth = textures[i].slice(-11).slice(1, -8);
          const currentTileHeight = textures[i].slice(-11).slice(4, -5);

          icon.addEventListener("click", () => {
            if (selectedMesh.material) {
              selectedMesh.material.albedoTexture = textureObject;
              selectedMesh.material.albedoTexture.uScale =
                currentTileWidth == 30 ? 10 : 5;
              selectedMesh.material.albedoTexture.vScale =
                currentTileHeight == 30 ? 10 : 5;
            }
            popup.style.display = "none";
          });
          popup.appendChild(textureContainer);
        })(textures[i]);
      }

      let selectedMesh;
      scene.onPointerDown = (evt, pickResult) => {
        if (pickResult.hit) {
          selectedMesh = pickResult.pickedMesh;
          popup.style.display = "flex";
          popup.style.flexWrap = "wrap";
          popup.style.left = evt.clientX + "px";
          popup.style.top = evt.clientY + "px";
        } else popup.style.display = "none";
      };
    }
  );

  scene.registerBeforeRender(() => {
    pointLight.position = camera.position;
  });
  return scene;
};

window.initFunction = async () => {
  var asyncEngineCreation = async () => {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.error("Error!", e);
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "Engine should not be null.";

  startRenderLoop(engine, canvas);
  window.scene = createScene();
};

initFunction().then(() => {
  sceneToRender = scene;
});
