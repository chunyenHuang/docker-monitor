#!/bin/bash
# mkdir -p /monitor
git clone https://github.com/chunyenHuang/docker-monitor.git /monitor
cd /monitor/public && npm i --silent
cd /monitor/public && npm run build
cd /monitor
npm start