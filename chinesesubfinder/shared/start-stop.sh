#!/bin/sh

# change to persistent folder (otherwise in /share/CACHEDEV1_DATA/.qpkg/.tmp)
cd /tmp

# QPKG Information
QPKG_NAME="ChineseSubFinder"
QPKG_CONF=/etc/config/qpkg.conf
QPKG_DIR=$(/sbin/getcfg $QPKG_NAME Install_Path -f $QPKG_CONF)
QCS_NAME="container-station"
QCS_QPKG_DIR=$(/sbin/getcfg $QCS_NAME Install_Path -f $QPKG_CONF)
DOCKER_IMAGES=$(cat $QPKG_DIR/docker-images/DOCKER_IMAGES)

DOCKER_CMD=$QCS_QPKG_DIR/bin/system-docker
COMPOSE_CMD=$QCS_QPKG_DIR/bin/system-docker-compose

SHARE_ROOT=$(/sbin/getcfg SHARE_DEF defVolMP -f /etc/config/def_share.info)

set_docker_compose() {
	# 设置 docker-compose.yml

	compose_file="docker-compose.yml"

	if [ ! -f "$QPKG_DIR/$compose_file" ]; then
		touch "$QPKG_DIR/$compose_file"
	fi

	# 写入配置到 docker-compose.yml 文件
	cat <<EOF >"$QPKG_DIR/$compose_file"
version: '3'
services:
  chinesesubfinder:
    image: allanpk716/chinesesubfinder:latest
    volumes:
      - $QPKG_DIR/config:/config # 冒号左边请修改为你想在主机上保存配置、日志等文件的路径
      - $SHARE_ROOT/Multimedia:/media # 请修改为你的媒体目录，冒号右边可以改成你方便记忆的目录，多个媒体目录需要分别映射进来
      - $QPKG_DIR/browser:/root/.cache/rod/browser # 容器重启后无需再次下载 chrome，除非 go-rod 更新
    environment:
      - PERMS=true # 是否重设/media权限
      - TZ=Asia/Shanghai # 时区
      - UMASK=022 # 权限掩码
    restart: always
    network_mode: bridge
    hostname: chinesesubfinder
    container_name: chinesesubfinder
    ports:
      - 19035:19035 # 从0.20.0版本开始，通过webui来设置
      - 19037:19037 # webui 的视频列表读取图片用，务必设置不要暴露到外网
    logging:
      driver: 'json-file'
      options:
        max-size: '100m' # 限制docker控制台日志大小，可自行调整
EOF

	# 打印成功信息
	if [ $? -eq 0 ]; then
		/sbin/log_tool -t0 -N $QPKG_NAME -G "应用安装" -a "docker-compose.yml 文件配置完成。"
	else
		/sbin/log_tool -t1 -N $QPKG_NAME -G "应用安装" -a "docker-compose.yml 文件配置未完成，已按照默认配置启动应用，可能不适用，请检查。"
	fi

}

load_image() {
	for docker_image in $DOCKER_IMAGES; do
		# check if image exist
		STATUS=$(curl -siL http://127.0.0.1:2375/images/$docker_image/json | grep HTTP)
		if [[ ! $STATUS == *"200"* ]]; then
			cat $QPKG_DIR/docker-images/$(echo $docker_image | sed -e 's?/?-?' -e 's?:?_?').tar | $DOCKER_CMD load
		fi
	done
}

cd $QPKG_DIR

case "$1" in
start)
	ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $QPKG_CONF)
	if [ "$ENABLED" != "TRUE" ]; then
		echo "$QPKG_NAME is disabled."
		exit 1
	fi

	set_docker_compose
	load_image
	$COMPOSE_CMD up -d
	;;
stop)
	$COMPOSE_CMD down --remove-orphans
	;;
restart)
	$0 stop
	$0 start
	;;
remove)
	$COMPOSE_CMD down --rmi all -v
	;;
*)
	echo "Usage: $0 {start|stop|restart}"
	exit 1
	;;
esac

exit 0
