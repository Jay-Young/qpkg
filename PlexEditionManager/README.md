# Plex Edition Manager

源项目: <https://github.com/x1ao4/plex-edition-manager>

用于管理 Plex 电影版本信息的 Python 脚本。它会根据电影的文件名自动检测电影的版本（如 REMUX、BD、WEB-DL 等），并在 Plex 中更新版本信息。

说明：

- 适配 QNAP 官方的 Python3，还有第三方的 QPython39、QPython310 和 QPython311。
- 适配通过 Plex 官方方式安装的 Plex Media Server ，不适配 Docker 方式安装的 Plex Media Server。
- 安装后即运行一次 `plex_edition_manager.py`，然后将其加入计划任务，每天 03:15 分运行一次。

安装依赖：

- Python >= 3.0

[v1.0](https://github.com/Jay-Young/qpkg/releases/tag/v_plexeditionmanager_1.0)

- MD5: 96220b0ab960bb9408d274ad30901cc7
