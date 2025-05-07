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

  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const cloudlessTile = (x: number, y: number, z: number) =>
    `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/${z}/${y}/${x}.jpg`;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentScene = searchParams.get("scene");

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    globe.controls().maxDistance = 300;

    const CLOUDS_ALT = 0.01;
    const CLOUDS_ROTATION_SPEED = -0.006;
    let animationFrameId = 0;

    new THREE.TextureLoader().load("/clouds.png", (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          50,
          50,
        ),
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

  return (
    <div ref={containerRef}>
      <Globe
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
          (arc as GlobeArc).travelMode === "plane" ? 0.1 : 0.01
        }
        arcDashLength={0.3}
        arcDashGap={0.05}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={12000}
        animateIn={false}
        htmlElement={(d: object) => {
          const el = document.createElement("div");
          const isHighlighted =
            hoveredEpisode === (d as GlobeLocation).label ||
            currentScene === (d as GlobeLocation).label;
          el.innerHTML = `
          <div style="align-content: center; justify-content: center; display: flex; flex-direction: column; align-items: center;">
            <img src="/geotag.png" alt="Geotag" style="height: 40px;" />
            <p style="
              font-size: 20px;
              color: ${isHighlighted ? "#eab308" : "#fde047"};
              font-weight: bold;
              text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
            ">${(d as GlobeLocation).label}</p>
          </div>`;
          const textElement = el.querySelector("p");
          el.onmouseover = () => {
            textElement!.style.color = "#eab308";
            setHoveredEpisode((d as GlobeLocation).label);
          };
          el.onmouseout = () => {
            textElement!.style.color = isHighlighted ? "#eab308" : "#fde047";
            setHoveredEpisode(null);
          };
          el.style.pointerEvents = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => navigate(`/?scene=${(d as GlobeLocation).label}`);
          return el;
        }}
      />
    </div>
  );
};

export default MyGlobe;
