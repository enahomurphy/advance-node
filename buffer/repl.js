const { start, REPL_MODE_STRICT } = require('repl');

repl = start({
  ignoreUndefined: true,
  replMode: REPL_MODE_STRICT
});

repl.context.lodash = require('lodash');