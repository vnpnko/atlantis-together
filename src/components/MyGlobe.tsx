import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as THREE from "three";
import Globe, { GlobeMethods } from "react-globe.gl";
import locationsData from "../assets/data/locations.json";
import arcsData from "../assets/data/arcs.json";
import { GlobeLocation } from "../models/globe/GlobeLocation";
import { GlobeArc } from "../models/globe/GlobeArc";

interface MyGlobeProps {
  width: number;
  height: number;
  bgColor: boolean;
  hoveredEpisode: string | null;
  setHoveredEpisode: (episode: string | null) => void;
}

const MyGlobe: React.FC<MyGlobeProps> = ({
  width,
  height,
  bgColor,
  hoveredEpisode,
  setHoveredEpisode,
}) => {
  const locations = locationsData as GlobeLocation[];
  const arcs = arcsData as GlobeArc[];

  const navigate = useNavigate();
  const { search } = useLocation();
  const currentScene = new URLSearchParams(search).get("scene");

  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    globe.controls().minDistance = 101;
    globe.controls().maxDistance = 299;

    const CLOUDS_ROTATION_SPEED = -0.006;
    let animationFrameId = 0;

    new THREE.TextureLoader().load("/clouds.png", (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * 1.01),
        new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
          opacity: 0.4,
        }),
      );
      globe.scene().add(clouds);

      function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        animationFrameId = requestAnimationFrame(rotateClouds);
      }

      rotateClouds();
    });

    cancelAnimationFrame(animationFrameId);
  }, []);

  const cloudlessTile = (x: number, y: number, z: number) =>
    `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/${z}/${y}/${x}.jpg`;

  const zoomCamera = (scale: number) => {
    const controls = globeRef.current?.controls();
    if (!controls) return;

    const cam = controls.object as THREE.PerspectiveCamera;
    const target = controls.target;

    const dir = cam.position.clone().sub(target);
    const newLength = THREE.MathUtils.clamp(
      dir.length() * scale,
      controls.minDistance,
      controls.maxDistance,
    );

    dir.setLength(newLength);
    cam.position.copy(target.clone().add(dir));
    controls.update();
  };

  const labelWheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    const scale = 1 + Math.abs(e.deltaY) / 5000;
    zoomCamera(e.deltaY < 0 ? 1 / scale : scale);
    e.stopPropagation();
  };

  return (
    <div ref={containerRef}>
      <Globe
        showAtmosphere={false}
        ref={globeRef}
        globeImageUrl="/earth-surface.png"
        backgroundImageUrl={bgColor ? undefined : "/night-sky.png"}
        backgroundColor={bgColor ? "black" : undefined}
        bumpImageUrl="/earth-topology.png"
        width={width}
        height={height}
        globeTileEngineUrl={cloudlessTile}
        labelsData={locations}
        htmlElementsData={locations}
        arcsData={arcs}
        arcColor={() => "#fde047"}
        arcStroke={0.3}
        arcAltitude={(arc: object) =>
          (arc as GlobeArc).travelMode === "plane" ? 0.2 : 0.2
        }
        arcDashLength={0.3}
        arcDashGap={0.05}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={12000}
        animateIn={false}
        htmlElement={(d) => {
          const loc = d as GlobeLocation;
          const isHighlighted =
            hoveredEpisode === loc.label || currentScene === loc.label;

          const wrapper = document.createElement("div");

          wrapper.style.pointerEvents = "auto";
          wrapper.style.cursor = "pointer";
          wrapper.style.touchAction = "none";

          wrapper.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center">
              <img src="/geotag.png" alt="Geotag" style="height:40px" />
              <p style="
                margin:0;
                font-size:20px;
                font-weight:bold;
                color:${isHighlighted ? "#eab308" : "#fde047"};
                text-shadow:-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black;
              ">
                ${loc.label}
              </p>
            </div>
          `;

          const textEl = wrapper.querySelector("p")!;

          wrapper.onmouseover = () => {
            textEl.style.color = "#eab308";
            setHoveredEpisode(loc.label);
          };
          wrapper.onmouseout = () => {
            textEl.style.color = isHighlighted ? "#eab308" : "#fde047";
            setHoveredEpisode(null);
          };
          wrapper.onclick = () => navigate(`/?scene=${loc.label}`);

          wrapper.addEventListener("wheel", labelWheelHandler, {
            passive: false,
          });

          return wrapper;
        }}
      />
    </div>
  );
};

export default MyGlobe;
