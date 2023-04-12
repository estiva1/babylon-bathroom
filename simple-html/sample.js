// import { createFormAddTile } from "./createFormAddTile.js";

var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  //Adding a light
  var lightP = new BABYLON.PointLight(
    "Omni",
    new BABYLON.Vector3(-50, 100, -200),
    scene
  );

  lightP.intensity = 40;

  //Adding an Arc Rotate Camera
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    2,
    BABYLON.Vector3(0, 0.3, -0.7),
    scene
  );

  camera.attachControl(canvas, false);

  // The first parameter can be used to specify which mesh to import. Here we import all meshes
  BABYLON.SceneLoader.ImportMesh(
    null,
    "",
    "babylonBathroom.glb",
    scene,
    function () {
      camera.radius = 0.3;
      camera.target = new BABYLON.Vector3(0, 1.5, -2.5);
      camera.alpha = -3.6437; //-Math.PI/2;
      camera.beta = 1.9197; //0.01;

      engine.hideLoadingUI();

      // Create a popup with texture icons
      var popup = document.createElement("div");
      popup.style.position = "absolute";
      popup.style.top = "50px";
      popup.style.left = "50px";
      popup.style.width = "200px";
      popup.style.border = "1px solid #ccc";
      popup.style.background = "#fff";
      popup.style.display = "none";
      document.body.appendChild(popup);

      var textures = [
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

      for (var i = 0; i < textures.length; i++) {
        (function (texture) {
          var textureObject = new BABYLON.Texture(texture, scene);
          var textureContainer = document.createElement("div");
          textureContainer.style.margin = "5px";
          textureContainer.style.padding = "0";
          var icon = document.createElement("img");
          icon.src = textureObject.url;
          //console.log(icon.src);
          icon.style.width = "50px";
          icon.style.height = "50px";
          icon.style.margin = "0";
          var nameTexEl = document.createElement("p");
          nameTexEl.style.margin = "0";
          nameTexEl.style.fontSize = "10px";
          var nameTexture = textures[i].slice(9, -4);
          nameTexEl.innerHTML = nameTexture;
          textureContainer.appendChild(icon);
          textureContainer.appendChild(nameTexEl);

          var currentTileWidth = textures[i].slice(-11).slice(1, -8);
          var currentTileHeight = textures[i].slice(-11).slice(4, -5);

          icon.addEventListener("click", function () {
            if (selectedMesh.material) {
              selectedMesh.material.albedoTexture = textureObject;
              selectedMesh.material.albedoTexture.uScale =
                currentTileWidth == 30 ? 10 : 5;
              selectedMesh.material.albedoTexture.vScale =
                currentTileHeight == 30 ? 10 : 5;
              var wallMesh = scene.getMeshByName("Wall_Full_3x6");

              var trimmingMesh = scene.getMeshByName("Trimming");
              if (wallMesh.material.albedoTexture.name.includes("tile")) {
                trimmingMesh.visibility = 0;
              } else {
                trimmingMesh.visibility = 1;
              }
            }
            popup.style.display = "none";
          });
          popup.appendChild(textureContainer);
        })(textures[i]);
      }
      // Set the material of the selected mesh to a new texture
      var selectedMesh;
      scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit) {
          selectedMesh = pickResult.pickedMesh;
          // console.log(selectedMesh);
          console.log("selectedMeshName ==== ", selectedMesh.name);
          console.log(
            "selectedMeshMaterialName ==== ",
            selectedMesh.material.name
          );

          if (!selectedMesh.material) {
            selectedMesh.material = new BABYLON.StandardMaterial(
              "material",
              scene
            );
          }
          // popup.style.display = "block";
          popup.style.display = "flex";
          popup.style.flexWrap = "wrap";
          // flex-wrap: wrap;
          popup.style.left = evt.clientX + "px";
          popup.style.top = evt.clientY + "px";
        } else {
          popup.style.display = "none";
        }
      };
    },
    function (evt) {
      // alert("ali");
      // onProgress
      var loadedPercent = 0;
      if (evt.lengthComputable) {
        loadedPercent = ((evt.loaded * 100) / evt.total).toFixed();
      } else {
        var dlCount = evt.loaded / (1024 * 1024);
        loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
      }
      // assuming "loadingScreenPercent" is an existing html element
      document.getElementById("div0").innerHTML = loadedPercent + "%";
      // console.log("scene is now loaded: %"+loadedPercent);
    }
  );

  // Move the light with the camera
  scene.registerBeforeRender(function () {
    //scene.debugLayer.show();

    lightP.position = camera.position;
  });

  return scene;
};
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
