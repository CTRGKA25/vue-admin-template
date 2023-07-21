import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,

    meta: {
      title: "系统设置",
      icon: "nested",
    },
    children: [
      {
        path: "Home",
        name: "Home",
        component: () => import("../views/Home/index.vue"),
        meta: { title: "银行维护", icon: "dashboard" },
      },
      {
        path: "/area",
        name: "area",

        component: () => import("../views/area/index.vue"),
        meta: { title: "地区维护", icon: "form" },
      },
      {
        path: "/news",
        component: Layout,

        name: "news",
        component: () => import("../views/news/index.vue"),
        meta: { title: "新闻公告", icon: "form" },
      },
      {
        path: "/mcc",
        component: Layout,

        name: "mcc",
        component: () => import("../views/mcc/mcc.vue"),
        meta: { title: "MCC维护", icon: "form" },
      },
      {
        path: "/roles",
        component: Layout,

        name: "roles",
        component: () => import("../views/roles/roles.vue"),
        meta: { title: "角色管理", icon: "form" },
      },
      {
        path: "/user",
        component: Layout,

        name: "user",
        component: () => import("../views/user/index.vue"),
        meta: { title: "用户管理", icon: "form" },
      },
      {
        path: "/menumanagement",
        component: Layout,

        name: "menumanagement",
        component: () => import("../views/menumanagement/index.vue"),
        meta: { title: "菜单管理", icon: "form" },
      },
    ],
  },
  {
    path: "/agentmanagement",
    component: Layout,
    meta: {
      title: "代理商管理",
      icon: "form",
    },
    children: [
      {
        path: "/agentmanagement",
        name: "agentmanagement",
        component: () => import("../views/Home/index.vue"),
        meta: { title: "代理商录入", icon: "form" },
      },
      {
        path: "/agentmanagement",
        name: "agentmanagement",
        component: () => import("../views/Home/index.vue"),
        meta: { title: "代理商录入", icon: "form" },
      },
    ],
  },

  // {
  //   path: "/example",
  //   component: Layout,
  //   redirect: "/example/table",
  //   name: "Example",
  //   meta: { title: "Example", icon: "el-icon-s-help" },
  //   children: [
  //     {
  //       path: "table",
  //       name: "Table",
  //       component: () => import("@/views/table/index"),
  //       meta: { title: "Table", icon: "table" },
  //     },
  //     {
  //       path: "tree",
  //       name: "Tree",
  //       component: () => import("@/views/tree/index"),
  //       meta: { title: "Tree", icon: "tree" },
  //     },
  //   ],
  // },

  {
    path: "/form",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "form" },
      },
    ],
  },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    hidden: true,
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
