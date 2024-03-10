#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="BililiveRecorder"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME

VolMP_ROOT=$(/sbin/getcfg SHARE_DEF defVolMP -f /etc/config/def_share.info)
if [ -d "$VolMP_ROOT/Download/BililiveRecorder" ]; then
  workdir="$VolMP_ROOT/Download/BililiveRecorder"
else
  /sbin/log_tool -t2 -a"[B站录播姬] 未找到工作目录，请手动创建。"
  exit 1
fi

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    cd "$QPKG_ROOT/bin"
    if [ -f "/etc/stunnel/stunnel.pem" ]; then
      ./BililiveRecorder.Cli run --bind "https://*:8923" --http-basic-user "qnap" --http-basic-pass "$HOSTNAME" --cert-pem-path "/etc/stunnel/stunnel.pem" --cert-key-path "/etc/stunnel/stunnel.pem" "$workdir" &
    else
      ./BililiveRecorder.Cli run --bind "http://*:8923" --http-basic-user "qnap" --http-basic-pass "$HOSTNAME" "$workdir" &
    fi
    ;;

  stop)
    pid=$(lsof -i:8923 | awk '{print $2}' | grep -v PID)
    if [ -n "$pid" ]; then
      kill -9 "$pid"
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
