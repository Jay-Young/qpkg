# IYUUPlus

源项目: <https://github.com/ledccn/IYUUPlus>

IYUU 自动辅种工具，目前能对国内大部分的 PT 站点自动辅种，支持下载器集群，支持多盘位，支持多下载目录，支持连接远程下载器等。

说明：

- 适配 QPKG 版本的 qBittorrent 和 Transmission，不支持 Docker 版本。其中 Transmission 由于版本众多，只适配了 [QTransmission3](https://qnapclub.eu/en/qpkg/976)、[MTransmission](https://www.myqnap.org/product/qtransmission) 和 [Transmission4](https://www.myqnap.org/product/transmissionbt-4) 三个版本，2.94 版本我找不到安装包了，不知道目录结构，所以没有适配。
- 安装时会自动检测 qBittorrent、Transmission 是否启用，然后修改 docker-compose.yaml 文件中的种子文件夹映射目录。

安装依赖：

- container-station >= 2.0

[v2.1.19](https://github.com/Jay-Young/qpkg/releases/tag/v_iyuuplus_2.1.19)

- MD5: 512fbf279fa0f34ce46ccb54c384d644
