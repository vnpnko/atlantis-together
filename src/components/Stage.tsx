import React, { useEffect, useRef } from "react";
import { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { useSearchParams } from "react-router-dom";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { LumaSplatsThree } from "@lumaai/luma-web";
import locationsData from "../assets/data/locations.json";

import { GlobeLocation } from "../models/globe/GlobeLocation";

const locations: GlobeLocation[] = locationsData.map(
  (location: GlobeLocation) => location,
);

interface StageProps {
  isMobile?: boolean;
}

const Stage: React.FC<StageProps> = ({ isMobile = false }) => {
  const [searchParams] = useSearchParams();
  const selectedSceneName = searchParams.get("scene");

  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedScene = selectedSceneName
      ? locations.find((loc) => loc.label === selectedSceneName)
      : null;

    // --- Create Renderer ---
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    const rendererDom = renderer.domElement;

    // Set renderer styles
    rendererDom.style.position = isMobile ? "relative" : "fixed";
    rendererDom.style.zIndex = "0";
    rendererDom.style.width = "100%";
    rendererDom.style.height = isMobile ? "70vh" : "100%";
    rendererDom.style.top = "0";
    rendererDom.style.left = "0";

    // --- Append Renderer ---
    const stageEl = stageRef.current;
    if (!stageEl) return;
    stageEl.appendChild(rendererDom);

    // --- Create Camera ---
    const camera = new PerspectiveCamera(
      75,
      stageEl.clientWidth / stageEl.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 2;

    // --- Create Controls ---
    const controls = new OrbitControls(camera, rendererDom);
    controls.enableDamping = true;

    // --- Create Scene ---
    const scene = new Scene();

    // --- Fetch Location Data and Add Splats ---
    if (selectedScene) {
      const splat = new LumaSplatsThree({
        source: selectedScene.source,
      });
      scene.add(splat);
    } else {
      alert("Scene not found");
    }

    // --- Animation Loop ---
    let lastFrameTime = 0;
    const maxFPS = 20; // Limit to 20 frames per second

    const frameLoop = (time: number) => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      // Resize renderer if container size changes
      if (canvas.width !== width || canvas.height !== height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }

      controls.update();

      if (time - lastFrameTime >= 1000 / maxFPS) {
        renderer.render(scene, camera);
        lastFrameTime = time;
      }
      requestAnimationFrame(frameLoop);
    };

    requestAnimationFrame(frameLoop);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", () => {});
      if (stageEl.contains(rendererDom)) {
        stageEl.removeChild(rendererDom);
      }
      renderer.dispose();
    };
  }, [selectedSceneName, isMobile]);

  return <div id="Stage" ref={stageRef} />;
};

export default Stage;
