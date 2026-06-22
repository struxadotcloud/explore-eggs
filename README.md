<div align="center">

# explore-eggs

**A static browser for Pterodactyl egg definitions.**
Fetches, categorizes, and serves all official eggs — built for the Struxa ecosystem.

<br />

![GitHub Stars](https://www.shieldcn.dev/github/stars/struxadotcloud/explore-eggs.svg?variant=secondary&size=sm)
![Last commit](https://www.shieldcn.dev/github/last-commit/struxadotcloud/explore-eggs.svg?variant=secondary&size=sm)
![Open issues](https://www.shieldcn.dev/github/open-issues/struxadotcloud/explore-eggs.svg?variant=secondary&size=sm)
![License · MIT](https://www.shieldcn.dev/badge/License-MIT-000000.svg?variant=secondary&size=sm)

![Package mgr · Bun](https://www.shieldcn.dev/badge/Package_mgr-Bun-000000.svg?logo=bun&variant=branded&size=sm)
![Language · TypeScript](https://www.shieldcn.dev/badge/Language-TypeScript-3178C6.svg?logo=typescript&variant=branded&size=sm)
![Framework · Next.js](https://www.shieldcn.dev/badge/Framework-Next.js-000000.svg?logo=nextdotjs&variant=branded&size=sm)

<img src="https://static.struxa.cloud/social/og.jpeg" alt="Eggs Explorer preview" width="860" />

</div>

<br />

Eggs Explorer is a fully static site that indexes all official [Pterodactyl](https://pterodactyl.io) egg definitions across three categories — applications, games, and generic utilities. Data is fetched from the official repos on a daily schedule via GitHub Actions and baked into the build at compile time.

## Sources

| Repo | Category |
|---|---|
| [pterodactyl/application-eggs](https://github.com/pterodactyl/application-eggs) | Applications |
| [pterodactyl/game-eggs](https://github.com/pterodactyl/game-eggs) | Games |
| [pterodactyl/generic-eggs](https://github.com/pterodactyl/generic-eggs) | Generic |

## Development

Fetch latest egg data (requires a GitHub token):

```bash
GITHUB_TOKEN=your_token bun run fetch-eggs
```

Start the dev server:

```bash
bun run dev
```

Build the static site:

```bash
bun run build
```

Output is written to `out/` and can be served from any static host.

## Related repositories

| Repository | Description |
|---|---|
| [struxadotcloud/struxa](https://github.com/struxadotcloud/struxa) | Main panel — web UI, API, database |
| [struxadotcloud/wings](https://github.com/struxadotcloud/wings) | Node agent — server lifecycle, file management, SFTP |
| [struxadotcloud/explore-eggs](https://github.com/struxadotcloud/explore-eggs) | This repo — egg browser |

## License

[MIT](./LICENSE)

<br />

<div align="center">

<sub>Copyright (c) Disaster Limited</sub>

</div>
