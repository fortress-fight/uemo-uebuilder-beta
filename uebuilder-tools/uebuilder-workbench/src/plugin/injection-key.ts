/*
 * @Description: vue 注入键
 * @Author: F-Stone
 * @LastEditTime: 2025-07-21 18:47:40
 */
import type { UeBuilderWorkbench } from "@/utils/uebuilder-workbench";

export const UeBuilderWorkbenchKey = Symbol() as InjectionKey<UeBuilderWorkbench>;
