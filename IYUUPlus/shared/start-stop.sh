#!/bin/sh

QPKG_NAME="IYUUPlus"
QPKG_CONF=/etc/config/qpkg.conf
QPKG_DIR=$(/sbin/getcfg $QPKG_NAME Install_Path -f $QPKG_CONF)
QCS_NAME="container-station"
QCS_QPKG_DIR=$(/sbin/getcfg $QCS_NAME Install_Path -f $QPKG_CONF)
QPKG_PROXY_FILE=/etc/container-proxy.d/$QPKG_NAME
DOCKER_IMAGES=$(cat $QPKG_DIR/docker-images/DOCKER_IMAGES)

DOCKER_CMD=$QCS_QPKG_DIR/bin/system-docker
COMPOSE_CMD=$QCS_QPKG_DIR/bin/system-docker-compose

load_image() {
	for docker_image in $DOCKER_IMAGES; do
		STATUS=$(curl -siL http://127.0.0.1:2375/images/$docker_image/json | grep HTTP)
		if [[ ! $STATUS == *"200"* ]]; then
			cat $QPKG_DIR/docker-images/$(echo $docker_image | sed -e 's?/?-?' -e 's?:?_?').tar | $DOCKER_CMD load
		fi
	done
}

modify_compose() {
  err_log() {
    local write_msg="/sbin/log_tool -t2 -NIYUUPlus -G'Docker Compose' -uSystem -p127.0.0.1 -mlocalhost -a"
    [ -n "$1" ] && echo "$1" && $write_msg "$1"
  }
  getcfg_path() {
    echo $(/sbin/getcfg "$1" Install_Path -f /etc/config/qpkg.conf)
  }
  isEnable() {
    echo $(/sbin/getcfg "$1" Enable -f /etc/config/qpkg.conf)
  }

  if [ -f "$QPKG_DIR/docker-compose.yml" ]; then
    if [ "$(isEnable qBittorrent)" == "TRUE" ]; then
      sed -i "s#- /BT_backup:/BT_backup#- $(getcfg_path qBittorrent)/.local/share/qBittorrent/BT_backup:/BT_backup#" "$QPKG_DIR/docker-compose.yml"
      if ! grep -q qBittorrent "$QPKG_DIR/docker-compose.yml"; then
        err_log "[IYUUPlus] qBittorrent 种子文件夹映射失败。"
      fi
    fi
    if [ "$(isEnable QTransmission3)" == "TRUE" ]; then
      sed -i "s#- /torrents:/torrents#- $(getcfg_path QTransmission3)/etc/torrents:/torrents#" "$QPKG_DIR/docker-compose.yml"
      if ! grep -q QTransmission3 "$QPKG_DIR/docker-compose.yml"; then
        err_log "[IYUUPlus] QTransmission3 种子文件夹映射失败。"
      fi
    elif [ "$(isEnable Transmission4)" == "TRUE" ]; then
      sed -i "s#- /torrents:/torrents#- $(getcfg_path Transmission4)/etc/torrents:/torrents#" "$QPKG_DIR/docker-compose.yml"
      if ! grep -q Transmission4 "$QPKG_DIR/docker-compose.yml"; then
        err_log "[IYUUPlus] Transmission4 种子文件夹映射失败。"
      fi
    elif [ "$(isEnable MTransmission3)" == "TRUE" ]; then
      sed -i "s#- /torrents:/torrents#- $(getcfg_path MTransmission3)/etc/torrents:/torrents#" "$QPKG_DIR/docker-compose.yml"
      if ! grep -q MTransmission3 "$QPKG_DIR/docker-compose.yml"; then
        err_log "[IYUUPlus] MTransmission3 种子文件夹映射失败。"
      fi
    fi
  fi
}

cd $QPKG_DIR

case "$1" in
	start)
		ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $QPKG_CONF)
		if [ "$ENABLED" != "TRUE" ]; then
			echo "$QPKG_NAME is disabled."
			exit 1
		fi

		modify_compose
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
esac

exit 0
