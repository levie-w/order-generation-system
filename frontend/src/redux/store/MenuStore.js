const MenuStore = {

    // 2-1、定义动作名称（可选）
    SWITCH_MENU : "SWITCH_MENU",

    // 2-2、定义存储的数据结构（可选）
    defaultMenu: {
        menuName: "首页"
    },

    // 2-3、定义动作及其内容
    action: {
        switchMenu: (menuName) => {
            return {
                type: MenuStore.SWITCH_MENU,
                menuName
            }
        }
    },

    // 2-4、定义响应动作具体的操作内容
    reducer: (state = MenuStore.defaultMenu, action) => {
        switch (action.type) {
            case MenuStore.SWITCH_MENU:
                return {
                    ...state,
                    menuName: action.menuName
                }
                break;

            default:
                return { ...state }
        }
    }
}

export default MenuStore