import { createRouter, createWebHistory } from 'vue-router'
import CourseEditView from '../views/CourseEditView.vue'

const routes = [
  {
    path: '/',
    redirect: '/create-course'
  },
  {
    path: '/create-course',
    component: CourseEditView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router