/*
 * @Description: vue 注入键
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 03:01:25
 */
import type { UeBuilderStorehouse } from "@/utils/uebuilder-storehouse";

export const UeBuilderStorehouseKey = Symbol() as InjectionKey<UeBuilderStorehouse>;
