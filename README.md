# monk :mage: :monkey:

---

Do you want generate a installer for your app use this!!

## Usage and Installation

### Installation

`dpm install monk` or with **dpm +0.2.0** you can use `dpm bundle installer`

Or import like:

```ts
import { Monk } from 'https://deno.land/x/monk/mod.ts';
```

### Usage

```ts
import { Monk } from 'https://deno.land/x/monk/mod.ts';

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
```

## Information :book:

- **Author:** DPM LAND Authors
- **Version:** 0.1.0
- **License:** MIT

---

Made with the [Deno Package Manager](https://github.com/dpmland/dpm) Help
:sauropod: :alien:
