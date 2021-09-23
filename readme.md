# Nodejs DI with ECMAScript Modules (ESM)

## What is this?

A DI/IoC Container like [Electrolyte](https://github.com/jaredhanson/electrolyte) indirectly support things like mapping to different implementations, like loading a stub instead of a real implementation when you're in 'development mode' during local testing. The disadvantage of Electrolyte is that it requires a specific way to write your modules, exporting a `factory` function and specifying dependencies via `exports['@require'] = [...]`. This all does not support ECMAScript Modules.

This repo is a playground to see whether it's possible to gain the same features and advantages of a DI container framework and dependency mapper like [electrolyte-assembly-mapper](https://github.com/branneman/electrolyte-assembly-mapper), without needing a framework, while using ECMAScript Modules in a Node.js application.

Since ECMAScript Modules are an experimental feature in Node.js 14 LTS and 16, use with caution. I have tested this only on Node v14.17.6 and Linux, but I expect it to work on v16, macOS, and Windows as well.

Via a [Module Loaders `resolve()`](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#esm_resolve_specifier_context_defaultresolve) hook, mapping is done for all `import`s starting with `app/` ([src](https://github.com/branneman/nodejs-esm-di/blob/main/di-loader.js)), and all relative paths in the current directory starting with `./`.

The `di-mapping.json` file will instruct the Loader to map to the stub implementation of `my-module`:

```json
{
  "app/lib/my-module": "app/lib/my-module.stub"
}
```

So this `import` statement will instead load the file `./app/lib/my-module.stub.js`:

```js
import fn from 'app/lib/my-module'
```

It supports a sorthand syntax for `app/`-prefixed strings, so the awkward `../../../`-pattern is avoided. It also supports mapping local relative file paths:

```js
import { numberAscending } from './app/util/sort.js'
```

## How do I test it?

Running `node index.js` or `npx jest .` directly doesn't work for this setup, so use `npm start` and `npm test` instead:

- Node.js needs to be started with `--experimental-loader ./di-loader.js`.
- Jest needs to be started with `--experimental-vm-modules`, see documentation.

See [`package.json`](https://github.com/branneman/nodejs-esm-di/blob/main/package.json) for implementation.
