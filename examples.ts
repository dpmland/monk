// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Monk } from './mod.ts';

await Monk({
  versions: {
    downloadVersion: 'stable',
    stable: {
      url: 'https://github.com/TeoDev1611/spider',
      branch: 'main',
    },
    canary: {
      url: 'https://github.com/TeoDev1611/octorg',
      branch: 'main',
    },
  },
  files: {
    appName: 'spider',
    stable: {
      importMapFile: './import_map.json',
      mainFile: './src/cli.ts',
    },
    canary: {
      importMapFile: './import_map.json',
      mainFile: './cli.ts',
    },
  },
});
