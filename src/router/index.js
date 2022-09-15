import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    // scrollBehavior: () => ({ x: 0, y: 0 }),
    scrollBehavior: (to, from, savedPosition) => {
      console.log("===== INICI ======");
      console.log("from:", from);
      console.log("to:", to);
      console.log("to.name === 'cercar'", to.name === "cercar")
			if (savedPosition) {
        console.log("SAVED PSITION")
        console.log(savedPosition);
        console.log("===== FINAL ======");
				return savedPosition
			} else {
        console.log("Left Top");
        console.log("===== FINAL ======");
				// return { left: 0, top: 0 }
				return { x: 0, y: 0 }
			}
		},
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
