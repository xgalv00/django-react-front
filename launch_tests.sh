#!/bin/bash

source ~/.bashrc
PAGE=https://${SQUASH_DOMAIN}/ envsubst < test.template.js > test.js
xvfb-run testcafe firefox,chrome test.js
