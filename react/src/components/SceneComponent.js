import React from "react";
import { Engine, Scene } from "react-babylonjs";
import {
  Vector3,
  ArcRotateCamera,
  PointLight,
  SceneLoader,
  Texture,
  StandardMaterial,
  Color3,
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
    1.1,
    new Vector3(0.3, 1.8, -2.5),
    scene
  );

  camera.speed = 0.001;
  camera.minZ = 0.001;
  scene.activeCameras.push(camera);
  camera.attachControl(canvas, true);

  const loader = SceneLoader.ImportMeshAsync(
    "",
    "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/",
    "babylonBathroom.glb",
    scene,
    () => {
      const popup = document.createElement("div");
      popup.style.position = "absolute";
      popup.style.top = "50px";
      popup.style.left = "50px";
      popup.style.width = "230px";
      popup.style.height = "200px";
      popup.style.background = "#fff";
      popup.style.overflow = "scroll";
      popup.style.display = "none";
      document.body.appendChild(popup);

      const textures = [
        {
          name: "Tile 1 (30x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile1(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 2 (30x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile2(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 3 (60x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile3(60x30).jpg",
          width: "60",
          height: "30",
        },
        {
          name: "Tile 4-1 (30x60)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile4_1(30x60).jpg",
          width: "30",
          height: "60",
        },
        {
          name: "Tile 4-2 (30x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile4_2(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 5-1 (30x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile5_1(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 5-2 (60x60)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile5_2(30x60).jpg",
          width: "60",
          height: "60",
        },
        {
          name: "Tile 6 (30x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile6(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 7-1 (60x60)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile7_1(60x60).jpg",
          width: "60",
          height: "60",
        },
        {
          name: "Tile 7-2 (30x30)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile7_2(30x30).jpg",
          width: "30",
          height: "30",
        },
        {
          name: "Tile 8 (60x60)",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/tile8(60x60).jpg",
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
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/Asphal01.jpg",
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
        {
          color: "Dark Joints",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/dark.png",
          size: "30",
        },
        {
          color: "Light Joints",
          url: "https://raw.githubusercontent.com/estiva1/babylon-bathroom/main/glb-models/light.png",
          size: "30",
        },
      ];

      const scaleFactor = 10;
      const standartTileWidth = 30;
      const standartTileHeight = 30;

      for (let i = 0; i < textures.length; i++) {
        (() => {
          const textureObject = new Texture(textures[i].url, scene);

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
              const jointObject = new Texture(joints[j].url, scene);
              const decalMaterial = new StandardMaterial("decal", scene);

              decalMaterial.specularColor = new Color3(0, 0, 0); //simulating matte texture
              decalMaterial.alpha = 1;
              // decalMaterial.transparencyMode =
              //   BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
              decalMaterial.backFaceCulling = false; // if false, decals are not visible from the other side
              decalMaterial.diffuseTexture = jointObject;
              decalMaterial.diffuseTexture.hasAlpha = true;
              decalMaterial.useAlphaFromDiffuseTexture = true;

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

              const standartJointHorLength = standartTileWidth;
              const standartJointVerLength = standartTileHeight;

              const currentJointHorLength = currentTileWidth;
              const currentJointVerLength = currentTileHeight;

              jointIcon.addEventListener("click", () => {
                if (selectedMesh) {
                  var clonedMesh = selectedMesh.clone("clonedJointMesh");
                  // clonedMesh.position = new BABYLON.Vector3(0, 0, 0);
                  // clonedMesh.rotation = new BABYLON.Vector3(0, 0, 0);
                  // clonedMesh.scaling = new BABYLON.Vector3(1, 1, 1);

                  // checking if the selected texure is tile or solid color
                  if (
                    !isNaN(parseFloat(currentJointHorLength)) &&
                    isFinite(currentJointHorLength) &&
                    !isNaN(parseFloat(currentJointVerLength)) &&
                    isFinite(currentJointVerLength)
                  ) {
                    clonedMesh.material = decalMaterial;
                    decalMaterial.diffuseTexture.uScale =
                      currentJointHorLength == standartJointHorLength
                        ? scaleFactor
                        : (standartJointHorLength / currentJointHorLength) *
                          scaleFactor;
                    decalMaterial.diffuseTexture.vScale =
                      currentJointVerLength == standartJointVerLength
                        ? scaleFactor
                        : (standartJointVerLength / currentJointVerLength) *
                          scaleFactor;
                  }
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
