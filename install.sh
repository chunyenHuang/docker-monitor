#!/bin/bash
# git clone https://github.com/chunyenHuang/docker-monitor.git /monitor
wget https://github.com/chunyenHuang/docker-monitor/archive/master.zip -O /tmp/docker-monitor.zip
cd /tmp && unzip /tmp/docker-monitor.zip
mv /tmp/docker-monitor-master /tmp/monitor
mv /tmp/monitor /

cd /monitor/public && npm i --silent
cd /monitor/public && npm run build
cd /monitor && npm i
PORT=8080 npm start