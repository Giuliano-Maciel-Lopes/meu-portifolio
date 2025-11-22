import { useLoader } from "@react-three/fiber";
import { OBJLoader, MTLLoader } from "three-stdlib";


export function Venus3d() {
  const materials = useLoader(MTLLoader, "/models/jupiter.mtl");
  const obj = useLoader(OBJLoader, "/models/jupiter.obj", (loader) => {
    loader.setMaterials(materials);
  });

  obj.scale.set(1.5, 1.5, 1.5);

  return (
    <group position={[0, 0, -5]}>
      <primitive object={obj} />
    </group>
  );
}
