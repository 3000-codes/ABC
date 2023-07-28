<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";
const ifcContainer = ref<HTMLDivElement>();
let initialViewer: IfcViewerAPI | null = null;
let viewer: IfcViewerAPI | null = null;

const loadIfc = async (container: HTMLDivElement) => {
  const ifcViewer = new IfcViewerAPI({
    container,
    backgroundColor: new Color(0xffffff),
  });
  ifcViewer.addAxes();
  ifcViewer.addGrid();
  await ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
    COORDINATE_TO_ORIGIN: true,
    USE_FAST_BOOLS: false,
  });
  return ifcViewer;
};

const loadModel = async (viewer: IfcViewerAPI, url: string) => {
  await viewer.IFC.setWasmPath("./");
  const model = await viewer.IFC.loadIfcUrl(url);
  viewer.shadowDropper.renderShadow(model.modelID);
  viewer.clipper.active = true;
  initialViewer = null;
};

const ifcCleanup = async (ifcViewer: IfcViewerAPI) => {
  await ifcViewer.dispose();
};

const handleOnDoubleClick = () => {
  if (viewer) {
    viewer.IFC.selector.pickIfcItem(true);
  }
};
const handleOnMouseMove = () => {
  if (viewer) {
    viewer.IFC.selector.prePickIfcItem();
  }
};
const handleOnKeyDown = (event: KeyboardEvent) => {
  if (viewer) {
    if (event.code === "KeyP") {
      viewer.clipper.createPlane();
    }
    if (event.code === "KeyO") {
      viewer.clipper.deletePlane();
    }
  }
};

// watch(
//   () => initialViewer,
//   () => {
//     if (initialViewer) {
//       loadModel(initialViewer, "./01.ifc");
//     }
//   }
// );

onMounted(() => {
  let ifcViewer: IfcViewerAPI;
  const initialize = async (ifcContainer: HTMLDivElement) => {
    ifcViewer = await loadIfc(ifcContainer);
    initialViewer = ifcViewer;
    viewer = ifcViewer;
  };
  if (ifcContainer.value) {
    initialize(ifcContainer.value);
  }
});

onBeforeMount(() => {
  if (initialViewer) {
    ifcCleanup(initialViewer);
  }
});

const file = ref<HTMLInputElement | null>(null);

const handleOnChange = () => {
  if (file.value && file.value.files) {
    const fileUrl = URL.createObjectURL(file.value.files[0]);
    if (viewer) {
      loadModel(viewer, fileUrl);
    }
  }
};
</script>

<template>
  <h1>IFC Viewer</h1>
  <input type="file" ref="file" @change="handleOnChange" />
  <div
    class="ifcContainer"
    ref="ifcContainer"
    @dbclick="handleOnDoubleClick"
    @mousemove="handleOnMouseMove"
    @keydown="handleOnKeyDown"
  ></div>
</template>

<style scoped>
.ifcContainer {
  width: 60vw;
  height: 60vh;
}
</style>
