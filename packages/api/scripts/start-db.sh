# Remove existing database files
rm -rf db.sqlite db.sqlite-wal db.sqlite-shm > /dev/null 2>&1
turso dev --db-file db.sqlite
