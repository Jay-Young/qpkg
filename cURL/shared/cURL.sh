#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="cURL"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME
cURL_PATH=$(which curl)

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    if [ -f "$cURL_PATH" ]; then
      cp -f "$cURL_PATH" "$QPKG_ROOT/curl-qnap.bak"
      cp -f "$QPKG_ROOT/curl" "$cURL_PATH"
      chmod +x "$cURL_PATH"
    fi
    ;;

  stop)
    if [ -f "$QPKG_ROOT/curl-qnap.bak" ]; then
      cp -f "$QPKG_ROOT/curl-qnap.bak" "$cURL_PATH"
      chmod +x "$cURL_PATH"
    fi
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
