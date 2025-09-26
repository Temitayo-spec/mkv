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
          aqua_blue_50: { value: '#E9F5F7' },
          500: { value: '#1A1C1E' },
          yellow_50: { value: '#FBF4E4' },
        },
        strokes: {
          1: { value: '#CDD6E9' },
          2: { value: '#EEF1F9' },
        },
        icons: {
          1: { value: '#6C7278' },
          2: { value: '#464B50' },
        },
        text: {
          black_1: { value: '#1A1C1E' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
