#!/bin/sh
echo "Blog back stoping..."
pm2 describe blog-back > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  echo "Blog back is not running"
else
  pm2 stop blog-back
  pm2 delete blog-back
fi;
