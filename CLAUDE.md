# CLAUDE.md

本仓库是唤星（HuanXing）云端管理端前端（Vue 3 + Vben Admin），**独立 git 仓库**（父项目 `huanxing-project` 自 2026-04-20 起放弃 submodule，各子仓自管自 push）。完整项目上下文、技术栈与开发规范见父项目 `huanxing-project/CLAUDE.md`。

- **仓性质**：**fork 仓**（基于上游 fork）。我们的**主分支是 `huanxing`**；`main` 是上游分支，**只用于跟随上游 sync，不要把我们的代码合进 `main`**。feature 合并与 `git push` 一律针对 `huanxing`。

## 多会话分支纪律（主仓恒在主分支，新建分支必走 worktree）

多会话 / 多 agent 会同时在同一个主 clone 上工作，**绝不**为了开发把主仓库 `git checkout` 到 feature 分支（会互相 reset/覆盖——曾发生 A 会话 merge、B 会话 `git reset` 撤销并清掉对方工作区改动，来回数轮差点丢工作）。

- **主仓库（主 clone）始终停在主分支 `huanxing`，不随意切换。**
- **小修复 / 小 UI 改 / 文档** → 直接在 `huanxing` 上做 → 跑最小校验 → 立即提交，不新建分支。
- **稍复杂的功能** → 从 `huanxing` `git worktree add ../<名> -b <分支>` 拉独立工作树开发，主仓库不动；完成后回 `huanxing` 合并、删 worktree。
- 一句话：**新建分支 = 必走 worktree**。提交用 `git commit -m "..." -- <你的文件>` 精确提交，发现别的会话的脏/staged 改动**不要碰**；push 前先 `git fetch origin huanxing` 整合，**禁止 force-push**。

## 代码注释统一使用中文（铁律）

> 权威在父仓 `CLAUDE.md` 开发规范小节。

**我们新增 / 修改的 Vue / TS 代码，注释一律用中文**——行内注释、块注释、`// TODO`/`// FIXME`、JSDoc/TSDoc。团队以中文协作，中文注释才能让队友第一时间读懂意图。

- ✅ **正确**：`// 从 catalog 读权威分类，前端不再硬编码`
- ❌ **错误**：`// read authoritative categories from catalog`
- **允许保留英文**：标识符、组件名、API 路径、URL、命令、包名、技术术语/缩写（`Vue`、`Vben`、`Ant Design Vue`、`JWT` 等）；只要求注释里的**说明性文字**用中文。
- **本仓是 fork 仓**：**不必**批量翻译上游（Vben Admin）既有英文注释，只约束我们新写 / 改动的代码。
