# NASTool

源项目: <https://github.com/jxxghp/MoviePilot>

原作者旧项目: <https://github.com/jxxghp/MoviePilot>(已废弃)

**说明**：

1. 目前作者只提供 docker 方式安装运行，使用站点功能需要认证，且除了最基本的用户信息设置可以通过 WEBUI 修改外，其他设置均需提前通过 docker 的环境变量设置好，因此无法提供可以分发复用的 QPKG 包。
2. 按照 <https://github.com/qnap-dev/containerized-qpkg> 将 docker 应用打包成 QPKG 的方式提供源码，可以按照 MoviePilot 项目的配置要求自行修改 `dock-composer.yml`，然后按照 `containerized-qpkg` 项目的说明打包成 QPKG，Windows 上建议使用 WLS2 Ubuntu 子系统去操作。
3. `Dockerfile` 中安装 `qdk2` 的地址使用了代理 `Github` 文件，如果你觉得不需要，那把 `https://ghproxy.com/` 删除即可。
4. <span style="color:red;font-weight:bold">打包好的 QPKG 包含你的密钥等重要隐私，请勿公开分发或传播，仅做个人使用！！！</span>
5. 虽然设置了 HTTPS 端口，但没有做反向代理，所以请自行解决。正常情况下，通过 `http://<nas_ip>:9528` 或 `http://<nas_domain>:9528` 访问。
6. 打包的应用含有容器镜像，因此安装包较大，安装时间较长，且首次安装完成以后，MoviePilot 需要一定时间去下载浏览器核心，WEBUI 才能访问，等到登录界面出现且背景有壁纸的情况下可以用 `qnap` 和 `myqnap` 的用户名和密码去登录， 记得修改密码。
7. 其他更详细的使用说明请看源项目。

![moviepilot](/moviepilot/moviepilot.png)
