import * as authorize from '@/api/authorize';
import * as file from '@/api/file';
import * as funcation from '@/api/funcation';
import * as order from '@/api/order';
import * as product from '@/api/product';
import * as role from '@/api/role';
import * as user from '@/api/user';


export default {
    /** 系统访问授权模块 */
    authorize,
    /** 文件上传控制器 */
    file,
    /** 系统功能操作模块 */
    funcation,
    /** 采购单相关操作模块 */
    order,
    /** 产品信息操作模块 */
    product,
    /** 角色信息操作模块 */
    role,
    /** 用户数据操作模块 */
    user,
}