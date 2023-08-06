# Code Server

源项目: <https://github.com/coder/code-server>

- 默认端口: 8848, 默认密码: qnap, 默认用户数据目录: `/share/***_DATA/code-server/`。
- 配置文件：`/share/***_DATA/.qpkg/qvscode/config.yaml`, 可手动修改端口、密码、证书位置, 重启 Code Server 应用修改。
- 关于HTTPS, 使用 QNAP 默认位置的证书, 即`/etc/stunnel/stunnel.pem`, 后续证书更新, 重启 Code Server 应用新证书。
- 注意不要对外公开发布, 程序拥有管理员权限，建议仅在内网或使用穿透或其他隧道工具连接，公网用户做好安全管理。

![codeserver](/code-server/codeserver.png)

[v4.10.1](https://github.com/Jay-Young/qpkg/releases)

- MD5: 53f66071035623d28722168e4b6c63ba

[v3.8.1](/code-server/build/qvscode_3.8.1.qpkg)

3.8.1 及以前的版本配置如下

- MD5: d4cfae82da0f65530c0616114db9623a
- 默认端口: 8080, 默认密码: codeserver, 默认用户数据目录: `/share/***_DATA/.code-server/`。
- 配置文件：`/share/***_DATA/.qpkg/qvscode/config/config.yaml`, 可手动修改端口、密码、证书位置, 重启 Code Server 应用修改。
