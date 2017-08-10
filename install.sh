#!/bin/bash
mkdir -p /monitor
cd /monitor/public && npm i --silent
cd /monitor/public && npm run build
cd /monitor
npm start