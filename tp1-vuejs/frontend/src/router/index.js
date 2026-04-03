import { createRouter, createWebHistory } from "vue-router";
import LearningWorkspaceView from "../views/LearningWorkspace/LearningWorkspaceView.vue";
import CourseCreationView from "../views/CourseCreation/CourseCreationView.vue";

const routes = [
  {
    path: "/",
    redirect: "/learning-workspace",
  },
  {
    path: "/learning-workspace",
    name: "LearningWorkspace",
    component: LearningWorkspaceView,
  },
  {
    path: "/course-creation",
    name: "CourseCreation",
    component: CourseCreationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
