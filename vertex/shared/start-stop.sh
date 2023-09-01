#!/bin/sh

# QPKG Information
QPKG_NAME="vertex"
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
		# check if image exist
		STATUS=$(curl -siL http://127.0.0.1:2375/images/$docker_image/json | grep HTTP)
		if [[ ! $STATUS == *"200"* ]]; then
			cat $QPKG_DIR/docker-images/$(echo $docker_image | sed -e 's?/?-?' -e 's?:?_?').tar | $DOCKER_CMD load
		fi
	done
}

cp_cert() {
	if [ ! -f "$QPKG_DIR/vertex/data/ssl/https.crt" ]; then
		cp /etc/stunnel/backup.cert $QPKG_DIR/vertex/data/ssl/https.crt
	fi

	if [ ! -f "$QPKG_DIR/vertex/data/ssl/https.key" ]; then
		cp /etc/stunnel/backup.key $QPKG_DIR/vertex/data/ssl/https.key
	fi	
}

first_install_check() {
	if [ ! -f "$QPKG_DIR/vertex/data/password" ]; then
		echo 1
	else
		echo 2
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

		FIRST_INSTALL=$(first_install_check)
		cp_cert
		load_image
		$COMPOSE_CMD up -d
		if [ -f "$QPKG_DIR/vertex/data/password" ] && [ ${FIRST_INSTALL} == 1 ]; then
			password=$(cat $QPKG_DIR/vertex/data/password)
			/sbin/log_tool -t0 -N$QPKG_NAME -a$password
		fi
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
