/**
 * The Template Context is any arguments passed to the template for its use.
 */
export type TTemplateContext = any;

/**
 *  A function that returns a `ink` based React element.
 */
export type TTemplateFunction = (context: TTemplateContext) => JSX.Element;

/**
 * A Template ia React template using the [Ink]() UI framework. Templates are defined much in the same way that any
 * web based React components, with the exception that a single `TTemplate` object can have multiple renderable
 * React components.
 *
 * ```typescript
 *   import React from "react";
 *   import { TTemplate, TTemplateContext } from "@tau/world";
 *
 *   import { Box, Teext} from "ink"
 *
 *
 *   export const MyTemplate: TTemplateContext = {
 *     helloWorld() {
 *         return (
 *             <Box>
 *                 <Text>Hello World</Text>
 *              </Box>
 *         )
 *     },
 *
 *     goodbyeWorld(context: TTemplateContext) {
 *         return (
 *             <Box>
 *                 <Text>Goodbye {context}</Text>
 *             </Box>
 *         )
 *     }
 *   }
 * ```
 *
 * Templates must be configured as a part of the application's `world` configuration, plugins that define a template
 * of the same name will override previous definitions. This allows for developers to define custom templates that
 * override the Tau defaults.
 */
export interface ITemplate {
  [key: string]: TTemplateFunction;
}
