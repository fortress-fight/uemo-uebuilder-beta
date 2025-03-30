export type ErrorLevel = "WARNING" | "ERROR";
export type ErrorCode = `${ErrorLevel}:${string}`;

export class UeError<T extends ErrorCode = ErrorCode> extends Error {
    code: T;
    data: any;

    constructor(code: T, param: { message: string; data?: any }) {
        super(param.message);
        this.code = code;
        this.data = param.data;
        this.name = "UeError"; // 自定义错误名称
    }
}
