# Interface: ITemplate

[@tau/world](../modules/tau_world.md).ITemplate

A Template ia React template using the [Ink]() UI framework. Templates are defined much in the same way that any
web based React components, with the exception that a single Template object can have multiple renderable
React components.

```tsx
  import React from "react";
  import { ITemplate, TTemplateContext } from "@tau/world";

  import { Box, Teext} from "ink"

  export const MyTemplate: ITemplate = {
    helloWorld() {
        return (
            <Box>
                <Text>Hello World</Text>
             </Box>
        )
    },

    goodbyeWorld(context: TTemplateContext) {
        return (
            <Box>
                <Text>Goodbye {context}</Text>
            </Box>
        )
    }
  }
```

Templates must be configured as a part of the application's `world` configuration, plugins that define a template
of the same name will override previous definitions. This allows for developers to define custom templates that
override the Tau defaults.

## Indexable

▪ [key: `string`]: [`TTemplateFunction`](../modules/tau_world.md#ttemplatefunction)
