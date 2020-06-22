# QPKG list

> Note: test passed only with QNAP TS-453Bmini, x64 based.

| App            |   Latest   |                                            Download                                            |                           Description                            |
| :------------- | :--------: | :--------------------------------------------------------------------------------------------: | :--------------------------------------------------------------: |
| Code Server    |   3.4.0    |      [Click](https://github.com/Jay-Young/qpkg/raw/master/code-server/qvscode_3.4.0.qpkg)      |         Self-hosted third-party Visual Studio Codespaces         |
| Simple Torrent |   1.2.10   | [Click](https://github.com/Jay-Young/qpkg/raw/master/simple-torrent/simpletorrent_1.2.10.qpkg) | Self-hosted remote torrent client (rebranded from Cloud Torrent) |
| KMS            | 2020-03-28 |         [Click](https://github.com/Jay-Young/qpkg/raw/master/kms/kms_2020-03-28.qpkg)          |                           KMS Emulator                           |
| Hugo           |   0.70.0   |          [Click](https://github.com/Jay-Young/qpkg/raw/master/hugo/qhugo_0.70.0.qpkg)          |          Framework for building websites written in go           |
| verysync       |   1.4.4    |       [Click](https://github.com/Jay-Young/qpkg/raw/master/verysync/verysync_1.4.4.qpkg)       |                     Sync client based on P2P                     |
| Bing Wallpaper |    1.0     |   [Click](https://github.com/Jay-Young/qpkg/raw/master/bingwallpaper/bingwallpaper_1.0.qpkg)   |  Automatically change QTS login screen background picture daily  |
| QRBTF          |  9458081   |         [Click](https://github.com/Jay-Young/qpkg/raw/master/qrbtf/qrbtf_9458081.qpkg)         |       QRBTF is a simple web app to beautify your QR code.        |

<!-- TOC -->

- [QPKG list](#qpkg-list)
  - [1. Code Server](#1-code-server)
  - [2. Simple Torrent](#2-simple-torrent)
    - [1.2.6](#126)
    - [1.2.10](#1210)
  - [3. KMS](#3-kms)
  - [4. Hugo](#4-hugo)
  - [5. verysync](#5-verysync)
    - [1.4.4](#144)
    - [1.3.5](#135)
  - [6. Bing Wallpaper](#6-bing-wallpaper)
  - [7. QRBTF](#7-qrbtf)
    - [9458081](#9458081)
    - [4452d3a](#4452d3a)
    - [d42a40b](#d42a40b)

## 1. Code Server

Source: <https://github.com/cdr/code-server>

[Download Link](code-server/qvscode_3.4.0.qpkg)

MD5: 40ada9e834005201a38c601f0bb5dcfb

- Default port: 8080, default password: codeserver, default user data directory: `/share/***_DATA/.code-server/`
- You can change the port and password in the config file(`/share/***_DATA/.qpkg/qvscode/config/config.yaml`), after that, just restart the app to apply the config.
- So far, you can not change the user data directory, because the `user-data-dir` option is still not working in the `config.yaml`.
- if `/etc/stunnel/stunnel.pem` exists, copy the file to QPKG cert directory and start with ssl secure. If `/etc/stunnel/stunnel.pem` renewed, restart the app to update the cert.

## 2. Simple Torrent

Source: <https://github.com/boypt/simple-torrent>

### 1.2.6

[Download Link](simple-torrent/simpletorrent_1.2.6.qpkg)

MD5: da36f5ca51a1791d72947f7f2f7e8fac

- Default folder: `/share/***_DATA/Public/downloads`, `/share/***_DATA/Public/torrents`. You can change in the WebUI settings after installed.
- Default user and password: user, ctorrent. Create env to change, AUTH=user:ctorrent

### 1.2.10

[Download Link](simple-torrent/simpletorrent_1.2.10.qpkg)

MD5: ea8eb3399b2f62c466e3cf20aac8aa9f

- Default folder: `/opt/downloads`, `/opt/torrents`. You can change in the WebUI settings after installed.
- Default user and password: user, ctorrent. Create env to change, AUTH=user:ctorrent
- if `/etc/stunnel/stunnel.pem` exists, copy the file to QPKG install root and start with ssl secure. If `/etc/stunnel/stunnel.pem` renewed, restart the app to update the cert.
- This version contains `386, amd64, armv5, armv6, armv7, arm64` all binaries, the install script will automatically check the machine architecture to choose the correct version.

## 3. KMS

[Download Link](kms/kms_2020-03-28.qpkg)

MD5: 8d40ac6cdf60331f89deb4e584c8d5d7

Source: <https://github.com/Wind4/vlmcsd>

## 4. Hugo

[Download Link](hugo/qhugo_0.70.0.qpkg)

MD5: f89d487a8417fccc95d360500bd674dd

Source: <https://github.com/gohugoio/hugo>

**Attension**: GLIBCXX_3.4.21 required, so it will automatically download and install CodexPack (CodexPack_4.7.0.2_x86_64_20191031.qpkg) if not installed. You can install the latest CodexPack manually by yourself.

## 5. verysync

Source: <http://releases.verysync.com/releases>

### 1.4.4

[Download Link](verysync/verysync_1.4.4.qpkg)

MD5: c77ea6b3a94f84de20ee594312b5330d

### 1.3.5

[Download Link](verysync/verysync_1.3.5.qpkg)

MD5: cc205b4ee6738d3ef9261551983bb2d4

## 6. Bing Wallpaper

[Download Link](bingwallpaper/bingwallpaper_1.0.qpkg)

MD5: a02c10fdedbaeac6a5b9fbe616fcfcf6

Source: modified from <https://github.com/kkkgo/DSM_Login_BingWallpaper>

- First you must change the login screen setting to the first template (single picture not the photo wall) in `Control Panel - General Settings - Login Screen`
- Automatically download Bing wallpaper daily and set it as the QTS login screen background picture
- Automatically save the wallpapers in path `$Share_Folder_Path/Public/BingWallPapers`. `$Share_Folder_Path` is usually like `/share/***_DATA/`, it differs from one machine to another.

## 7. QRBTF

Source: <https://github.com/ciaochaos/qrbtf>

### 9458081

[Download Link](qrbtf/qrbtf_9458081.qpkg)

MD5: 270a49bc8aa1487cb06828e3c82373e8

### 4452d3a

[Download Link](qrbtf/qrbtf_4452d3a.qpkg)

MD5: a0a9db6e7ec74c2c229f36596bc220c0

### d42a40b

[Download Link](qrbtf/qrbtf_d42a40b.qpkg)

MD5: 61c7f314afa0140e83d07def81a3c69f
