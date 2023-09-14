#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="pmsautoupdate"
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
    echo "0 1 * * * $QPKG_ROOT/update.sh >/dev/null 2>&1" >> /etc/config/crontab
    crontab /etc/config/crontab && /etc/init.d/crond.sh restart
    ;;

  stop)
    sed -i "\|${QPKG_ROOT}/update.sh|d" /etc/config/crontab
    crontab /etc/config/crontab && /etc/init.d/crond.sh restart
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
