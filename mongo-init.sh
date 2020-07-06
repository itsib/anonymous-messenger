#!/bin/bash
set -e

mongo <<EOF
use admin

db = db.getSiblingDB('$MONGO_INITDB_DATABASE');

db.createUser({
  user:  '$MONGO_INITDB_DATABASE_USERNAME',
  pwd: '$MONGO_INITDB_DATABASE_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF
