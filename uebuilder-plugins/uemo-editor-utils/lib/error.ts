export type ErrorLevel = "WARNING" | "ERROR";
export type ErrorCode = `${ErrorLevel}:${string}`;

export class UeError<T extends ErrorCode = ErrorCode> extends Error {
    code: T;

    constructor(code: T, param: { message: string }) {
        super(param.message);
        this.code = code;
        this.name = "UeError"; // 自定义错误名称
    }
}
