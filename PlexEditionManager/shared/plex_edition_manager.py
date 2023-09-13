#!/usr/bin/python3
# -*- coding: utf-8 -*-
import os
import re
import json
import subprocess
import xml.etree.ElementTree as ET
from plexapi.server import PlexServer


def run_shell(cmd):
    result = subprocess.run(
        cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
    )
    return result


# 获取 token
def get_token():
    # 获取 Plex Media Server 安装位置
    result = run_shell(
        "/sbin/getcfg PlexMediaServer Install_Path -f /etc/config/qpkg.conf"
    )
    if result.returncode == 0:
        preferences_path = os.path.abspath(
            result.stdout.strip() + "/Library/Plex Media Server/Preferences.xml"
        )
        if os.path.exists(preferences_path):
            # 从 Preferences.xml 读取 token
            tree = ET.parse(preferences_path)
            root = tree.getroot()
            plex_online_token = root.get("PlexOnlineToken")
            if plex_online_token:
                print("PlexOnlineToken:", plex_online_token)
                return plex_online_token
            else:
                print("PlexOnlineToken 获取失败")
                run_shell("/sbin/log_tool -t2 -a'[Plex Edition Manager] PlexOnlineToken 获取失败。'")
                return None
        else:
            print("Preferences.xml文件不存在")
            run_shell(
                "/sbin/log_tool -t2 -a'[Plex Edition Manager] Preferences.xml 文件不存在。'"
            )
            return None
    else:
        print(result.stderr)
        run_shell(
            "/sbin/log_tool -t2 -a'[Plex Edition Manager] 获取 Plex Media Server 安装路径失败。'"
        )
        return None


# 获取所有电影
def get_movies(server):
    movies = []
    for library in server.library.sections():
        if library.type == "movie":
            movies.extend(library.all())
    return movies


# 判断版本
def get_edition(filename):
    filename = filename.upper()
    if re.search(r"\b(REMUX|BDREMUX|BD-REMUX)\b", filename):
        edition = "REMUX"
    elif re.search(r"\b(BLURAY|BD|BLU-RAY|BD1080P)\b", filename):
        edition = "BD"
    elif re.search(r"\bBDRIP\b", filename):
        edition = "BDRIP"
    elif re.search(r"\bWEB-DL|WEBDL\b", filename):
        edition = "WEB-DL"
    elif re.search(r"\bWEBRIP\b", filename):
        edition = "WEBRIP"
    elif re.search(r"\bHR-HDTV|HRHDTV\b", filename):
        edition = "HR-HDTV"
    elif re.search(r"\bHDTV\b", filename):
        edition = "HDTV"
    elif re.search(r"\bHDRIP\b", filename):
        edition = "HDRIP"
    elif re.search(r"\bDVDRIP\b", filename):
        edition = "DVDRIP"
    elif re.search(r"\bDVDSCR\b", filename):
        edition = "DVDSCR"
    elif re.search(r"\bDVD\b", filename):
        edition = "DVD"
    elif re.search(r"\bHDTC\b", filename):
        edition = "HDTC"
    elif re.search(r"\bTC\b", filename):
        edition = "TC"
    elif re.search(r"\b(HQCAM|HQ-CAM)\b", filename):
        edition = "HQCAM"
    elif re.search(r"\bCAM\b", filename):
        edition = "CAM"
    elif re.search(r"\bTS\b", filename):
        edition = "TS"
    else:
        edition = None

    if edition and (re.search(r"\bDOVI\b", filename) or re.search(r"\bDV\b", filename)):
        edition += " · DV"

    return edition


# 更新电影信息
def update_movie(movie, edition):
    existing_edition = movie.editionTitle
    if not existing_edition and edition:
        movie.editEditionTitle(edition)
        print(f'Updated Edition for movie "{movie.title}" to {edition}')
        return True
    else:
        return False


def main():
    # 获取用户名、密码和服务器名称
    baseurl = "http://localhost:32400"
    token = get_token()
    if token:
        server = PlexServer(baseurl, token)

        # 获取所有电影并更新信息
        movies = get_movies(server)
        count = 0
        for movie in movies:
            media_parts = movie.media[0].parts
            if media_parts and media_parts[0].file:
                file_path = media_parts[0].file
                file_name = os.path.basename(file_path)
                edition = get_edition(file_name)
                if update_movie(movie, edition):
                    count += 1

        print()
        print(f"Total updated: {count}")
        run_shell(f"/sbin/log_tool -t0 -a'[Plex Edition Manager] 更新数量：{count}'")
    else:
        print("未获取到 token，请检查配置文件")
        run_shell("/sbin/log_tool -t2 -a'[Plex Edition Manager] 未获取到 token，请检查配置文件。'")
        exit(1)


if __name__ == "__main__":
    main()
