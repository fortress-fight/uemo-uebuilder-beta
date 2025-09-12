/*
 * @Description: 登录管理器
 * @Author: F-Stone
 * @LastEditTime: 2025-09-12 17:13:27
 */
import { UemoAPIError, getUserInfo, checkLoginStatus, userLogout } from "@stone/uebuilder-api--tools/api";
import { pinia, useUeBuilderWorkbenchToolsStore } from "@/store";
import { UeBuilderWorkbenchBase } from "@stone/uebuilder-workbench-base/src";

const UeBuilderWorkbenchToolsStore = useUeBuilderWorkbenchToolsStore(pinia);

/**
 * 登录管理器类
 * 负责处理所有与登录相关的操作
 */
export class LoginManager {
    private loginWindow: Window | null = null;
    private readonly toast = UeBuilderWorkbenchBase.utils.toast;

    public get loginState() {
        return UeBuilderWorkbenchToolsStore.userLoginState;
    }

    /**
     * 检查登录状态并处理登录窗口
     */
    public async checkLogin(): Promise<boolean> {
        const isLogin = await checkLoginStatus();
        if (isLogin) {
            UeBuilderWorkbenchToolsStore.userLogin();
        }
        return isLogin;
    }

    public async logout() {
        await userLogout();
        UeBuilderWorkbenchToolsStore.userLogout();
    }

    /**
     * 更新用户信息
     * @returns {Promise<ApiResponse>} 用户信息更新结果
     */
    public async updateUserInfo() {
        const res = await getUserInfo();
        if (res.code === 0) {
            const { weixin, avatar, level, ainfo, tools_guide, tools_industry } = res.data;
            UeBuilderWorkbenchToolsStore.setUserInfo({ weixin, avatar, level, ainfo, tools_guide, tools_industry });
            return res;
        }
        throw new UemoAPIError(res.code, res.code === 998 ? "未检测到登录信息" : res.msg);
    }

    /**
     * 计算登录窗口位置
     * @private
     */
    private calculateLoginWindowPosition() {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const width = 1100;
        const height = 800;
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;
        return { width, height, left, top };
    }

    /**
     * 打开登录窗口
     * @private
     */
    public openLoginWindow(): boolean {
        if (this.loginWindow) {
            void this.loginWindow.focus();
            return true;
        }

        const { width, height, left, top } = this.calculateLoginWindowPosition();

        const loginUrl = "https://www.uemo.net/user/login.html/";
        this.loginWindow = window.open(
            loginUrl,
            "登录",
            `left=${left},top=${top},popup=yes,width=${width},height=${height}`
        );

        if (!this.loginWindow) {
            void this.toast.error("打开登录窗口失败，请检查浏览器是否阻止弹出窗口");
            return false;
        }

        if (process.env.NODE_ENV === "production") {
            this.handleProductionLogin();
        } else {
            this.handleDevelopmentLogin();
        }
        return true;
    }

    /**
     * 处理生产环境登录
     * @private
     */
    private handleProductionLogin(): void {
        if (!this.loginWindow) return;

        this.loginWindow.onunload = () => {
            if (this.loginWindow?.location.host !== "www.uemo.net") return;
            this.loginWindow?.close();
            this.loginWindow = null;
            void this.handleLoginComplete();
        };
    }

    /**
     * 处理开发环境登录
     * NOTE 由于开发环境无法监听 onunload 事件，所以需要使用 setInterval 来监听登录窗口是否关闭
     * @private
     */
    private handleDevelopmentLogin(): void {
        const timer = setInterval(() => {
            if (!this.loginWindow?.closed) return;

            clearInterval(timer);
            this.loginWindow = null;
            void this.handleLoginComplete();
        }, 500);
    }

    /**
     * 处理登录完成后的操作
     * @private
     */
    private async handleLoginComplete(): Promise<void> {
        try {
            const res = await this.updateUserInfo();
            if (res.data.tools_industry) {
                void this.toast.success("登录成功");
                return;
            }
            // TASK: 实现 openUserIndustryCollect
        } catch (error) {
            if (error instanceof UemoAPIError && error.code === 998) {
                void this.toast.error("未检测到登录信息");
            } else {
                void this.handleError(error);
            }
        }
    }

    /**
     * 处理错误
     * @private
     */
    private handleError(err: unknown): void {
        this.toast.error(err instanceof Error ? err.message : "Unknown Error");
    }
}
