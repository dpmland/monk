// Copyright © 2022 Dpm Land. All Rights Reserved.

import { CompileApp } from './src/compiler.ts';

await CompileApp({
  typeInstall: 'canary',
  stableURL: 'https://github.com/TeoDev1611/octorg',
  stableBranch: 'main',
  canaryURL: 'https://github.com/TeoDev1611/spider',
  canaryBranch: 'main',
  files: {
    stable: {
      importMapFile: './import_map.json',
      mainFile: './cli.ts',
      fileOut: 'octorg',
    },
    canary: {
      importMapFile: './import_map.json',
      mainFile: './src/cli.ts',
      fileOut: 'spider',
    },
  },
});
