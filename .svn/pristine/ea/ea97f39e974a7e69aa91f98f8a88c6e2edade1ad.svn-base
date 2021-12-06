import store from '@/store'

const permission = {
    inserted(el, binding, vnode) {
        const { value } = binding
        const all_permission = "*:*:*"                             
        const permissions = store.getters && store.getters.permissions
        
        if (value && value instanceof Array && value.length > 0) {
            
            const permissionsFlag = value
            const hasPermission = permissions.some(permissionItem => {
                return all_permission === permissionItem || permissionsFlag.includes(permissionItem)
            })

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error('请设置操作权限标签值')
        }
    }
}

export default permission
