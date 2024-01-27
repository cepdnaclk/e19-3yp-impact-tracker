#!/bin/bash

cd

# Check if backendserver is running
if pm2 describe backendserver &> /dev/null; then
    # If running, restart it
    pm2 restart backendserver
else
    # If not running, start a new instance
    pm2 start ./dist/index.js --name backendserver
fi
