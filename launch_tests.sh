#!/bin/bash

source ~/.bashrc
PAGE=https://${SQUASH_DOMAIN} envsubst < test.template.js > test.js
xvfb-run testcafe --skip-js-errors firefox,chrome test.js
