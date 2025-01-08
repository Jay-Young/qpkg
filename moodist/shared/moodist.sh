#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="moodist"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME

QPKG_WebUI=$(/sbin/getcfg -f /etc/config/qpkg.conf ${QPKG_NAME} WebUI)
ML_MNT_PATH=/mnt/ext/opt
ML_CGI_PATH=/home/httpd/cgi-bin

start_webui(){
  # prepare webui
  [ ! -d ${ML_MNT_PATH}/apps ] && mkdir -p ${ML_MNT_PATH}/apps
  [ ! -L ${ML_MNT_PATH}${QPKG_WebUI} ] && ln -sf ${QPKG_ROOT}/www ${ML_MNT_PATH}${QPKG_WebUI}
  [ ! -L ${ML_CGI_PATH}${QPKG_WebUI} ] && ln -sf ${QPKG_ROOT}/www ${ML_CGI_PATH}${QPKG_WebUI}
}

stop_webui(){
  # remove webui
  [ -L ${ML_MNT_PATH}${QPKG_WebUI} ] && rm -rf ${ML_MNT_PATH}${QPKG_WebUI}
  [ -L ${ML_CGI_PATH}${QPKG_WebUI} ] && rm -rf ${ML_CGI_PATH}${QPKG_WebUI}
}

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    start_webui
    ;;

  stop)
    stop_webui
    ;;

  restart)
    $0 stop
    $0 start
    ;;
  remove)
    ;;

  *)
    echo "Usage: $0 {start|stop|restart|remove}"
    exit 1
esac

exit 0
