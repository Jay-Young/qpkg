#!/bin/sh
SHARE_CONF=/etc/config/def_share.info
SHARE_ROOT=$(/sbin/getcfg SHARE_DEF defVolMP -d Qshare -f ${SHARE_CONF})
PUBLIC_ROOT=$(/sbin/getcfg SHARE_DEF defPublic -d Qpublic -f ${SHARE_CONF})
if [ ! -d "$SHARE_ROOT/$PUBLIC_ROOT/TMDB" ]; then
  mkdir "$SHARE_ROOT/$PUBLIC_ROOT/TMDB"
fi
SAVE_PATH="$SHARE_ROOT/$PUBLIC_ROOT/TMDB"

cd $SAVE_PATH
# 下载电影信息页面
wget -t 5 --no-check-certificate "https://www.themoviedb.org/remote/panel?panel=trending_scroller&group=today" -qO movie.html
# wget -t 5 --no-check-certificate "https://www.themoviedb.org/remote/panel?panel=trending_scroller&group=this-week" -qO movie.html
# 提取电影URL和标题
movie_url="https://www.themoviedb.org$(grep -o '<a[^>]*href="[^"]*"[^>]*>' movie.html | head -n 1 | sed 's/.*href="\([^"]*\)".*/\1/')"
title="$(grep -o '<a[^>]*title="[^"]*"[^>]*>' movie.html | head -n 1 | sed 's/.*title="\([^"]*\)".*/\1/')"
# 删除临时信息页面
rm movie.html

if [ -z "$movie_url" ]; then
  log_tool -t1 -a"[TMDB]无法找到电影URL，退出脚本。"
  echo "无法找到电影URL，退出脚本。"
  exit 1
fi
if [ -z "$title" ]; then
  log_tool -t1 -a"[TMDB]无法找到电影标题，退出脚本。"
  echo "无法找到电影标题，退出脚本。"
  exit 1
fi

# 下载背景图片信息页面
wget -t 5 --no-check-certificate "$movie_url/remote/media_panel/backdrops" -qO backdrops.html
# 提取背景图片URL
src_line="$(grep -m 1 '<img' backdrops.html | grep -o 'src="[^"]*"')"
backdrop_path="$(echo "$src_line" | sed 's/src="\([^"]*\)"/\1/')"
backdrop_original_path="${backdrop_path//w533_and_h300_bestv2/original}"
backdrop_url="https://image.tmdb.org$backdrop_original_path"
# 删除背景图片信息页面
rm backdrops.html
if [ -z "$backdrop_url" ]; then
  log_tool -t1 -a"[TMDB]无法找到背景图片URL，退出脚本。"
  echo "无法找到背景图片URL，退出脚本。"
  exit 1
fi
# 下载背景图片
wget -t 5 --no-check-certificate "$backdrop_url" -qO "$title.jpg"
cp -f "$title.jpg" /home/httpd/cgi-bin/images/login/wallpaper/bg.jpg
echo -e $title >/mnt/HDA_ROOT/.config/.qos_config/login/standard_massage.msg
