import MD5 from "crypto-js/md5";

export function createMd5(str: string) {
    return MD5(str).toString();
}
