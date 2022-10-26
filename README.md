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

---

====

**HELPFUL LINKS**

- View [Github Repository](https://github.com/marty-mcgee/react-garden)
- Check [FAQ + Issues Page](https://github.com/marty-mcgee/react-garden/issues)

**SPECIAL THANKS**

During the development of this app, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [MUI](https://mui.com/) - The React UI library for faster + easier web development.
- [React Table](https://react-table.tanstack.com/) - Lightweight + extensible data tables for React.
- [React Flatpickr](https://github.com/haoxins/react-flatpickr) - Useful library used to select date.
- [React ChartJS 2](http://reactchartjs.github.io/react-chartjs-2/#/) - Simple yet flexible React charting for designers + developers.
- [Full Calendar](https://fullcalendar.io/) - Full-sized drag + drop event calendar.
- [Dropzone](https://www.dropzonejs.com/) - An open source library that provides drag + drop file uploads with image previews.
- [React Kanban](https://github.com/asseinfo/react-kanban) - Kanban/Trello board lib for React.
- [React Images Viewer](https://guonanci.github.io/react-images-viewer/) - A simple, responsive images viewer component for ReactJS.
- [React Quill](https://github.com/zenoamaro/react-quill) - A free, open source WYSIWYG editor built for the modern web.
- [Formik](https://formik.org/) - Formik is the world's most popular (deprecated) open source <form> library for React + React Native.
- [ChromaJS](https://gka.github.io/chroma.js/) - A small zero-dependency JavaScript library for all kinds of color conversions scales.
- [UUID](https://github.com/uuidjs/uuid) - JavaScript library for generating random id numbers.
- [HTML React Parser](https://github.com/remarkablemark/html-react-parser) - A utility for converting HTML strings into React components.

====

> a part of the 🌱 threed.ai code family
