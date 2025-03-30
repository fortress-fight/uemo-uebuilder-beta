export type ResourceShareIcon = ResourceShareIconItem[];
export type ResourceShareIconItem = {
    type: string;
    name: string;
    icon: string[];
    placeholder: string;
};

const shareIcon: ResourceShareIcon = [
    {
        type: "weibo",
        name: "微博",
        icon: ["ue-share-weibo"],
        placeholder: "请输入微博分享链接",
    },
    {
        type: "weixin",
        name: "微信",
        icon: ["ue-share-weixin"],
        placeholder: "请输入微信二维码图片链接",
    },
    {
        type: "qq",
        name: "QQ",
        icon: ["ue-share-qq"],
        placeholder: "请输入QQ号",
    },
    {
        type: "call",
        name: "电话",
        icon: ["ue-share-call"],
        placeholder: "请输入联系电话",
    },
    {
        type: "xiaohongshu",
        name: "小红书",
        icon: ["ue-share-xiaohongshu"],
        placeholder: "请输入小红书分享链接",
    },
    {
        type: "zcool",
        name: "站酷",
        icon: ["ue-share-zcool-fill"],
        placeholder: "请输入站酷分享链接",
    },
    {
        type: "instagram",
        name: "instagram",
        icon: ["ue-share-instagram"],
        placeholder: "请输入instagram分享链接",
    },
    {
        type: "behance",
        name: "behance",
        icon: ["ue-share-behance"],
        placeholder: "请输入behance分享链接",
    },
    {
        type: "linkedin",
        name: "linkedin",
        icon: ["ue-share-linkedin"],
        placeholder: "请输入linkedin分享链接",
    },
    {
        type: "google",
        name: "google",
        icon: ["ue-share-google"],
        placeholder: "请输入google分享链接",
    },
    {
        type: "twitter",
        name: "推特",
        icon: ["ue-share-twitter_icon"],
        placeholder: "请输入twitter分享链接",
    },
    {
        type: "tiktok",
        name: "抖音",
        icon: ["ue-share-tiktok"],
        placeholder: "请输入链接",
    },
    {
        type: "facebook",
        name: "facebook",
        icon: ["ue-share-facebook"],
        placeholder: "请输入facebook分享链接",
    },
    {
        type: "youtube",
        name: "youtube",
        icon: ["ue-share-youtube"],
        placeholder: "请输入youtube分享链接",
    },
    {
        type: "download",
        name: "下载",
        icon: ["ue-share-download"],
        placeholder: "请输入下载链接",
    },
    {
        type: "bilibili",
        name: "bilibili",
        icon: ["ue-share-bilibili"],
        placeholder: "请输入bilibili分享链接",
    },
    {
        type: "discord",
        name: "discord",
        icon: ["ue-share-discord"],
        placeholder: "请输入discord分享链接",
    },
    {
        type: "dribbble",
        name: "dribbble",
        icon: ["ue-share-dribbble"],
        placeholder: "请输入dribbble分享链接",
    },
    {
        type: "eewu",
        name: "得物",
        icon: ["ue-share-eewu"],
        placeholder: "请输入eewu分享链接",
    },
    {
        type: "github",
        name: "github",
        icon: ["ue-share-github"],
        placeholder: "请输入github分享链接",
    },
    {
        type: "mini-app",
        name: "小程序",
        icon: ["ue-share-mini-app"],
        placeholder: "请输入小程序二维码图片链接",
    },
    {
        type: "qrcode",
        name: "小程序",
        icon: ["ue-share-qrcode"],
        placeholder: "请输入二维码图片链接",
    },
    {
        type: "pinterest",
        name: "pinterest",
        icon: ["ue-share-pinterest"],
        placeholder: "请输入pinterest分享链接",
    },
    {
        type: "whatsapp",
        name: "whatsapp",
        icon: ["ue-share-whatsapp"],
        placeholder: "请输入whatsapp分享链接",
    },
    {
        type: "zhihu",
        name: "zhihu",
        icon: ["ue-share-zhihu"],
        placeholder: "请输入zhihu分享链接",
    },
];

export default shareIcon;
