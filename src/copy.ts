// Copyright © 2022 Dpm Land. All Rights Reserved.

import * as colors from 'https://deno.land/std@0.158.0/fmt/colors.ts';
import { join } from 'https://deno.land/std@0.158.0/path/mod.ts';
import { BIN } from '../src/utils.ts';
import { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';
import { copy } from 'https://deno.land/std@0.158.0/fs/copy.ts';

export interface BinaryCopyOptions {
  version: 'stable' | 'canary';
  appName: string;
  files: {
    mainFile: string;
    compiledFilename: string;
  };
}

export async function MoveTheBinary(options: BinaryCopyOptions) {
  // Valid the extensions!
  /* if (
    !options.files.mainFile.endsWith('.ts') ||
    !options.files.mainFile.endsWith('.js')
  ) {
    throw new Error('Is necessary a file with an extension like .ts or .js!');
  } */
  if (options.files.compiledFilename.split('.').length != 1) {
    throw new Error('Only the filename! not extensions!!');
  }

  // Check platform and copy!
  if (dracoInfo.platform() == 'windows') {
    if (
      dracoFiles.exists(
        join(Deno.cwd(), `${options.files.compiledFilename}.exe`),
      )
    ) {
      console.log(
        colors.cyan(
          `Found the ${
            colors.bold(options.files.compiledFilename.toUpperCase())
          } executable!\n`,
        ),
      );
      console.log(colors.cyan('Copying the executable to the BIN path!\n'));
      await copy(
        `${join(Deno.cwd(), `${options.files.compiledFilename}.exe`)}`,
        `${join(BIN, `${options.files.compiledFilename}.exe`)}`,
        { overwrite: true },
      );
      console.log(
        colors.cyan(
          `Removing the ${
            colors.bold(options.files.compiledFilename.toUpperCase())
          } file from the current path!\n`,
        ),
      );
      await Deno.remove(
        `${join(Deno.cwd(), `${options.files.compiledFilename}.exe`)}`,
      );
    } else {
      console.log(
        colors.red(
          'Not found the file compiled! Re run the installer or report the error on github.\n',
        ),
      );
    }
  } else if (
    dracoInfo.platform() == 'linux' || dracoInfo.platform() == 'darwin'
  ) {
    if (dracoFiles.exists(join(Deno.cwd(), options.files.compiledFilename))) {
      console.log(
        colors.cyan(
          `Found the ${
            colors.bold(options.files.compiledFilename.toUpperCase())
          } executable!\n`,
        ),
      );
      console.log(colors.cyan('Copying the executable to the BIN path!\n'));
      await copy(
        `${join(Deno.cwd(), options.files.compiledFilename)}`,
        `${join(BIN, options.files.compiledFilename)}`,
        { overwrite: true },
      );
      console.log(
        colors.cyan(
          `Removing the ${
            colors.bold(options.files.compiledFilename.toUpperCase())
          } file from the current path!\n`,
        ),
      );
      await Deno.remove(`${join(Deno.cwd(), options.files.compiledFilename)}`);
    } else {
      console.log(
        colors.red(
          'Not found the file compiled! Re run the installer or report the error on github.\n',
        ),
      );
    }
  }
}
