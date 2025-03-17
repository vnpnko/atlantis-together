import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import Globe, { GlobeMethods } from "react-globe.gl";
import locationsData from "../assets/data/locations.json";
import arcsData from "../assets/data/arcs.json";

interface GlobeLocation {
  lat: number;
  lng: number;
  label: string;
  url: string;
  source: string;
}

interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

const arcs: GlobeArc[] = arcsData.map((arc) => ({
  startLat: arc.startLat,
  startLng: arc.startLng,
  endLat: arc.endLat,
  endLng: arc.endLng,
}));

const locations: GlobeLocation[] = locationsData.map((location) => ({
  lat: location.lat,
  lng: location.lng,
  label: location.label,
  url: location.url,
  source: location.source,
}));

interface MyGlobeProps {
  width?: number;
  height?: number;
  bgColor?: boolean;
}

const MyGlobe: React.FC<MyGlobeProps> = ({ width, height, bgColor }) => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [containerWidth, setContainerWidth] = useState<number>(width ?? 0);
  const [containerHeight, setContainerHeight] = useState<number>(height ?? 0);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    globe.controls().minDistance = 120;
    globe.controls().maxDistance = 300;

    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;
    new THREE.TextureLoader().load("/clouds.png", (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75,
        ),
        new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
        }),
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });

    const updateDimensions = () => {
      if (containerRef.current) {
        if (!width) {
          setContainerWidth(containerRef.current.clientWidth);
        }
        if (!height) {
          setContainerHeight(containerRef.current.clientHeight);
        }
      }
    };

    updateDimensions();
  }, [width, height]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Globe
        ref={globeRef}
        globeImageUrl="/earth-surface.png"
        backgroundImageUrl={bgColor ? undefined : "/night-sky.png"}
        backgroundColor={bgColor ? "black" : undefined}
        bumpImageUrl="/earth-topology.png"
        width={containerWidth}
        height={containerHeight}
        labelsData={locations}
        htmlElementsData={locations}
        arcsData={arcs}
        arcColor={() => "#fde047"}
        arcStroke={1}
        arcAltitude={0}
        animateIn={false}
        htmlElement={(d: object) => {
          const el = document.createElement("div");
          el.innerHTML = `
          <div style="position: relative; align-content: center; justify-content: center; display: flex; flex-direction: column; align-items: center;">
            <img src="/geotag.png" alt="Geotag" style="height: 40px;" />
            <p style="
              font-size: 20px;
              color: #fde047;
              font-weight: bold;
              text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
            ">${(d as GlobeLocation).label}</p>
          </div>`;
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
