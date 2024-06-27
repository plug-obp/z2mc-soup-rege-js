#!/bin/bash

pnpm install

trap "exit" INT TERM ERR
trap "kill 0" EXIT

# node index.js

node soup_rege_safety_mc.js ../soup-js/examples/alice-bob0.soup ../rege-js/examples/alice-bob_exclusion.rege
node soup_rege_safety_mc.js ../soup-js/examples/alice-bob1.soup ../rege-js/examples/alice-bob_exclusion.rege
node soup_rege_safety_mc.js ../soup-js/examples/alice-bob2.soup ../rege-js/examples/alice-bob_exclusion.rege

node soup_rege_safety_mc.js ../soup-js/examples/alice-bob0.soup ../rege-js/examples/no-deadlock.rege
node soup_rege_safety_mc.js ../soup-js/examples/alice-bob1.soup ../rege-js/examples/no-deadlock.rege
node soup_rege_safety_mc.js ../soup-js/examples/alice-bob2.soup ../rege-js/examples/no-deadlock.rege

node soup_rege_safety_mc.js ../soup-js/examples/alice-bob0.soup ../rege-js/examples/full-exploration.rege
node soup_rege_safety_mc.js ../soup-js/examples/alice-bob1.soup ../rege-js/examples/full-exploration.rege
node soup_rege_safety_mc.js ../soup-js/examples/alice-bob2.soup ../rege-js/examples/full-exploration.rege
