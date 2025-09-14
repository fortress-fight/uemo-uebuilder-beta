/*
 * @Description: vue 注入键
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 23:28:43
 */
import type { UebuilderEditorFactory } from "../utils/uebuilder-editor-factory";

export const UebuilderEditorFactoryKey = Symbol() as InjectionKey<UebuilderEditorFactory>;
