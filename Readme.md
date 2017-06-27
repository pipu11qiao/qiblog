## 启动
sudo mongod -f /usr/local/bin/mongodb.conf
## 关闭 
mongo 命令下
use admin
db.shutdownServer();

## 实时追踪log
sudo tail -f /usr/local/log/mongodb.log