# [🌱 React Garden TypeScript Material UI App](https://github.com/marty-mcgee/react-garden)

React + TypeScript + ThreeJS app using Material UI v5 on NextJS v12, Apollo Client v3, GraphQL + WordPress REST APIs, for ThreeD web development.. a "Design Dashboard" for developing Three JS components + apps.

## Live Demo
[threedgarden.com](https://threedgarden.com/)

## Development
requires pnpm: `npm install -G pnpm`

install: `pnpm i`
* equiv to pnpm install

develop: `pnpm next`
* default, there are other JS frameworks available

build: `pnpm next:build`
* default, (or vite:build or vue:build, etc..)

deploy: `pnpm next:export`
* default, for Vercel Zero-Config Deployments

====

## FUNCTIONAL NOUNS
#### (JS OBJECTS, SIMILAR TO CLASSES, BUT BETTER)
---

* ThreeD           | as root JS Object       | interface IThreeD         | wp threed
---

* Project          | as JS Object            | interface IProject        | wp project
* Plan             | as JS Object            | interface IPlan           | wp plan
* File             | as JS Object from Any   | interface IFile           | wp file
* Edit             | Actions | Relationships | interface IEdit           | wp edit
* View             | as JS Object | Settings | interface IView           | wp view
---

* Simulation       | as JS Object            | interface ISimulation     | wp simulation
* Game             | extends Simulation      | interface IGame           | wp game
* Demo             | extends Simulation      | interface IGame           | wp demo
---

* World            | as JS Object            | interface IWorld          | wp world
* Character        | as JS Object            | interface ICharacter      | wp characters
* Bear             | extends Character       | interface IBear           | wp bear
* Gardener         | extends Character       | interface IGardener       | wp gardener
* Chicken          | extends Character       | interface IChicken        | wp chicken
* Scene            | extends THREE.Scene     | interface IScene          | wp scene
* Plane            | extends THREE.Object3D  | interface IPlane          | wp plane
* Structure        | extends THREE.Object3D  | interface IStructure      | wp structure
* Farm             | extends THREE.Group     | interface IFarm           | wp farm
* Garden           | extends THREE.Group     | interface IGarden         | wp garden
* Allotment        | extends Structure       | interface IAllotment      | wp allotment
* Bed              | extends Structure       | interface IBed            | wp bed
* Furniture        | extends Structure       | interface IFurniture      | wp furniture
* Equipment        | extends Structure       | interface IEquipment      | wp equipment
* Plant            | extends Structure       | interface IPlant          | wp plant
* Soil             | extends Structure       | interface ISoil           | wp soil
* SoilAddendum     | extends Soil            | interface ISoilAddendum   | wp soil_addendum
* SoilPlan         | Actions | Relationships | interface ISoilPlan       | wp soil_plan
* PlantingPlan     | Actions | Relationships | interface IPlantingPlan   | wp planting_plan
* BuildingPlan     | Actions | Relationships | interface IBuildingPlan   | wp building
---

* Tool             | as JS Object | extends ThreeD?                      | interface ITool
* PlaneTool        | extends Tool                                        | interface IPlane
* Camera           | extends Tool | extends THREE.Camera                 | interface ICamera
* Renderer         | extends Tool | extends THREE.Renderer               | interface IRenderer
* Light            | extends Tool | extends THREE.Light.DirectionalLight | interface ILight
* Raster           | extends Tool | extends THREE.Raster.Rasterizer      | interface IRaster
* Shader           | extends Tool | extends THREE.Shader.Shaderizer      | interface IShader
* Animation        | extends Tool | extends OBJ.animation                | interface IAnimation
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
