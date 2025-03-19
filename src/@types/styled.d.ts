//arquivo de definição de tipos {apenas tipagem}
/**
 * Override DefaultTheme to get accurate typings for your project.
 *
 * ```
 * // create styled-components.d.ts in your project source
 * // if it isn't being picked up, check tsconfig compilerOptions.types
 * import type { CSSProp } from "styled-components";
 * import Theme from './theme';
 *
 * type ThemeType = typeof Theme;
 *
 * declare module "styled-components" {
 *  export interface DefaultTheme extends ThemeType {}
 * }
 *
 * declare module "react" {
 *  interface DOMAttributes<T> {
 *    css?: CSSProp;
 *  }
 * }
 * ```
 */
import type { CSSProp } from "styled-components";
import  'styled-components'
import { defautTheme } from '../styles/thems/defaut'

type ThemeType  = typeof defautTheme;

declare module 'styled-components' {

    export interface DefaultTheme extends ThemeType{}
}