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
  pointLight.intensity = 45;

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    1.3,
    0,
    1.5,
    BABYLON.Vector3(0.3, 1.8, -2.5),
    scene
  );
  camera.attachControl(canvas, true);

  const textures = [
    {
      name: "Tile 1 (30x30)",
      url: "textures/tile1(30x30).jpg",
      width: "30",
      height: "30",
    },
    {
      name: "Tile 2 (30x30)",
      url: "textures/tile2(30x30).jpg",
      width: "30",
      height: "30",
    },
    {
      name: "Tile 3 (60x30)",
      url: "textures/tile3(60x30).jpg",
      width: "60",
      height: "30",
    },
    {
      name: "Tile 4-1 (30x60)",
      url: "textures/tile4_1(30x60).jpg",
      width: "30",
      height: "60",
    },
    {
      name: "Tile 4-2 (30x30)",
      url: "textures/tile4_2(30x30).jpg",
      width: "30",
      height: "30",
    },
    {
      name: "Tile 5-1 (30x30)",
      url: "textures/tile5_1(30x30).jpg",
      width: "30",
      height: "30",
    },
    {
      name: "Tile 5-2 (30x60)",
      url: "textures/tile5_2(30x60).jpg",
      width: "30",
      height: "60",
    },
    {
      name: "Tile 6 (30x30)",
      url: "textures/tile6(30x30).jpg",
      width: "30",
      height: "30",
    },
    {
      name: "Tile 7-1 (60x60)",
      url: "textures/tile7_1(60x60).jpg",
      width: "60",
      height: "60",
    },
    {
      name: "Tile 7-2 (30x30)",
      url: "textures/tile7_2(30x30).jpg",
      width: "30",
      height: "30",
    },
    {
      name: "Tile 8 (60x60)",
      url: "textures/tile8(60x60).jpg",
      width: "60",
      height: "60",
    },
    {
      name: "Tile 9 (fill)",
      url: "textures/Water_Sp.jpg",
      width: "_",
      height: "_",
    },
    {
      name: "Tile 10 (fill)",
      url: "textures/Asphal01.jpg",
      width: "_",
      height: "_",
    },
    {
      name: "Tile 11 (fill)",
      url: "textures/Grass_01.jpg",
      width: "_",
      height: "_",
    },
  ];

  // joints
  const joints = [
    { color: "Dark Joints", url: "textures/dark.png", size: "30" },
    { color: "Light Joints", url: "textures/light.png", size: "30" },
    // { color: "Cat :)", url: "textures/Cat-PNG-2.png", size: "30" },
  ];

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
      popup.style.width = "220px";
      popup.style.height = "200px";
      popup.style.background = "#fff";
      popup.style.overflow = "scroll";
      popup.style.display = "none";
      document.body.appendChild(popup);

      for (let i = 0; i < textures.length; i++) {
        (() => {
          const textureObject = new BABYLON.Texture(textures[i].url, scene);

          const textureContainer = document.createElement("div");
          textureContainer.style.margin = "5px";
          textureContainer.style.padding = "0px";

          const icon = document.createElement("img");
          icon.src = textures[i].url;
          icon.style.width = "50px";
          icon.style.height = "50px";
          icon.style.margin = "0px";
          icon.style.cursor = "pointer";

          const textureText = document.createElement("p");
          textureText.style.margin = "0px";
          textureText.style.fontSize = "10px";

          const textureName = textures[i].name;
          textureText.innerHTML = textureName;
          textureContainer.appendChild(icon);
          textureContainer.appendChild(textureText);

          const currentTileWidth = textures[i].width;
          const currentTileHeight = textures[i].height;

          const scaleFactor = 10;
          const standartTileWidth = 30;
          const standartTileHeight = 30;

          icon.addEventListener("click", () => {
            if (selectedMesh.material) {
              selectedMesh.material.albedoTexture = textureObject;
              selectedMesh.material.albedoTexture.uScale =
                currentTileWidth == standartTileWidth
                  ? scaleFactor
                  : (standartTileWidth / currentTileWidth) * scaleFactor;
              selectedMesh.material.albedoTexture.vScale =
                currentTileHeight == standartTileHeight
                  ? scaleFactor
                  : (standartTileHeight / currentTileHeight) * scaleFactor;
            }
            popup.style.display = "none";
          });
          popup.appendChild(textureContainer);

          for (let j = 0; j < joints.length; j++) {
            (() => {
              const jointObject = new BABYLON.Texture(joints[j].url, scene);
              const decalMaterial = new BABYLON.StandardMaterial(
                "decal",
                scene
              );

              decalMaterial.specularColor = new BABYLON.Color3(0, 0, 0); //simulating matte texture
              decalMaterial.alpha = 1;
              decalMaterial.transparencyMode =
                BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
              decalMaterial.backFaceCulling = false;
              decalMaterial.diffuseTexture = jointObject;
              decalMaterial.diffuseTexture.hasAlpha = true;
              decalMaterial.useAlphaFromDiffuseTexture = true;

              // scale factor
              decalMaterial.diffuseTexture.uScale = 10;
              decalMaterial.diffuseTexture.vScale = 10;

              const jointContainer = document.createElement("div");
              jointContainer.style.margin = "5px";
              jointContainer.style.padding = "0px";

              const jointIcon = document.createElement("img");
              jointIcon.src = joints[j].url;
              jointIcon.style.width = "50px";
              jointIcon.style.height = "50px";
              jointIcon.style.margin = "0px";
              jointIcon.style.cursor = "pointer";

              const jointText = document.createElement("p");
              jointText.style.margin = "0px";
              jointText.style.fontSize = "10px";

              const jointName = joints[j].color;
              jointText.innerHTML = jointName;
              jointContainer.appendChild(jointIcon);
              jointContainer.appendChild(jointText);

              const currentJointSize = joints[j].size;

              const standartJointSize = 30;

              jointIcon.addEventListener("click", () => {
                if (selectedMesh) {
                  const clonedMesh = selectedMesh.clone("clonedJointMesh");
                  // clonedMesh.position = new BABYLON.Vector3(0, 0, 0);
                  // clonedMesh.rotation = new BABYLON.Vector3(0, 0, 0);
                  // clonedMesh.scaling = new BABYLON.Vector3(1, 1, 1);

                  clonedMesh.material = decalMaterial;

                  clonedMesh.material.uScale =
                    currentJointSize == standartJointSize
                      ? scaleFactor
                      : (standartJointSize / currentJointSize) * scaleFactor;
                  clonedMesh.material.vScale =
                    currentJointSize == standartJointSize
                      ? scaleFactor
                      : (standartJointSize / currentJointSize) * scaleFactor;
                }
                popup.style.display = "none";
              });
              popup.appendChild(jointContainer);
            })(joints[j]);
          } //---joints end
        })(textures[i]);
      }

      //popup modal
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
