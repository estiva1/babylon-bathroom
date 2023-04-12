import React from "react";
import { Engine, Scene } from "react-babylonjs";
import {
  Vector3,
  ArcRotateCamera,
  PointLight,
  SceneLoader,
  Texture,
} from "@babylonjs/core";
import "@babylonjs/loaders";

const onSceneMount = (e) => {
  const { canvas, scene } = e;

  const pointLight = new PointLight(
    "pointLight1",
    new Vector3(1, 10, 1),
    scene
  );
  pointLight.intensity = 40;

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
      popup.style.width = "220px";
      popup.style.height = "200px";
      popup.style.background = "#fff";
      popup.style.overflow = "scroll";
      popup.style.display = "none";
      document.body.appendChild(popup);

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
          url: "textures/tile4(60x30).jpg",
          width: "60",
          height: "30",
        },
        {
          name: "Tile 4 (30x60)",
          url: "textures/tile4_1(30x60).jpg",
          width: "30",
          height: "60",
        },
        {
          name: "Tile 5 (30x30)",
          url: "textures/tile4_2(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 6 (30x30)",
          url: "textures/tile5(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 7 (30x60)",
          url: "textures/tile5_1(30x60).jpg",
          width: "30",
          height: "60",
        },
        {
          name: "Tile 8 (30x30)",
          url: "textures/tile6(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 9 (60x60)",
          url: "textures/tile6_1(60x60).jpg",
          width: "60",
          height: "60",
        },
        {
          name: "Tile 10 (30x30)",
          url: "textures/tile7(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 11 (60x60)",
          url: "textures/tile9(60x60).jpg",
          width: "60",
          height: "60",
        },
        {
          name: "Tile 12 (fill)",
          url: "textures/Water_Sp.jpg",
          width: "_",
          height: "_",
        },
        {
          name: "Tile 13 (fill)",
          url: "textures/Asphal01.jpg",
          width: "_",
          height: "_",
        },
        {
          name: "Tile 14 (fill)",
          url: "textures/Grass_01.jpg",
          width: "_",
          height: "_",
        },
      ];

      for (let i = 0; i < textures.length; i++) {
        ((texture) => {
          const textureObject = new Texture(texture.url, scene);
          const textureContainer = document.createElement("div");
          textureContainer.style.margin = "5px";
          textureContainer.style.padding = "0";

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
