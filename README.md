# [🌱 React Garden TypeScript Material UI App](https://github.com/marty-mcgee/react-garden)

React + TypeScript + ThreeJS app using Material UI v5 on NextJS v12, Apollo Client v3, GraphQL + WordPress REST APIs, for ThreeD web development.. a "Design Dashboard" for developing Three JS components + apps.

## Live Demo

[threedgarden.com](https://threedgarden.com/)

====

## For Developers

- requires pnpm: `npm install -G pnpm`

1. install: `pnpm i`
2. run: `pnpm dev`
3. build: `pnpm build`
4. deploy: `pnpm deploy`

====

## FUNCTIONAL NOUNS

- Noun | as root JS Object | interface INoun | wp threed_noun

---

- ThreeD | as root JS Object | interface IThreeD | wp threed_threed
- File | as JS Object | interface IFile | wp threed_file
- Project | as JS Object | interface IProject | wp threed_project
- Workspace | as JS Object | interface IWorkspace | wp threed_workspace
- Plan | as JS Object | interface IPlan | wp threed_plan
- Edit | Actions | Relationships | interface IEdit | wp threed_edit
- View | as JS Object | Settings | interface IView | wp threed_view

---

- Participant | as JS Object | interface IParticipant | wp threed_participant

- Simulation | as JS Object | interface ISimulation | wp threed_simulation
- Game | extends Simulation | interface IGame | wp threed_game
- Demo | extends Simulation | interface IGame | wp threed_demo

---

- World | as JS Object | interface IWorld | wp threed_world
- Character | as JS Object | interface ICharacter | wp threed_character
- Bear | extends Character | interface IBear | wp threed_bear
- Gardener | extends Character | interface IGardener | wp threed_gardener
- Chicken | extends Character | interface IChicken | wp threed_chicken
- Scene | extends THREE.Scene | interface IScene | wp threed_scene
- Structure | extends THREE.Object3D | interface IStructure | wp threed_structure
- Farm | extends THREE.Group | interface IFarm | wp threed_farm
- Garden | extends THREE.Group | interface IGarden | wp threed_garden
- Allotment | extends Structure | interface IAllotment | wp threed_allotment
- Bed | extends Structure | interface IBed | wp threed_bed
- Furniture | extends Structure | interface IFurniture | wp threed_furniture
- Equipment | extends Structure | interface IEquipment | wp threed_equipment
- Plant | extends Structure | interface IPlant | wp threed_plant
- Soil | extends Structure | interface ISoil | wp threed_soil
- SoilAddendum | extends Soil | interface ISoilAddendum | wp threed_soil_addendum
- SoilPlan | Actions | Relationships | interface ISoilPlan | wp threed_soil_plan
- PlantingPlan | Actions | Relationships | interface IPlantingPlan | wp threed_planting_plan
- BuildingPlan | Actions | Relationships | interface IBuildingPlan | wp threed_building_plan

---

- Tool | as JS Object | extends ThreeD? | interface ITool
- PlaneTool | extends Tool | interface IPlane
- Camera | extends Tool | extends THREE.Camera | interface ICamera
- Renderer | extends Tool | extends THREE.Renderer | interface IRenderer
- Light | extends Tool | extends THREE.Light.DirectionalLight | interface ILight
- Raster | extends Tool | extends THREE.Raster.Rasterizer | interface IRaster
- Shader | extends Tool | extends THREE.Shader.Shaderizer | interface IShader
- Animation | extends Tool | extends OBJ.animation | interface IAnimation

====

> a part of the 🌱 threed.ai code family
