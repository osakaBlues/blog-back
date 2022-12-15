#!/bin/sh
echo "Srarting blog-back..."
cd /home/ubuntu/deploy/blog-back
pm2 start yarn --name blog-back -- start:prod
