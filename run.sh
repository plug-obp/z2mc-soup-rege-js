#!/bin/bash

pnpm install

trap "exit" INT TERM ERR
trap "kill 0" EXIT

node index.js

