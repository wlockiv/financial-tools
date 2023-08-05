# Financial Tools

Hobby project because I'm a nerd.

## Web Frontend (Svelte)

### Developing

Before running dev, [install the PlanetScale CLI](https://github.com/planetscale/cli#installation).

Once you've created a project and installed dependencies with `yarn`.

```bash
yarn run dev

# or start the server and open the app in a new browser tab
yarn run dev -- --open
```

### Building

To create a production version of your app:

```bash
yarn run build
```

You can preview the production build with `yarn run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Database (PlanetScale)

### List Branches

```
pscale branch list <DATABASE_NAME>
```

### Connect to a Branch

```
pscale connect <DATABASE_NAME> <BRANCH_NAME>
```

### Create a branch

```
pscale create <DATABASE_NAME> <BRANCH_NAME>
```

### Delete a branch

```
pscale create <DATABASE_NAME> <BRANCH_NAME>
```
