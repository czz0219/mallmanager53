import axios from 'axios'
const MyHttpServer={}
MyHttpServer.install =  (Vue)=>{
  /*  // 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }
  
    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }

    })
  
    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      }

    })
  */
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/';
    // 4. 添加实例方法
    Vue.prototype.$axios = axios;
  }
  export default MyHttpServer;//导出插件对象.