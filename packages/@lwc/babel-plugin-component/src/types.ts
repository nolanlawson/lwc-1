import * as BabelCoreNamespace from "@babel/core";
import * as BabelTypesNamespace from "@babel/types";
import {PluginPass} from "@babel/core";

export type BabelAPI = typeof BabelCoreNamespace;
export type BabelTypes = typeof BabelTypesNamespace;

export interface LwcBabelPluginPass extends PluginPass {
    opts: {
        isExplicitImport?: boolean
    },
}
