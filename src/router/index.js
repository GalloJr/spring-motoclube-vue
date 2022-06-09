import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    // path: "/login"  indicaa a rota do back end
    // name: "Login", é  o nome da pagina
    // component: () => import("../views/Login.vue")  é a rota do vue onde criamos a pagina.
  },

  {
    path: "/membros",
    name: "Membro",
    component: () => import("../views/Membro.vue"),
  },

  {
    path: "/membropatente/:pat",
    name: "Membropatente",
    component: () => import("../views/Membro_busca_patente.vue"),
    props: true,
  },

  {
    path: "/membroapelido/:app",
    name: "Membroapelido",
    component: () => import("../views/Membro_busca_apelido.vue"),
    props: true,
  },

  {
    path: "/membronovo",
    name: "Membro_novo",
    component: () => import("../views/Membro_novo.vue"),
  },

  {
    path: "/membroeditar/:membro",
    name: "Membro_editar",
    component: () => import("../views/Membro_editar.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
