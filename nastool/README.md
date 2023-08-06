# NASTool

源项目: <https://github.com/jxxghp/nas-tools> (已废弃)
原作者新项目: <https://github.com/jxxghp/MoviePilot>

**说明**：

本打包 qpkg 依赖 python3，请首先安装 [python39](https://www.qnapclub.eu/en/qpkg/1134)，基于此版本，其他版本 python3 没有适配。

默认使用 SSL 并使用 NAS 的证书 `/etc/stunnel/backup.cert` 和 `/etc/stunnel/backup.key`，请首先自行解决证书问题。

安装以后，如果没有正常运行，检查依赖是否正确安装，如果依赖安装失败，管理后台会有消息通知。在应用商店里重启应用可以重新安装依赖。

运行成功以后，登录用户名和密码都是 `qnap`，请不要使用 NASTool 自带的重启和更新功能，重启请到 QNAP 应用商店里操作。**更新版本或者重新安装时请首先备份设置，安装以后恢复备份即可。备份及恢复选项位于 NASTool 的服务选项卡页面。**

默认使用 Plex 和 Transmission，请自行安装或在设置中修改为其他软件。其他设置参看原项目 wiki。

![nastool](/nastool/nastool.png)

[v2.9.1](/nastool/build/nastool_2.9.1_x86_64.qpkg)

- MD5: ea59bd19d0007f209f9e080718279412
- 模块化认证前的最后一个版本
- 2.9.1 版本开始加入自动重启计划（每天凌晨 1 点），为避免出现RSS等服务出现不正常的导致刷流任务和自定义订阅没有正常下载。
