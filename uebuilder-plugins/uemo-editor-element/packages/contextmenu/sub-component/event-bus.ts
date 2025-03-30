import mitt from "@stone/uemo-editor-utils/lib/mitt";

export const eventBus = mitt<{ closeAll: undefined; updateOpenPath: string }>();
