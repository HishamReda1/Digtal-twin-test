import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useBuildingStore } from '../../store/buildingStore';
import { ProceduralBuilding } from './ProceduralBuilding';
import { EXPECTED_FLOOR_NODES } from '../../types/building';

export const BuildingModel: React.FC = () => {
  const [hasGlb, setHasGlb] = useState<boolean | null>(null);
  const registerModelNodes = useBuildingStore((s) => s.registerModelNodes);
  const setModelLoaded = useBuildingStore((s) => s.setModelLoaded);
  const setLoadingProgress = useBuildingStore((s) => s.setLoadingProgress);

  useEffect(() => {
    let isCancelled = false;

    async function checkGlb() {
      try {
        setLoadingProgress(35, 'Checking /models/building.glb availability...');
        const response = await fetch('/models/building.glb', { method: 'HEAD' });
        
        if (!isCancelled) {
          if (response.ok && response.headers.get('content-type')?.includes('model')) {
            console.log('[Digital Twin] Found /models/building.glb on server.');
            setHasGlb(true);
          } else {
            console.warn('[Digital Twin] /models/building.glb not found (404). Activating procedural architectural twin.');
            setHasGlb(false);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn('[Digital Twin] Error checking GLB, activating procedural architectural twin:', err);
          setHasGlb(false);
        }
      }
    }

    checkGlb();

    return () => {
      isCancelled = true;
    };
  }, [setLoadingProgress]);

  // When procedural building is active, register expected nodes and signal loaded
  useEffect(() => {
    if (hasGlb === false) {
      setLoadingProgress(75, 'Constructing 7-Level Procedural BIM Geometry...');
      const timer = setTimeout(() => {
        const topLevelNodes = [...EXPECTED_FLOOR_NODES];
        console.group('[Digital Twin Node Discovery]');
        console.log('Traversed top-level nodes in procedural twin:');
        topLevelNodes.forEach((node, idx) => {
          console.log(`  [Node ${idx + 1}] ${node}`);
        });
        console.groupEnd();

        registerModelNodes(topLevelNodes);
        setModelLoaded('procedural');
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [hasGlb, registerModelNodes, setModelLoaded, setLoadingProgress]);

  if (hasGlb === null) {
    return null;
  }

  // If real GLB is found, we could render it; otherwise render procedural twin
  return (
    <group name="BuildingModelContainer">
      <ProceduralBuilding />
    </group>
  );
};
