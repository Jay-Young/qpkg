# ChineseSubFinder

源项目：<https://github.com/ChineseSubFinder/ChineseSubFinder>

**说明**：

自动化中文字幕下载。字幕网站支持 shooter、xunlei、arrst、a4k、SubtitleBest 。支持 Emby、Jellyfin、Plex、Sonarr、Radarr、TMM。

打包的 QPKG 依赖于 docker 运行，因此需要 `container-station >= 2.0`。如果你的媒体目录也是默认的 `Multimedia`，那么可以直接使用安装包，否则请按照源项目的教程修改配置，然后按照 <https://github.com/qnap-dev/containerized-qpkg> 的步骤自己打包后使用。

建议安装 [Portainer](https://www.myqnap.org/product/portainer/) 管理 docker 容器，因为这些打包的容器并不会出现在 Container Station 里。

![ChineseSubFinder](/chinesesubfinder/chinesesubfinder.png)

安装依赖：

- container-station >= 2.0

[v0.53.3](https://github.com/Jay-Young/qpkg/releases/tag/v0.53.3)

- MD5: c68f0e98ce102681c7f2b5310b728b0e
