import React from "react";
import { Engine, Scene, StandardMaterial, Texture } from "react-babylonjs";
import {
  Color3,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  SceneLoader,
  TextureBlock,
  TexturePacker,
} from "@babylonjs/core";
import "@babylonjs/loaders";


const onSceneMount = (e) => {
  const { canvas, scene } = e;

  scene.clearColor = new Color3(0.9, 0.5, 0.5);

  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.9;

  var camera = new ArcRotateCamera(
    "camera1",
    1.3,
    1.3,
    2.3,
    new Vector3(0.3, 1.8, -2.5),
    scene
  );

  camera.speed = 0.001;
  camera.minZ = 0.001;
  scene.activeCameras.push(camera);
  camera.attachControl(canvas, true);

  let loader = SceneLoader.ImportMeshAsync(
    "",
    "https://raw.githubusercontent.com/estiva1/glb-models/master/",
    "babylonBathroom.glb",
    scene,
    function (meshes, particleSystems, skeletons) {
      var popup = document.createElement("div");
      popup.style.position = "absolute";
      popup.style.top = "100px";
      popup.style.left = "50px";
      popup.style.width = "200px";
      popup.style.border = "1px solid #ccc";
      popup.style.background = "#000";
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
          
          var textureObject = new TextureBlock(texture, scene);
          var textureContainer = document.createElement("div");
          //console.log(textureObject._name);
          textureContainer.style.margin = "5px";
          textureContainer.style.padding = "0";
          var icon = document.createElement("img");
          icon.src = textureObject.name;

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
                currentTileWidth === 30 ? 10 : 5;
              selectedMesh.material.albedoTexture.vScale =
                currentTileHeight === 30 ? 10 : 5;
                
              var wallMesh = scene.getMeshByName("Wall_Full_3x6");
              console.log(wallMesh);

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

      //---working well
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
            selectedMesh.material = new StandardMaterial("material", scene);
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
    } //---selectedMesh
  );

  console.log("loader", loader);

  scene.getEngine().runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  });
};

function SceneComponent() {
  return (
    <div>
      <Engine
        antialias={true}
        adaptToDeviceRatio={true}
        canvasId="sample-canvas"
      >
        <Scene onSceneMount={onSceneMount} />
      </Engine>
    </div>
  );
}

export default SceneComponent;
