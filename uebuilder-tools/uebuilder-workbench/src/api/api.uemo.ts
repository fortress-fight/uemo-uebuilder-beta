/*
 * @Description: 获取用户信息，不校验用户登陆
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 16:36:05
 */
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

/**
 * 检查用户登录状态
 * @returns Promise with login status
 */
export function checkLoginStatus() {
    return AxiosUemo.get<UEBUILDER_TOOLS_API.Data<any>>("/shop/api/userinfo").then((res) => res.code === 0);
}
