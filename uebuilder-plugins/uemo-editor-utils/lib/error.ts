export class UeError extends Error {
    code: string;

    constructor(code: string, param: { message: string }) {
        super(param.message);
        this.code = code;
        this.name = "UeError"; // 自定义错误名称
    }
}
