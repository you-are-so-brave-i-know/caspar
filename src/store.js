import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const moduleA = {
  state: {
    age: '这是modulea的属性'
  },
  getters: {
    // 当前state,当前getters,根state
    getage(state, getters, rootState) {

    }
  },
  mutations: {
    //这里的state 为模块内的state
    setage(state) {
      state.age = "modeula的age属性改变了"
    }
  },
  actions: {
    // 当前模块state,触发,根state
    setage({ state, commit, rootState }) {

    },
    // 另一种写法
    setage2(obj) {
      obj.state;
      obj.commit('setage');
      obj.rootState;
    }
  }
}
const store = new Vuex.Store({
  state: {
    user: 'aa',
    userType: '0',
    loginType: '1',
    count: 0,
    list: [
      { id: 1, name: 'hhh' },
      { id: 2, name: 'jjj' },
    ]
  },
  getters: {
    getListName: state => {
      return state.list.filter(item => item.name)
    },
    getListlength: (state, getters) => {
      return getters.getListName.length
    },
    getNamebyId: state => id => {
      return state.list.find(item => item.id === id)
    }
  },
  // 同步操作state
  mutations: {
    newlogin(state) {
      state.count++
    },
    setUserType(state, content) {
      state.userType = content
    }
  },
  // 可异步操作state
  actions: {
    newlogin(context, obj) {
      setTimeout(() => {
        context.commit('newlogin')
      }, obj.time)
    },
    //修改参数context =>{commit} 简化步骤
    actionA({ commit }, content) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('setUserType', content)
          resolve()
        }, 1000)
      })
    }
  },
  // 模块
  modules: {
    a: moduleA,
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: {}, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin() { } // -> getters['account/isAdmin']
      },
      actions: {
        login() { } // -> dispatch('account/login')
      },
      mutations: {
        login() { } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: {},
          getters: {
            profile() { } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: {},
          getters: {
            popular() { } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
export default store