import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    tokens: {
      colors: {
        red: '#EE0F0F',
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
