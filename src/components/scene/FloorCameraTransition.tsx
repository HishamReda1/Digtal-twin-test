import React, { useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/three';
import { CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import { useBuildingStore } from '../../store/buildingStore';
import { FloorId, BUILDINGS_CONFIG } from '../../types/building';

interface Props {
  controlsRef: React.RefObject<CameraControls | null>;
}

// Target camera positions and focal points for each floor
const FLOOR_CAMERA_TARGETS: Record<
  FloorId,
  { pos: [number, number, number]; look: [number, number, number] }
> = {
  B1: {
    pos: [18, 5.0, 42],
    look: [0, -2.0, 0]
  },
  GF: {
    pos: [18, 9.0, 42],
    look: [0, 1.5, 0]
  },
  '1F': {
    pos: [20, 14.0, 44],
    look: [0, 4.8, 0]
  },
  '2F': {
    pos: [22, 18.0, 45],
    look: [0, 7.8, 0]
  },
  '3F': {
    pos: [24, 22.0, 46],
    look: [0, 10.8, -1]
  },
  RF: {
    pos: [26, 26.0, 48],
    look: [0, 13.5, -2]
  },
  UR: {
    pos: [28, 30.0, 50],
    look: [0, 16.5, -2]
  }
};

const DEFAULT_OVERVIEW: {
  pos: [number, number, number];
  look: [number, number, number];
} = {
  pos: [12, 75, 120],
  look: [0, 6, -2]
};

export const FloorCameraTransition: React.FC<Props> = ({ controlsRef }) => {
  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);
  const isInitialMount = useRef(true);

  const [, api] = useSpring(() => ({
    pos: DEFAULT_OVERVIEW.pos,
    look: DEFAULT_OVERVIEW.look,
    config: {
      mass: 1.2,
      tension: 110,
      friction: 24,
      precision: 0.001
    },
    onChange: (result) => {
      if (controlsRef.current && result.value) {
        const val = result.value as {
          pos: [number, number, number];
          look: [number, number, number];
        };
        if (val.pos && val.look) {
          controlsRef.current.setLookAt(
            val.pos[0],
            val.pos[1],
            val.pos[2],
            val.look[0],
            val.look[1],
            val.look[2],
            false
          );
        }
      }
    }
  }));

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!controlsRef.current) return;

    const currentPos = new THREE.Vector3();
    const currentTarget = new THREE.Vector3();
    controlsRef.current.getPosition(currentPos);
    controlsRef.current.getTarget(currentTarget);

    let target = DEFAULT_OVERVIEW;

    if (activeBuilding && BUILDINGS_CONFIG[activeBuilding]) {
      const b = BUILDINGS_CONFIG[activeBuilding];
      if (activeFloor) {
        const floorIdxMap: Record<string, number> = {
          B1: -1.0,
          GF: 0.5,
          '1F': 3.5,
          '2F': 6.5,
          '3F': 9.5,
          RF: 12.5,
          UR: 14.5
        };
        const flY = b.position[1] + (floorIdxMap[activeFloor] ?? 3);
        target = {
          pos: [b.position[0] + 13, flY + 6, b.position[2] + 21],
          look: [b.position[0], flY + 1.2, b.position[2]]
        };
      } else {
        target = {
          pos: [b.position[0] + 16, b.position[1] + 18, b.position[2] + 28],
          look: [b.position[0], b.position[1] + 6, b.position[2]]
        };
      }
    } else if (activeFloor && FLOOR_CAMERA_TARGETS[activeFloor]) {
      target = FLOOR_CAMERA_TARGETS[activeFloor];
    }

    api.start({
      from: {
        pos: [currentPos.x, currentPos.y, currentPos.z],
        look: [currentTarget.x, currentTarget.y, currentTarget.z]
      },
      to: {
        pos: target.pos,
        look: target.look
      },
      config: {
        mass: 1.2,
        tension: 110,
        friction: 24,
        precision: 0.001
      }
    });
  }, [activeFloor, activeBuilding, api, controlsRef]);

  return null;
};
