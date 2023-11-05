#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="xunlei-pan"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`

mkdir -p /share/Public/迅雷/下载/
chmod -R 755 ${QPKG_ROOT}/*

rm -rf /home/httpd/cgi-bin/$QPKG_NAME
/bin/ln -sf $QPKG_ROOT/$QPKG_NAME /home/httpd/cgi-bin
export QNAP_QPKG=$QPKG_NAME
export DownloadPATH=/share/Public/迅雷/下载/
export ConfigPath=/share/Public/迅雷/
export DriveListen=127.0.0.1:21066
export DriveLauncherAddress="unix://${QPKG_ROOT}/bin/pan-cli-launcher.sock"
export drive_loglevel=info
export PLATFORM=qnap
export NAS_ID=qnap
export LOGF=$QPKG_ROOT/pan-cli.log
export PIDF=$QPKG_ROOT/pan-cli.pid
export PluginPATH=$ConfigPath

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    : ADD START ACTIONS HERE
    cd $QPKG_ROOT

    disable_pan_cli=xunlei_disable_pan_cli_auth
    PLATFORM=$PLATFORM \
    DownloadPATH=$DownloadPATH \
    ConfigPath=$ConfigPath \
    DriveListen=$DriveListen \
    drive_loglevel=$drive_loglevel \
    ./xunlei-pan-cli.sh -logfile $LOGF -pid ${PIDF} -launcher_listen=${DriveLauncherAddress}  &


    ;;

  stop)
    : ADD STOP ACTIONS HERE

        APP_NAME=xunlei-pan-cli
        pids=`ps -ef | grep "${APP_NAME}" | grep -v grep | awk '{ printf $1 " " }'`
        echo $pids
        if [ -n "${pids}" ]; then
            kill -9 ${pids}
        fi

    ;;

  restart)
    $0 stop
    $0 start
    ;;

  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
esac

exit 0
