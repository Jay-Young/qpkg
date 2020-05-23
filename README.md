# QPKG list

> Note: test passed only with QNAP TS-453Bmini, x64 based.

| App | Latest | Download | Description |
|:--|:--:|:--:|:--:|
| Code Server | | | Self-hosted third-party Visual Studio Codespaces |
| Simple Torrent | 1.2.6 | [Click](https://github.com/Jay-Young/qpkg/raw/master/simple-torrent/simpletorrent_1.2.6.qpkg) | Self-hosted remote torrent client (rebranded from Cloud Torrent) |
| KMS | 2020-03-28 | [Click](https://github.com/Jay-Young/qpkg/raw/master/kms/kms_2020-03-28.qpkg) | KMS Emulator |
| Hugo | 0.70.0 | [Click](https://github.com/Jay-Young/qpkg/raw/master/hugo/qhugo_0.70.0.qpkg) | Framework for building websites written in go |
| verysync | 1.3.5 | [Click](https://github.com/Jay-Young/qpkg/raw/master/verysync/verysync_1.3.5.qpkg) | Sync client based on P2P |
| Bing Wallpaper | 1.0 | [Click](https://github.com/Jay-Young/qpkg/raw/master/bingwallpaper/bingwallpaper_1.0.qpkg) | Automatically change QTS login screen background picture daily |

[toc]

## 1. Code Server

## 2. Simple Torrent

[Download Link](simple-torrent/simpletorrent_1.2.6.qpkg)

MD5: da36f5ca51a1791d72947f7f2f7e8fac

Source: <https://github.com/boypt/simple-torrent>

- Default folder: /share/Public/downloads, /share/Public/torrents. You can change in the WebUI settings after installed.
- Default user and password: user, ctorrent. Create env to change, AUTH=user:ctorrent

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

[Download Link](verysync/verysync_1.3.5.qpkg)

MD5: cc205b4ee6738d3ef9261551983bb2d4

Source: <http://www.verysync.com/download.html>

## 6. Bing Wallpaper

[Download Link](bingwallpaper/bingwallpaper_1.0.qpkg)

MD5: a02c10fdedbaeac6a5b9fbe616fcfcf6

Source: modified from <https://github.com/kkkgo/DSM_Login_BingWallpaper>

- First you must change the login screen setting to the first template (single picture not the photo wall) in `Control Panel - General Settings - Login Screen`
- Automatically download Bing wallpaper daily and set it as the QTS login screen background picture
- Automatically save the wallpapers in path `$Share_Folder_Path/Public/BingWallPapers`. `$Share_Folder_Path` is usually like `/share/***_DATA/`, it differs from one machine to another.
