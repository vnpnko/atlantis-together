import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as THREE from "three";
import Globe, { GlobeMethods } from "react-globe.gl";

import locationsData from "../assets/data/locations.json";
import arcsData from "../assets/data/arcs.json";
import { GlobeLocation } from "../models/globe/GlobeLocation";
import { GlobeArc } from "../models/globe/GlobeArc";

import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

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

  function llToVec3(latDeg: number, lngDeg: number): THREE.Vector3 {
    const lat = THREE.MathUtils.degToRad(latDeg);
    const lng = THREE.MathUtils.degToRad(lngDeg);

    return new THREE.Vector3(
      Math.cos(lat) * Math.cos(lng),
      Math.sin(lat),
      Math.cos(lat) * Math.sin(lng),
    ).normalize();
  }

  function sampleGreatCircle(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
    steps = 64,
    radius = 100,
    altitude = 0.03,
  ): number[] {
    const v0 = llToVec3(startLat, startLng);
    const v1 = llToVec3(endLat, endLng);
    const w = Math.acos(THREE.MathUtils.clamp(v0.dot(v1), -1, 1));

    const positions: number[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const s0 = Math.sin(t * w);
      const s1 = Math.sin((1 - t) * w);

      const vec = new THREE.Vector3(
        v0.x * s0 + v1.x * s1,
        v0.y * s0 + v1.y * s1,
        v0.z * s0 + v1.z * s1,
      )
        .normalize()
        .multiplyScalar(radius + altitude);

      positions.push(vec.x, vec.y, -vec.z);
    }
    return positions;
  }

  useEffect(() => {
    const globe = globeRef.current;
    const container = containerRef.current;
    if (!globe || !container) return;

    const scene = globe.scene();

    arcs.forEach((arc) => {
      const positions = sampleGreatCircle(
        arc.startLat,
        arc.startLng - 90,
        arc.endLat,
        arc.endLng - 90,
      );

      const geometry = new LineGeometry();
      geometry.setPositions(positions);

      const material = new LineMaterial({
        linewidth: 3,
        color: "#facc15",
      });

      const line = new Line2(geometry, material);
      line.computeLineDistances();
      scene.add(line);
    });
  });

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.controls().minDistance = 101;
    globe.controls().maxDistance = 299;

    const CLOUDS_ROT_SPEED = -0.006;
    let animId = 0;

    new THREE.TextureLoader().load("/clouds.png", (tex) => {
      console.log("globe.getGlobeRadius():" + globe.getGlobeRadius());
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * 1.01),
        new THREE.MeshPhongMaterial({
          map: tex,
          transparent: true,
          opacity: 0.4,
        }),
      );
      globe.scene().add(clouds);

      const spin = () => {
        clouds.rotation.y += (CLOUDS_ROT_SPEED * Math.PI) / 180;
        animId = requestAnimationFrame(spin);
      };
      spin();
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  const zoomCamera = (scale: number) => {
    const controls = globeRef.current?.controls();
    if (!controls) return;

    const cam = controls.object as THREE.PerspectiveCamera;
    const target = controls.target;
    const dir = cam.position.clone().sub(target);

    dir.setLength(
      THREE.MathUtils.clamp(
        dir.length() * scale,
        controls.minDistance,
        controls.maxDistance,
      ),
    );
    cam.position.copy(target.clone().add(dir));
    controls.update();
  };

  const labelWheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    const s = 1 + Math.abs(e.deltaY) / 5000;
    zoomCamera(e.deltaY < 0 ? 1 / s : s);
    e.stopPropagation();
  };

  const cloudlessTile = (x: number, y: number, z: number) =>
    `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/${z}/${y}/${x}.jpg`;

  return (
    <div ref={containerRef}>
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        showAtmosphere={false}
        globeImageUrl="/earth-surface.png"
        backgroundImageUrl={bgColor ? undefined : "/night-sky.png"}
        backgroundColor={bgColor ? "black" : undefined}
        bumpImageUrl="/earth-topology.png"
        globeTileEngineUrl={cloudlessTile}
        labelsData={locations}
        htmlElementsData={locations}
        animateIn={false}
        htmlElement={(d) => {
          const loc = d as GlobeLocation;
          const highlighted =
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
                color:${highlighted ? "#eab308" : "#fde047"};
                text-shadow:-1px -1px 0 black,1px -1px 0 black,
                             -1px 1px 0 black,1px 1px 0 black;">
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
            textEl.style.color = highlighted ? "#eab308" : "#fde047";
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
