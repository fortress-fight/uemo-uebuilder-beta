import { AxiosUemo } from "@/api/api.instance";

/**
 * 检查用户登录
 * @returns Promise with user info
 */
export function checkUserLogin() {
    return AxiosUemo.get<UEBUILDER_TOOLS_API.Data<any>>("/shop/api/userinfo");
}

/**
 * 用户退出
 * @returns Promise with logout result
 */
export function userLogout() {
    return AxiosUemo.get("/user/logout.html");
}

/**
 * 获取用户信息
 * @returns Promise with user info
 */
export function getUserInfo() {
    return AxiosUemo.get<
        UEBUILDER_TOOLS_API.Data<{
            weixin: string;
            avatar: string;
            level: string;
            ainfo: { name: string };
            tools_guide: string;
            tools_industry?: string;
        }>
    >("/shop/api/userinfo");
}
