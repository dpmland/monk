// Copyright © 2022 Dpm Land. All Rights Reserved.
import * as colors from 'https://deno.land/std@0.195.0/fmt/colors.ts';
import { join } from 'https://deno.land/std@0.195.0/path/mod.ts';
import * as dir from 'https://deno.land/x/dir@1.5.1/mod.ts';

export async function Run(command: string) {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const run = new Deno.Command(cmd[0], { args: cmd.slice(1) });

  const result = await run.output();

  if (result.code !== 0) {
    console.error(
      `The command was not executed correctly:\n${
        colors.dim(command)
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(result.stderr)))
      }`,
    );
    Deno.exit(result.code);
  }
}

export const TEMP = join(Deno.makeTempDirSync(), '.monk');

export const BIN = join(dir.default('home')!, '.deno', 'bin');
