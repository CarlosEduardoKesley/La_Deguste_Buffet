# 🍽️ La Deguste Buffet — Projeto Web + Infraestrutura Docker

Site institucional do **La Deguste Buffet** (Brasília, DF) com infraestrutura
completa em Docker Compose para demonstração de habilidades em redes e DevOps.

---

## 🏗️ Arquitetura

```
Internet
    │
    ▼
┌─────────────────────────────────────┐
│         DOCKER HOST (sua VM)        │
│                                     │
│  ┌────────────┐  Rede: 172.20.0.0/24│
│  │   PROXY    │ :80 / :443          │
│  │  (Nginx)   │ 172.20.0.2          │
│  └─────┬──────┘                     │
│        │ proxy_pass http://site:80  │
│  ┌─────▼──────┐                     │
│  │    SITE    │ (interno)           │
│  │  (Nginx)   │ 172.20.0.10         │
│  └────────────┘                     │
│                                     │
│  ┌────────────┐                     │
│  │ PORTAINER  │ :9000               │
│  │  (Painel)  │ 172.20.0.3          │
│  └────────────┘                     │
└─────────────────────────────────────┘
```

## 📦 Serviços

| Serviço    | Container             | IP interno   | Porta pública | Função                        |
|------------|-----------------------|--------------|---------------|-------------------------------|
| site       | ladeguste-site        | 172.20.0.10  | (interna)     | Serve o site estático         |
| proxy      | ladeguste-proxy       | 172.20.0.2   | 80 / 443      | Reverse proxy + segurança     |
| portainer  | ladeguste-portainer   | 172.20.0.3   | 9000          | Painel visual Docker          |

---

## 🚀 Como subir o projeto

### Pré-requisitos
- Docker >= 24.x
- Docker Compose >= 2.x

```bash
# Clone ou entre na pasta do projeto
cd ladeguste/

# Suba todos os serviços
docker compose up -d

# Verifique se estão rodando
docker compose ps

# Acompanhe os logs em tempo real
docker compose logs -f
```

### Acessar
| O quê            | URL                        |
|------------------|----------------------------|
| Site             | http://localhost            |
| Painel Portainer | http://localhost:9000       |

---

## 🖼️ Adicionando as fotos reais

1. Coloque as imagens na pasta `site/images/`
2. Use os nomes abaixo (ou edite o `index.html`):

| Arquivo          | Onde aparece         |
|------------------|----------------------|
| `hero.jpg`       | Banner principal     |
| `sobre.jpg`      | Seção "O Buffet"     |
| `casamento.jpg`  | Card de Casamentos   |
| `festas.jpg`     | Card de Festas       |
| `corporativo.jpg`| Card Corporativo     |
| `g1.jpg` a `g6.jpg` | Galeria de fotos  |

> Resolução recomendada: **1200×800px** mínimo (hero: **1920×1080px**)

---

## 🔧 Comandos úteis

```bash
# Parar tudo
docker compose down

# Reconstruir após mudanças
docker compose up -d --force-recreate

# Ver logs de um serviço específico
docker compose logs -f proxy
docker compose logs -f site

# Inspecionar a rede criada
docker network inspect ladeguste_ladeguste-net

# Ver IPs dos containers
docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
  $(docker compose ps -q)
```

---

## 🔒 Habilitando HTTPS (SSL)

1. Obtenha um certificado (ex: Let's Encrypt com Certbot)
2. Coloque `fullchain.pem` e `privkey.pem` em `nginx/ssl/`
3. Descomente o bloco `443` em `nginx/proxy.conf`
4. Descomente o redirect HTTP→HTTPS
5. Rode `docker compose up -d --force-recreate proxy`

---

## 📁 Estrutura do Projeto

```
ladeguste/
├── docker-compose.yml     # Orquestração dos serviços
├── nginx/
│   ├── proxy.conf         # Reverse proxy (porta 80/443 pública)
│   ├── site.conf          # Servidor interno do site
│   └── ssl/               # Certificados SSL (adicionar manualmente)
├── site/
│   ├── index.html         # Página principal
│   ├── css/style.css      # Estilos
│   ├── js/main.js         # Scripts
│   └── images/            # ← Coloque as fotos aqui
└── README.md
```

---

## 💡 Conceitos de Redes Demonstrados

- **Rede bridge customizada** com subnet dedicada (`172.20.0.0/24`)
- **IPs estáticos** por container
- **Reverse Proxy** (Nginx encaminha requisições ao serviço interno)
- **Port isolation** (site não expõe porta diretamente)
- **Rate limiting** (proteção básica contra DDoS no proxy)
- **Headers de segurança HTTP** (X-Frame-Options, XSS-Protection...)
- **Health check** automático no container do site
- **Volumes** para separar configuração de dados
- **Docker socket mount** para o Portainer monitorar os containers

---

Desenvolvido por **Carlos Eduardo Kesley** — Portfólio de Infraestrutura & Redes
