#!/usr/bin/env bash
set -e
node --version
npm --version
printf '\nCheck API after starting server: curl http://127.0.0.1:4000/api/health\n'
