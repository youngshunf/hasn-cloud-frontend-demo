# Astra (唤星) admin console — demo

**Fork of [fastapi-practices/fastapi-best-architecture-ui](https://github.com/fastapi-practices/fastapi-best-architecture-ui)** (Vben Admin). The upstream admin shell is kept; this `demo` branch adds the Astra (唤星) operations console on top.

## What I built on top

Admin views and APIs added under `apps/web-antdv-next/src/` (not part of the stock FBA UI):

- **Agents and nodes** — agent list/detail, capabilities, MCP keys, node and client bindings, conversations, messages, contacts, tasks and task runs
- **Model registry** — model management and platform default configuration (including image / video model failover settings)
- **Skills, catalog, and marketplace** — skill bundles, app catalog, entitlements, beta / gray-release access, marketplace skills / apps / templates
- **Billing and payments** — offerings, plans, subscriptions, credits, pay merchants / channels / orders, NewAPI quota
- **Release console** — desktop/client release management, including in-page package upload
- **MCP gateway** — third-party MCP registration, keys, and quotas
- **Stock media providers**, platform operator grants, audit logs, owner API keys
- **Internal service health** — a monitor page for internal service status
- Related app-platform pages (agent bindings, listings, permissions, installations)

This repository is a **demo** snapshot of the admin console. It talks to the Astra cloud API; it is not the end-user desktop client.

---

# FastAPI Best Architecture UI

Front-end Implementation of the [FastAPI Best Architecture](https://github.com/fastapi-practices/fastapi_best_architecture)

## Help

For more details, please check the [official documentation](https://fastapi-practices.github.io/fastapi_best_architecture_docs/frontend/summary/quick-start.html)

## Contributors

<a href="https://github.com/fastapi-practices/fba_ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fastapi-practices/fba_ui"/>
</a>

## Special thanks

- [Vue.js](https://cn.vuejs.org/guide/introduction.html)
- [Vben Admin](https://www.vben.pro/)
- ...

## License

This project is licensed under the terms of the [MIT](https://github.com/fastapi-practices/fba_ui/blob/master/LICENSE) license
