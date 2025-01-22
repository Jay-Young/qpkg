# Certimate

源项目: <https://github.com/usual2970/certimate>

官方文档：<https://docs.certimate.me>

开源的SSL证书管理工具，可以帮助你申请SSL证书，自动续期SSL证书。

## QNAP系统本地部署

证书和密钥位置：

`/etc/stunnel/backup.cert`, `/etc/stunnel/backup.key`

运行命令：

```bash
cat /etc/stunnel/backup.cert /etc/stunnel/backup.key > /etc/stunnel/stunnel.pem
/etc/init.d/Qthttpd.sh restart
/etc/init.d/thttpd.sh restart
/etc/init.d/stunnel.sh restart
```

[v0.2.24b](https://github.com/Jay-Young/qpkg/releases/tag/v0.2.24b_certimate)

- MD5:
  - arm_64: 5b8699be6338afd39fa8b0ffb4b5ecc2
  - x86_64: 7e7d4f5da97b2457ccbc42078b892d4f
