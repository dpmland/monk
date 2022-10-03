// Copyright © 2022 Dpm Land. All Rights Reserved.
import * as colors from 'https://deno.land/std@0.158.0/fmt/colors.ts';
import { join } from 'https://deno.land/std@0.158.0/path/mod.ts';
import { dracoFiles } from 'https://deno.land/x/draco@0.1.3/mod.ts';

export async function Run(command: string) {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const run = Deno.run({
    cmd: cmd,
    stdout: 'piped',
    stderr: 'piped',
  });

  const { code } = await run.status();

  // Piped outs
  const rawErr = await run.stderrOutput();

  if (code !== 0) {
    console.error(
      `The command was not executed correctly:\n${
        colors.dim(command)
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(rawErr)))
      }`,
    );
    Deno.exit(code);
  }
}

export const TEMP = join(Deno.makeTempDirSync(), '.monk');

export const BIN = join(dracoFiles.homeDir()!, '.deno', 'bin');
