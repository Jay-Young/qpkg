#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="qvscode"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
SHARE_ROOT=$(/sbin/getcfg SHARE_DEF defVolMP -d Qshare -f /etc/config/def_share.info)
export QNAP_QPKG=$QPKG_NAME

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    # create user data directory
    if [ ! -d "$SHARE_ROOT/code-server" ]; then
      mkdir -p $SHARE_ROOT/code-server
    fi
    # define config file
    # export CODE_SERVER_CONFIG=$QPKG_ROOT/config/config.yaml
    # start code-server
    chmod -R +x $QPKG_ROOT
    cd $QPKG_ROOT/bin
    ./code-server --user-data-dir $SHARE_ROOT/code-server --config $QPKG_ROOT/config.yaml &
    ;;

  stop)
    #lsof -i:8080 | awk '{print $2}' >pidfile
    #pid=$(awk 'NR==2{print}' pidfile)
    #kill -9 "$pid"
    #rm -rf pidfile
    pid=$(ps ax|grep qvscode|grep config.yaml|grep -v grep|awk '{print $1}')
    if [ -n "$pid" ]; then
      kill $pid
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
