# CLAUDE.md

> 本文件只保存管理端前端专属规则；共享规范继承父仓 [`../CLAUDE.md`](../CLAUDE.md)。

- 本仓是独立产品 fork；项目主分支为 `hasn`（2026-08-10 由 `huanxing` 改名），`main` 只跟随 Vben 上游，禁止写入项目改动。
- 我们新增或修改的 Vue/TS 注释、JSDoc/TSDoc、TODO/FIXME 一律中文；标识符和技术术语可保留英文，禁止批量翻译上游既有注释。
- 主 clone 始终停在 `hasn`；小修复/文档可直接完成，新分支必须使用 worktree，并先核对现有 worktree 与任务登记。
- 禁止从 worktree push。完成后回主 clone，fetch/整合 `origin/hasn`、合并分支，再由主 clone push；禁止 force-push，只提交本任务文件。
- 提交前按改动范围运行 `pnpm check:type`、`pnpm lint` 和 `pnpm build:antd`。
