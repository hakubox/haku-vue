import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        permissions: [
            {
                id: -1,
                code: '',
                name: '',
                remark: ''
            }
        ]
    },
    getters: {
        allPermissions(state) {
            return state.permissions.map(i => i.code);
        },
        checkPermissions: (state) => (value) => {
            let re = false;
            if(!value) {
                re = true;
            } else if(typeof(value) == 'string') {
                re = !!state.permissions.find(i => i.code === value);
            } else if(value instanceof Array) {
                re = value.every(val => !!state.permissions.find(i => i.code === val));
            }
            console.log(state.permissions.map(i => i.code), value, re);
            return re;
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        }
    },
    actions: {}
});
