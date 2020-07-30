import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Listacursos',
    component: () => import('../views/Listacursos.vue'),
    meta: {
      autentificado: true,
    }
  },
  {
    path: '/curso/:id',
    name: 'curso',
    component: () => import('../views/Infocurso.vue'),
    meta: {
      autentificado: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some(record => record.meta.autentificado);

  if (autorizacion && !usuario) {
    next('/login');
  } else if (usuario && !autorizacion) {
    next('/home');
  }
  else {
    next();
  }
})

export default router
