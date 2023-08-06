#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="vuetorrent"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
APACHE_ROOT=`/sbin/getcfg SHARE_DEF defWeb -d Qweb -f /etc/config/def_share.info`
export QNAP_QPKG=$QPKG_NAME
QB=$(/sbin/getcfg "qBittorrent" Install_Path -f ${CONF})/qBittorrent.sh
QB_CONF=$(/sbin/getcfg "qBittorrent" Install_Path -f ${CONF})/.config/qBittorrent/qBittorrent.conf

case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi

    ${QB} stop

    # 启用本地UI文件
    if grep -q "AlternativeUIEnabled" ${QB_CONF}; then
      sed -i "/AlternativeUIEnabled/c\\WebUI\\\\AlternativeUIEnabled=true" ${QB_CONF}
    else
      echo -E "WebUI\\AlternativeUIEnabled=true" >> ${QB_CONF}
    fi

    # 设置UI文件位置
    if grep -q "RootFolder" ${QB_CONF}; then
      sed -i "/RootFolder/c\\WebUI\\\\RootFolder=${QPKG_ROOT}/vuetorrent" ${QB_CONF}
    else
      echo -E "WebUI\\RootFolder=${QPKG_ROOT}/vuetorrent" >> ${QB_CONF}
    fi

    ${QB} start
    ;;

  stop)
    ${QB} stop
    # 关闭本地UI文件
    if grep -q "AlternativeUIEnabled" ${QB_CONF}; then
      sed -i "/AlternativeUIEnabled/c\\WebUI\\\\AlternativeUIEnabled=false" ${QB_CONF}
    else
      echo -E "WebUI\\AlternativeUIEnabled=false" >> ${QB_CONF}
    fi

    ${QB} start
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
