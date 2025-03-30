import { axios } from "@stone/uemo-editor-utils/lib/axios";
import { i18n } from "@/i18n";

const { t } = i18n.global;

interface TYPE_SITE_NAV {
    id: string;
    title: string;
    mname: string;
    url?: string;
    npid: string;
    ndp: string;
    mvars?: string;
}

// 账户信息
interface TYPE_ACCOUNT_DATA {
    id: string;
    level: number;
    seller: {
        img: string;
        mobile: string;
        name: string;
    };
}

// 站点地址相关信息
interface TYPE_SITE_URL {
    siteurl: string;
    sitetplurl: string;
    mourl: string;
}

// 用户信息
interface TYPE_USER_DATA {
    id: string;
    moid: string;
    msuid: string;
    level: string;
    clienttype: string;
    expiredtime: string;
    copyid: string;
    domain: string;
    uebuilder: string;
}

// 站点配置信息
interface TYPE_SITE_CONFIG {
    DOMAIN_MAIN: string;
    DOMAIN_LINE: string;
    TITLE: string;
}

interface TYPE_SITE_MODULE {
    id: string;
    type: string;
}

interface TYPE_API_BASE_DATA {
    TPageData: TYPE_SITE_NAV[];
    TAccountData: TYPE_ACCOUNT_DATA;
    TSiteData: TYPE_SITE_URL;
    TUserData: TYPE_USER_DATA;
    TListTypeData: TYPE_SITE_MODULE[];
    CCONFIG: TYPE_SITE_CONFIG;
}

interface TYPE_RESOURCE_DATA {
    id: string;
    filename: string;
    url: string;
    size: string;
    postdate: string;
    type: string;
}

interface TYPE_PAGE_TAB {
    pages: { url: string; title: string }[];
    next?: { url: string; title: string };
    last?: { url: string; title: string };
    first?: { url: string; title: string };
    prev?: { url: string; title: string };
    total?: string;
}

interface TYPE_RESOURCE_PAGE_DATA extends TYPE_API_BASE_DATA {
    TResourcesData: TYPE_RESOURCE_DATA[];
    TResourcesSplitePageData: TYPE_PAGE_TAB;
}

export function uemoUploadHistory(config: {
    query: UE_EL_UTIL.UploadHistoryQueryParams;
}): Promise<UE_EL_UTIL.UploadHistoryResponse> {
    const baseURL = process.env.NODE_ENV === "production" ? "/" : "/mo005-cms-api/";
    const instance = axios.create({ baseURL, params: { is_ajax: 1 } });
    const { query } = config;

    return instance
        .get("resources", { params: { s: query.filename, page: query.page } })
        .then((res: { data: TYPE_RESOURCE_PAGE_DATA }) => {
            if (!res?.data) {
                return Promise.reject(
                    new UeElError(UeElErrorCode.UPLOAD_HISTORY_GET_LIST_FAILED, {
                        message: t("ERROR_UPLOAD_HISTORY_GET_LIST_FAILED"),
                    })
                );
            }

            const resources = res.data.TResourcesData;
            return {
                code: 200,
                data: {
                    limit: 24,
                    page: Number(query.page),
                    list: resources.map((item) => ({
                        id: item.id,
                        filename: item.filename,
                        url: "https://resources.jsmo.xin" + item.url,
                        size: item.size,
                        type: item.type,
                        post_date: item.postdate,
                    })),
                    next: res.data.TResourcesSplitePageData.next || { url: "", title: "" },
                },
            };
        });
}
