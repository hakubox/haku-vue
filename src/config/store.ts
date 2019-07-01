import Vue from 'vue';
import Vuex from 'vuex';
import { UserInfo } from '@/@types/basic';

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
        ],
        userInfo: {
            name: '',
            nickname: '',
            email: '',
            phone: ''
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        },
        allPermissions(state) {
            return state.permissions.map(i => i.code);
        },
        checkPermissions: state => value => {
            let re = false;
            if(!value) {
                re = true;
            } else if(typeof(value) == 'string') {
                re = !!state.permissions.find(i => i.code === value);
            } else if(value instanceof Array) {
                re = value.every(val => !!state.permissions.find(i => i.code === val));
            }
            return re;
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {}
});
