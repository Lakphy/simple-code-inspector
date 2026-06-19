/**
 * 将文本复制到系统剪贴板。
 * 失败时仅打印警告（如 linux 未安装 xclip/xsel/wl-copy），不会向调用方抛错。
 */
export declare function copyToClipboard(text: string): Promise<boolean>;
