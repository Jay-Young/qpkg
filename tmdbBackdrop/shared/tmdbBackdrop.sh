#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="tmdbBackdrop"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME

SHARE_CONF=/etc/config/def_share.info
SHARE_ROOT=$(/sbin/getcfg SHARE_DEF defVolMP -d Qshare -f ${SHARE_CONF})
PUBLIC_ROOT=$(/sbin/getcfg SHARE_DEF defPublic -d Qpublic -f ${SHARE_CONF})
if [ ! -d "$SHARE_ROOT/$PUBLIC_ROOT/TMDB" ]; then
  mkdir "$SHARE_ROOT/$PUBLIC_ROOT/TMDB"
fi
SAVE_PATH="$SHARE_ROOT/$PUBLIC_ROOT/TMDB"

backup_bg() {
  if [ ! -f "$SAVE_PATH/bg.jpg" ]; then
    cp -f /home/httpd/cgi-bin/images/login/wallpaper/bg.jpg "$SAVE_PATH/bg.jpg"
  fi
}

restore_bg() {
  if [ -f "$SAVE_PATH/bg.jpg" ]; then
    cp -f "$SAVE_PATH/bg.jpg" /home/httpd/cgi-bin/images/login/wallpaper/bg.jpg
    >/mnt/HDA_ROOT/.config/.qos_config/login/standard_massage.msg
    rm "$SAVE_PATH/bg.jpg"
  fi
}

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    cd $QPKG_ROOT
    backup_bg
    sh tmdb.sh
    echo "0 7 * * * $QPKG_ROOT/tmdb.sh" >> /etc/config/crontab
    crontab /etc/config/crontab && /etc/init.d/crond.sh restart
    ;;

  stop)
    sed -i "\|${QPKG_ROOT}/tmdb.sh|d" /etc/config/crontab
    crontab /etc/config/crontab && /etc/init.d/crond.sh restart
    restore_bg
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
