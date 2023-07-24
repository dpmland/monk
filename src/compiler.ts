// Copyright © 2022 Dpm Land. All Rights Reserved.

import * as colors from 'https://deno.land/std@0.195.0/fmt/colors.ts';
import { dracoFiles } from 'https://deno.land/x/draco@0.1.3/mod.ts';
import { join } from 'https://deno.land/std@0.195.0/path/mod.ts';
import { Run, TEMP } from '../src/utils.ts';

export interface CompilerOptions {
  canaryURL: string;
  canaryBranch?: string;
  typeInstall: 'canary' | 'stable';
  stableURL: string;
  stableBranch?: string;
  files: {
    canary: {
      mainFile: string;
      fileOut: string;
      importMapFile: string;
    };
    stable: {
      mainFile: string;
      fileOut: string;
      importMapFile: string;
    };
  };
}

export async function CompileApp(options: CompilerOptions) {
  console.log(
    colors.bold(
      `Installing from ${colors.dim(options.typeInstall.toUpperCase())}!`,
    ),
  );

  switch (options.typeInstall) {
    case 'canary': {
      if (dracoFiles.exists(join(TEMP, 'canary'))) {
        await Deno.remove(join(TEMP, 'canary'), { recursive: true });
        console.log(
          colors.yellow(
            `Cleaned the ${
              colors.bold(join(TEMP, 'canary').toUpperCase())
            } dir!\n`,
          ),
        );
      }

      if (
        options.canaryURL.toLowerCase().includes('github.com') ||
        options.canaryURL.toLowerCase().includes('gitlab.com')
      ) {
        await Run(
          `git clone -b ${options.canaryBranch =
            (typeof options.canaryBranch == 'undefined')
              ? 'dev'
              : options.canaryBranch} --depth=1 ${options.canaryURL} ${
            join(TEMP, 'canary')
          }`,
        );
      } else {
        console.log(
          colors.bold(
            `${colors.red('ERROR:')} Not valid URL only supported ${
              colors.dim('github.com, gitlab.com')
            }`,
          ),
        );
        Deno.exit(2);
      }

      console.log(
        colors.brightGreen(
          `Successfully downloaded the Repository! from ${
            colors.dim(options.canaryURL)
          }\n`,
        ),
      );

      console.log(
        colors.magenta(
          colors.italic('Running the Compilation with the Deno help!\n'),
        ),
      );

      await Run(
        `${Deno.execPath()} compile -A --unstable --import-map ${
          join(TEMP, 'canary', options.files.canary.importMapFile)
        } --target ${Deno.build.target} --output ${
          join(Deno.cwd(), options.files.canary.fileOut)
        } ${join(TEMP, 'canary', options.files.canary.mainFile)}`,
      );

      console.log(
        `\nSuccessfully compiled the binary as: ${
          colors.brightGreen(
            colors.bold(options.files.canary.fileOut.toUpperCase()),
          )
        }`,
      );
      break;
    }

    case 'stable': {
      if (dracoFiles.exists(join(TEMP, 'stable'))) {
        await Deno.remove(join(TEMP, 'stable'), { recursive: true });
        console.log(
          colors.yellow(
            `Cleaned the ${
              colors.bold(join(TEMP, 'stable').toUpperCase())
            } dir!\n`,
          ),
        );
      }

      if (
        options.stableURL.toLowerCase().includes('github.com') ||
        options.stableURL.toLowerCase().includes('gitlab.com')
      ) {
        await Run(
          `git clone -b ${options.stableBranch =
            (typeof options.stableBranch == 'undefined')
              ? 'dev'
              : options.stableBranch} --depth=1 ${options.stableURL} ${
            join(TEMP, 'stable')
          }`,
        );
      } else {
        console.log(
          colors.bold(
            `${colors.red('ERROR:')} Not valid URL only supported ${
              colors.dim('github.com, gitlab.com')
            }`,
          ),
        );
        Deno.exit(2);
      }

      console.log(
        colors.brightGreen(
          `Successfully downloaded the Repository! from ${
            colors.dim(options.stableURL)
          }\n`,
        ),
      );

      console.log(
        colors.magenta(
          colors.italic('Running the Compilation with the Deno help!\n'),
        ),
      );

      await Run(
        `${Deno.execPath()} compile -A --unstable --import-map ${
          join(TEMP, 'stable', options.files.stable.importMapFile)
        } --target ${Deno.build.target} --output ${
          join(Deno.cwd(), options.files.stable.fileOut)
        } ${join(TEMP, 'stable', options.files.stable.mainFile)}`,
      );

      console.log(
        `\nSuccessfully compiled the binary as: ${
          colors.brightGreen(
            colors.bold(options.files.stable.fileOut.toUpperCase()),
          )
        }`,
      );
      break;
    }
  }
}
