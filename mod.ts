// Copyright © 2022 Dpm Land. All Rights Reserved.

import { CompileApp } from './src/compiler.ts';
import { MoveTheBinary } from './src/copy.ts';
import figlet from 'https://x.nest.land/deno-figlet@0.0.5/mod.js';
import * as colors from 'https://deno.land/std@0.158.0/fmt/colors.ts';
/*
* Add the Types for the Params in the Function!
**/

interface MonkTypes {
  versions: {
    downloadVersion: 'canary' | 'stable';
    canary: {
      url: string;
      branch: string;
    };
    stable: {
      url: string;
      branch: string;
    };
  };
  files: {
    appName: string;
    stable: {
      importMapFile: string;
      mainFile: string;
    };
    canary: {
      importMapFile: string;
      mainFile: string;
    };
  };
  social?: {
    github?: string;
    discord?: string;
    errors?: string;
  };
}

/**
 * Make the Monk Setup Function
 */

export async function Monk(options: MonkTypes) {
  console.log(
    colors.cyan(colors.dim('Made with Monk: github.com/dpmland/monk')),
  );
  console.log(
    colors.brightGreen(
      await figlet(`${options.files.appName.toLowerCase()}`),
    ),
  );

  await CompileApp({
    typeInstall: options.versions.downloadVersion,
    stableURL: options.versions.stable.url,
    stableBranch: options.versions.stable.branch,
    canaryURL: options.versions.canary.url,
    canaryBranch: options.versions.canary.branch,
    files: {
      stable: {
        importMapFile: options.files.stable.importMapFile,
        mainFile: options.files.stable.mainFile,
        fileOut: options.files.appName,
      },
      canary: {
        importMapFile: options.files.canary.importMapFile,
        mainFile: options.files.canary.mainFile,
        fileOut: options.files.appName,
      },
    },
  });

  await MoveTheBinary({
    version: options.versions.downloadVersion,
    appName: options.files.appName,
    files: {
      compiledFilename: options.files.appName,
    },
  });

  if (typeof options.social != 'undefined') {
    console.log(
      colors.bold(
        colors.brightGreen('Done! If you want know more check this links!!'),
      ),
    );
    console.log(`GitHub: ${colors.underline(options.social?.errors!)}`);
    console.log(`Issue: ${colors.underline(options.social?.errors!)}`);
    console.log(`Discord: ${colors.underline(options.social?.discord!)}`);
  }
}
