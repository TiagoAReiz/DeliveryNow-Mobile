# DeliveryNow Mobile

[![CI](https://github.com/TiagoAReiz/DeliveryNow-Mobile/actions/workflows/ci.yml/badge.svg)](https://github.com/TiagoAReiz/DeliveryNow-Mobile/actions/workflows/ci.yml)

Aplicativo mobile do **entregador** da plataforma DeliveryNow, feito com **Expo + React Native + NativeWind**. O entregador faz login, consulta as entregas atribuídas a ele, tira fotos do canhoto como comprovante e confirma a entrega.

O backend é a [**DeliveryNow API**](https://github.com/TiagoAReiz/DeliveryNow-Api) (Java 17 + Spring Boot, JWT, PostgreSQL e Azure Blob Storage via Azurite).

## Funcionalidades

- **Login com JWT** — autentica em `POST /login`; o token e o id do usuário ficam no `expo-secure-store`. As rotas de entregas são protegidas e, se a API responder `401`/`403`, a sessão é limpa e o app volta para a tela de login.
- **Lista de entregas** do entregador logado, com cartões mostrando destinatário, endereço e status.
- **Busca e filtros** — busca por nome ou endereço (com *debounce*) e filtro por status: *Pendente*, *Entregue* e *Atrasado* (`GET /delivery/search`).
- **Detalhe da entrega** — dados do destinatário e endereço completo.
- **Comprovante por foto** — captura fotos do canhoto com a câmera (`expo-image-picker`), permite revisar/remover antes de enviar e faz upload `multipart` para `POST /receipt/send/{id}`. As fotos já enviadas são exibidas a partir das URLs assinadas do Blob Storage (`GET /receipt/delivery/{id}`).
- **Confirmar entrega** — liberado só depois de ao menos uma foto enviada; marca a entrega como `DELIVERED` (`PATCH /delivery/{id}`).

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Expo SDK 54, React Native 0.81, React 19 (New Architecture + React Compiler) |
| Navegação | Expo Router 6 (rotas baseadas em arquivos, *typed routes*) |
| Estilo | NativeWind 4 (Tailwind CSS) + `expo-linear-gradient` |
| HTTP | Axios com interceptors (token Bearer e logout automático) |
| Armazenamento seguro | `expo-secure-store` |
| Câmera | `expo-image-picker` |
| Qualidade | TypeScript (strict), ESLint (`eslint-config-expo`) |

## Estrutura

```
src/
├── app/                    # Telas (Expo Router)
│   ├── index.tsx           # Login
│   └── deliveries/
│       ├── index.tsx       # Lista, busca e filtros
│       └── [id]/index.tsx  # Detalhe, fotos e confirmação
├── components/ui/          # Atomic design: atoms, molecules, organisms
├── hooks/                  # useDeliveries, useDeliveryDetails, usePhotoCapture, useLoginForm...
├── provider/auth-context.tsx
├── services/               # Clientes da API (login, deliveries, receipts) e DTOs
├── config/api.ts           # Instância do Axios
├── constants/ types/ utils/
```

## Como executar

### Pré-requisitos

- Node.js 20+ e npm
- [Expo Go](https://expo.dev/go) no celular, ou um emulador Android / simulador iOS
- A [DeliveryNow API](https://github.com/TiagoAReiz/DeliveryNow-Api) rodando (o jeito mais simples é o `docker compose up --build` descrito no README dela)

### Passo a passo

1. Clone e instale as dependências:
   ```bash
   git clone https://github.com/TiagoAReiz/DeliveryNow-Mobile.git
   cd DeliveryNow-Mobile
   npm install
   ```

2. Configure a URL da API:
   ```bash
   cp .env.example .env
   ```
   Edite `EXPO_PUBLIC_API_BASE_URL` conforme onde o app vai rodar:

   | Onde o app roda | Valor |
   |---|---|
   | Celular físico (Expo Go) | `http://<IP-da-sua-máquina-na-rede>:8080` |
   | Emulador Android | `http://10.0.2.2:8080` |
   | Simulador iOS | `http://localhost:8080` |

3. Crie um usuário na API (o app não tem tela de cadastro):
   ```bash
   curl -X POST http://localhost:8080/register -H 'Content-Type: application/json' \
     -d '{"email":"demo@deliverynow.dev","firstName":"Demo","lastName":"User","password":"demo123"}'
   ```
   e cadastre algumas entregas para ele via `POST /delivery` (veja o README da API).

4. Inicie o app:
   ```bash
   npx expo start
   ```
   Escaneie o QR code com o Expo Go ou pressione `a` (Android) / `i` (iOS).

> As variáveis `EXPO_PUBLIC_*` são embutidas no bundle em tempo de build. Depois de alterar o `.env`, reinicie o Metro com `npx expo start -c`.

### Com Docker (opcional)

O `docker-compose.yml` sobe o Metro em modo `--tunnel` na rede `deliverynow-network`, criada pelo compose da API:

```bash
docker compose up --build
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o Metro / Expo Dev Server |
| `npm run android` / `npm run ios` | Abre direto no emulador/simulador |
| `npm run lint` | ESLint (`expo lint`) |
| `npm run typecheck` | Checagem de tipos com `tsc --noEmit` |

O GitHub Actions ([`ci.yml`](.github/workflows/ci.yml)) roda `lint` e `typecheck` em cada push e pull request.
