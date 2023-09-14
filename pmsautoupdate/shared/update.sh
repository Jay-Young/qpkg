#!/bin/sh
CONF=/etc/config/qpkg.conf
PLEX="PlexMediaServer"
PLEX_PATH=$(/sbin/getcfg $PLEX Install_Path -f ${CONF})
QPKG_NAME="pmsautoupdate"
QPKG_ROOT=$(/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF})
plex_token=$(grep -oE 'PlexOnlineToken="[^"]+"' "$PLEX_PATH/Library/Plex Media Server/Preferences.xml" | sed -E 's/PlexOnlineToken="([^"]+)"/\1/')
build="linux-$(uname -m)"
current_version=$("$PLEX_PATH/Plex Media Server" --version)
if [ -z "$current_version" ]; then
  echo "未获取到 Plex Media Server 当前版本"
  /sbin/log_tool -t2 -a"[Plex Update] 未获取到 Plex Media Server 当前版本，退出更新，请检查是否已安装。"
  exit 1
fi
response=$(curl -s 'https://plex.tv/api/downloads/5.json?channel=plexpass' -H "x-plex-token: $plex_token" --compressed)
latest_version="v$(echo $response | jq -r '.nas.QNAP.version')"
download_url=$(echo $response | jq -r ".nas.QNAP.releases[] | select(.build == \"$build\").url")
checksum=$(echo $response | jq -r ".nas.QNAP.releases[] | select(.build == \"$build\").checksum")
if [ -z "$latest_version" -o -z "$download_url" -o -z "$checksum" ]; then
  echo "从 Plex 官网获取数据失败"
  /sbin/log_tool -t2 -a"[Plex Update] 从 Plex 官网获取数据失败，请检查网络或官网数据结构是否发生变化。"
  exit 1
fi
if [ "$current_version" != "$latest_version" ]; then
  wget -q $download_url -O "$QPKG_ROOT/plex.qpkg"
  if [ -f "$QPKG_ROOT/plex.qpkg" ]; then
    if [ $(sha1sum "$QPKG_ROOT/plex.qpkg" | awk '{print $1}') == $checksum ]; then
      /sbin/qpkg_cli -m "$QPKG_ROOT/plex.qpkg"
    else
      rm -f "$QPKG_ROOT/plex.qpkg"
      echo "Plex Media Server 安装包 SHA1 值不符，退出安装。"
      /sbin/log_tool -t2 -a"[Plex Update] Plex Media Server 安装包 SHA1 值不符，退出安装。"
      exit 1
    fi
  else
    echo "Plex Media Server 安装包下载失败。"
    /sbin/log_tool -t2 -a"[Plex Update] Plex Media Server 安装包下载失败。"
    exit 1
  fi
fi
