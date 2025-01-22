#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="certimate"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    cd $QPKG_ROOT
    ./certimate serve --http "0.0.0.0:8933" &
    ;;

  stop)
    # 停止 certimate 进程
    lsof -i:8933 | awk '{print $2}' | grep -v PID | xargs -I {} kill -9 {}
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
