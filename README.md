# node-backup-folder
Backups a folder by compressing it first and than copies the comprresed folder to another destination

Usage:
```javascript
var folder = path.join('tmp', 'backupthis');
var to = path.join('tmp', 'backup');

backupFolder(folder, to);
```