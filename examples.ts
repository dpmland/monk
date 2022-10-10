// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Monk } from './mod.ts';

await Monk({
  versions: {
    downloadVersion: 'stable', // Here you can add the version for download only canary or stable!
    stable: {
      url: 'https://github.com/dpmland/dpm', // Here you add the url and branch for the stable and canary
      branch: 'main',
    },
    canary: {
      url: 'https://github.com/dpmland/dpm',
      branch: 'dev',
    },
  },
  files: {
    appName: 'dpm', // With this name compile the app into a binary!
    stable: {
      importMapFile: './import_map.json', // This route is necessary for the compilation!
      mainFile: './dpm.ts',
    },
    canary: {
      importMapFile: './import_map.json',
      mainFile: './dpm.ts',
    },
  },

  // OPTIONAL
  social: {
    github: 'https://github.com/dpmland/dpm', // The GitHub Repo for more information!
    discord: 'https://discord.com/invite/Um27YPJKud', // The Discord Server for more information!
    errors: 'https://github.com/dpmland/dpm/issues', // The issues route for the bugs!
  },
});
