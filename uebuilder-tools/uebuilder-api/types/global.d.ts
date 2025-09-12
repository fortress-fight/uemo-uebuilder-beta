declare global {
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
