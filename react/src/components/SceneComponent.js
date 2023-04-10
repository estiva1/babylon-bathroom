import React from "react";
import { Engine, Scene } from "react-babylonjs";
import {
  Vector3,
  Color3,
  ActionManager,
  SetValueAction,
} from "@babylonjs/core";
import ScaledModelWithProgress from "./ScaledModelWithProgress";

const WithModel = (props) => {
  const onModelLoaded = (model) => {
    let mesh = model.meshes[1];
    console.log("loaded mesh:", mesh);
    mesh.actionManager = new ActionManager(mesh._scene);
    mesh.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPointerOverTrigger,
        mesh.material,
        "wireframe",
        true
      )
    );
    mesh.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPointerOutTrigger,
        mesh.material,
        "wireframe",
        false
      )
    );
  };

  let baseUrl = "https://raw.githubusercontent.com/estiva1/glb-models/master/";

  return (
    <div>
      <div>
        <div>
          <Engine
            antialias={true}
            adaptToDeviceRatio={true}
            canvasId="sample-canvas"
          >
            <Scene>
              <arcRotateCamera
                name="camera"
                alpha={1.3}
                beta={1.4}
                radius={2.3}
                target={new Vector3(.3, 1.8, -2.5)}
                minZ={0.001}
              />
              <hemisphericLight
                name="omni"
                intensity={0.9}
                direction={new Vector3(-30, -10, 10)}
              />

              <ScaledModelWithProgress
                rootUrl={`${baseUrl}`}
                sceneFilename="babylonBathroom.glb"
                scaleTo={8}
                progressBarColor={Color3.FromInts(255, 165, 0)}
                center={new Vector3(0, -.6, 0)}
                onModelLoaded={onModelLoaded}
              />
            </Scene>
          </Engine>
        </div>
      </div>
    </div>
  );
};

export default WithModel;
