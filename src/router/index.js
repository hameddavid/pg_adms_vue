import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth/Auth.vue";
import store from "../store/index";
import studentlayout from "../views/StudentLayout/studentlayout.vue";
Vue.use(VueRouter);

const requireAuthApplicant = (to, from, next) => {
  if (store.getters.isAuthenticatedApplicant) {
    // console.log(true);
    next();
    return;
  }
  console.log(false);
  next("/login");
  return;
};
const requireAuthStudent = (to, from, next) => {
  if (store.getters.isAuthenticatedStudent) {
    console.log("auth student");
    // next({ name: "studentLayout" });
    next();
    return;
  }
  console.log(false);
  next({ name: "studentLogin" });
  return;
};
const ifAuth = (to, from, next) => {
  if (store.getters.isAuthenticated.state) {
    if (store.getters.isAuthenticated.type == "applicant") {
      //     console.log('before next if auth')
      next({ name: "admission", replace: true });
      return;
    } else if (store.getters.isAuthenticated.type == "student") {
      // next();
      next({ name: "studentlayout", replace: true });
      return;
    }
  } else {
    next();
    return;
  }
};
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // children: [
    //   {
    //     path: "login",
    //     name: "login",
    //     component: () => import("../views/Auth/Login.vue"),
    //     beforeEnter: ifAuth,
    //   },
    //   {
    //     path: "/studentLogin",
    //     name: "studentLogin",
    //     component: () => import("../views/Auth/student.login.vue"),
    //     beforeEnter: ifAuth,
    //   },
    //   {path:'register', name:'register', component:()=>import('../views/Auth/Register.vue')},
    //   {path:'forgotpassword',name:'forgotpassword' , component:()=>import('../views/Auth/ForgotPassword.vue')},
    // ],
    beforeEnter: (to, from, next) => {
      next();
    },
  },
  {
    path: "/studentLogin",
    name: "studentLogin",
    component: () => import("../views/Auth/student.login.vue"),
    beforeEnter: ifAuth,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    beforeEnter: ifAuth,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
    beforeEnter: ifAuth,
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: () => import("../views/Auth/ForgotPassword.vue"),
    beforeEnter: ifAuth,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/admission",
    name: "admission",
    component: () =>
      import(
        /* webpackChunkName: "AdmissionPortal" */ "../views/Admission/AdmissionPortal.vue"
      ),
    beforeEnter: requireAuthApplicant,
  },
  {
    path: "/student",
    name: "studentlayout",
    component: studentlayout,
    children: [
      {
        path:"",
        name:"studentPortal",
        component:() => import("../views/StudentLayout/student.portal.vue")
      },
      {
        path: "dashboard",
        name: "studentdashboard",
        component: () => import("../views/StudentLayout/student.portal.vue"),
        // component: () => import("../views/StudentLayout/studentdashboard.vue"),
      },
      {
        path: "payment",
        name: "studentPayment",
        component: () => import("../views/StudentLayout/studentpayment.vue"),
      },
      {
        path: "course",
        name: "studentcourse",
        component: () => import("../views/StudentLayout/studentcourse.vue"),
      },
    ],
    beforeEnter: requireAuthStudent,
  },
  {
    path: "*",
    component: () => import("../views/Error404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
