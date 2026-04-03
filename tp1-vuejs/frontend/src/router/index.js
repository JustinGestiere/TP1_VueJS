import { createRouter, createWebHistory } from "vue-router";
import SidebarLayout from "../views/SidebarLayout.vue";
import CourseEditView from "../views/CourseEditView.vue";

const routes = [
  {
    path: "/",
    component: SidebarLayout,
    children: [
      {
        path: "",
        redirect: "/course-creation",
      },
      {
        path: "course-creation",
        name: "CourseCreation",
        component: CourseEditView,
      },
      // {
      //   path: 'course-list',
      //   name: 'CourseList',
      //   component: () => import('../views/CourseListView.vue')
      // },
      // {
      //   path: "course-catalog",
      //   name: "CourseCatalog",
      //   component: () => import("../views/CourseCatalogView.vue"),
      // },
      // {
      //   path: "learning-workspace",
      //   name: "LearningWorkspace",
      //   component: () => import("../views/LearningWorkspaceView.vue"),
      // },
      // {
      //   path: "user-management",
      //   name: "UserManagement",
      //   component: () => import("../views/UserManagementView.vue"),
      // },
      // {
      //   path: "group-management",
      //   name: "GroupManagement",
      //   component: () => import("../views/GroupManagementView.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
