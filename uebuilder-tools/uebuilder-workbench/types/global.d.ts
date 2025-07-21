declare global {
    namespace UE_BUILDER_WORKBENCH_TOOLS {
        type UserInfo = {
            weixin: string;
            avatar: string;
            level: string;
            ainfo: { name: string };
            tools_guide: string;
            tools_industry?: string;
        };
    }

    namespace UEBUILDER_TOOLS_API {
        type Data<T extends Record<string, any>> = {
            code: number;
            msg: string;
            time: string;
            data: {
                CCONFIG: {
                    DOMAIN_MAIN: string;
                    DOMAIN_LINE: string;
                    TITLE: string;
                    ACCOUNT_TYPE: string;
                    PAYMENT_TYPE: string;
                };
            } & T;
        };

        type UserPageInfo = { title: string; img: string; json: string };
    }
}

export {};
