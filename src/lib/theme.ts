import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
          1: { value: '#F7F7F7' },
          2: { value: '#F2F2F2' },
          indigo: { value: '#41245F' },
          aqua_blue: { value: '#75C5C1' },
          500: { value: '#1A1C1E' },
        },
        strokes: {
          1: { value: '#CDD6E9' },
          2: { value: '#EEF1F9' },
        },
        icons: {
          1: { value: '#6C7278' },
          2: { value: '#464B50' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
