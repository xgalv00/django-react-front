#!/bin/bash

source ~/.bashrc
PAGE=https://${SQUASH_DOMAIN} envsubst < test.template.js > test.js
xvfb-run testcafe --skip-js-errors firefox test.js
xvfb-run testcafe --skip-js-errors chrome test.js
