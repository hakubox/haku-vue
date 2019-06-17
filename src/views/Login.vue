<template>
    <div class="login-page">

        <a-form :form="form" @submit="handleSubmit">
            <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }" label="用户名" :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
                <a-input v-decorator="['name', {rules: [{ required: true, message: '请输入用户名！' }]} ]" placeholder="用户名" >
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }" label="密码" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
                <a-input v-decorator="['password', {rules: [{ required: true, message: '请输入密码！' }]} ]" type="password" placeholder="密码" >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 2 }">
                <a-button type="primary" html-type="submit" :disabled="form && hasErrors(form.getFieldsError())">登录系统</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Component({
  components: {
  }
})
export default class UserManager extends Vue {
    hasErrors = hasErrors;
    form;
    created() {
        this.form = this.$form.createForm(this);
    }
    mounted() {
        this.$root.setBreadcrumb(['登录']);
        
        this.$nextTick(() => {
            this.form && this.form.validateFields();
        });
    }
    
    emitEmpty() {
        this.name = '';
    }
    userNameError () {
        if(!this.form) return false;
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('userName') && getFieldError('userName');
    }
    passwordError () {
        if(!this.form) return false;
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('password') && getFieldError('password');
    }
    handleSubmit  (e) {
        e.preventDefault();
        this.form && this.form.validateFields((err, values) => {
            if (!err) {
                this.$axios.get('/api/Token/GetToken', {
                    params: {
                        name: values.name,
                        password: values.password
                    }
                }).then(d => {
                    localStorage.setItem('token', d.data);
                    this.$common.get('/api/User/GetUser').then(d => {
                        this.root.userInfo = d;
                        this.root.is_manager = d.rolename == 'admin';
                        this.$bus.$emit('routerchange', { name: 'materiel', path: '/materiel', query: {}});
                        this.$router.push('/materiel');
                    });
                }).catch(d => {
                    this.$message.error(d.response.data.errMsg);
                });
            }
        });
    }
    login() {
        
    }
}
</script>

<style lang="scss">
.ant-col-offset-2.ant-form-item-control-wrapper {
    margin-top: 10px;
}
</style>
