import React from "react";
import { Engine, Scene } from "react-babylonjs";
import {
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  PointLight,
  SceneLoader,
  Texture,
} from "@babylonjs/core";
import "@babylonjs/loaders";

const onSceneMount = (e) => {
  const { canvas, scene } = e;

  // const hemisphericLight = new HemisphericLight(
  //   "light1",
  //   new Vector3(-50, 100, -200),
  //   scene
  // );
  // hemisphericLight.intensity = 0.9;

  const pointLight = new PointLight(
    "pointLight1",
    new Vector3(1, 10, 1),
    scene
  );
  pointLight.intensity = 30;

  const camera = new ArcRotateCamera(
    "camera1",
    1.3,
    1.3,
    1.5,
    new Vector3(0.3, 1.8, -2.5),
    scene
  );

  camera.speed = 0.001;
  camera.minZ = 0.001;
  scene.activeCameras.push(camera);
  camera.attachControl(canvas, true);

  const loader = SceneLoader.ImportMeshAsync(
    "",
    "https://raw.githubusercontent.com/estiva1/glb-models/master/",
    "babylonBathroom.glb",
    scene,
    () => {
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

      // const textures = [
      //   {
      //     name: "Tile 1",
      //     url: "https://raw.githubusercontent.com/estiva1/glb-models/main/tile1(30x30).jpg",
      //     tileWidth: 30,
      //     tileHeight: 30,
      //   },
      //   {
      //     name: "Tile 2",
      //     url: "https://raw.githubusercontent.com/estiva1/glb-models/main/tile2(30x30).jpg",
      //     tileWidth: 30,
      //     tileHeight: 30,
      //   },
      // ];

      const textures = [
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile1(30x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile2(30x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile4(60x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile4_1(30x60).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile4_2(30x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile5(30x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile5_1(30x60).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile6(30x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile6_1(60x60).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile7(30x30).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile9(60x60).jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/Water_Sp.jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/Asphal01.jpg",
        "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/Grass_01.jpg",
      ];

      for (let i = 0; i < textures.length; i++) {
        ((texture) => {
          const textureObject = new Texture(texture, scene);
          const textureContainer = document.createElement("div");
          textureContainer.style.margin = "5px";
          textureContainer.style.padding = "0";

          const icon = document.createElement("img");
          icon.src = textureObject.url;

          icon.style.width = "50px";
          icon.style.height = "50px";
          icon.style.margin = "0";
          icon.style.cursor = "pointer";

          const tileName = document.createElement("p");
          tileName.style.margin = "0";
          tileName.style.fontSize = "10px";

          tileName.innerHTML = "Tile " + i + 1;
          textureContainer.appendChild(icon);
          textureContainer.appendChild(tileName);

          const currentTileWidth = textures[i].slice(-11).slice(1, -8);
          const currentTileHeight = textures[i].slice(-11).slice(4, -5);

          icon.addEventListener("click", () => {
            if (selectedMesh.material) {
              selectedMesh.material.albedoTexture = textureObject;
              selectedMesh.material.albedoTexture.uScale =
                currentTileWidth === 30 ? 10 : 5;
              selectedMesh.material.albedoTexture.vScale =
                currentTileHeight === 30 ? 10 : 5;
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

  scene.getEngine().runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  });
};

const SceneComponent = () => {
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
};

export default SceneComponent;
