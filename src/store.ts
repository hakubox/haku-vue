import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        permissions: [
            {
                id: -1,
                name: '',
                remark: ''
            }
        ]
    },
    getters: {
        allPermissions(state) {
            return state.permissions.map(i => i.name);
        },
        checkPermissions: (state) => (value) => {
            if(!value) {
                return true;
            } else if(typeof(value) == 'string') {
                return !!state.permissions.find(i => i.name === value);
            } else if(value instanceof Array) {
                return value.every(val => !!state.permissions.find(i => i.name === val));
            }
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        }
    },
    actions: {}
});
