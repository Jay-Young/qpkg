#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="PlexEditionManager"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME

getcfg_path() {
  echo $(/sbin/getcfg "$1" Install_Path -f /etc/config/qpkg.conf)
}
if [ -n "$(getcfg_path Python3)" ]; then
  python3="$(getcfg_path Python3)/bin/python3"
elif [ -n "$(getcfg_path QPython39)" ]; then
  python3="$(getcfg_path QPython39)/bin/python3"
elif [ -n "$(getcfg_path QPython310)" ]; then
  python3="$(getcfg_path QPython310)/bin/python3"
elif [ -n "$(getcfg_path QPython311)" ]; then
  python3="$(getcfg_path QPython311)/bin/python3"
else
  echo "Python3 is not installed."
  /sbin/log_tool -t2 -a"[Plex Edition Manager] Python3 is not installed."
  exit 1
fi

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    $python3 $QPKG_ROOT/plex_edition_manager.py --daemon
    echo "15 3 * * * $python3 $QPKG_ROOT/plex_edition_manager.py" >> /etc/config/crontab
    crontab /etc/config/crontab && /etc/init.d/crond.sh restart
    ;;

  stop)
    sed -i "\|$QPKG_ROOT/plex_edition_manager.py|d" /etc/config/crontab
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
