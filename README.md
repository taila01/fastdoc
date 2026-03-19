# FastDoc - Sistema de Gestão de Documentos

O FastDoc é uma plataforma voltada para o gerenciamento centralizado de documentos, desenvolvida com foco em alta performance de renderização, consistência de interface e experiência do usuário em fluxos administrativos.

## Tecnologias e Arquitetura

* **Frontend:** Next.js (App Router) para roteamento otimizado e Server-Side Rendering (SSR).
* **Estilização:** Tailwind CSS com Design System customizado (Zinc/Gray Scale).
* **Componentização:** HeroUI para componentes acessíveis e padronizados.
* **Animações:** Framer Motion para transições de estado e feedback visual.
* **Gerenciamento de Notificações:** React Hot Toast para validação de operações.

## Diferenciais Técnicos e Refatoração de UI

O sistema passou por uma atualização de interface para otimizar a usabilidade e a arquitetura de componentes:

* **Design System:** Implementação de tema Dark (Zinc-900) focado em legibilidade e redução de fadiga visual.
* **Feedback de Operações:** Integração de notificações em tempo real para sucesso ou erro em ações de CRUD.
* **Micro-interações:** Uso de Framer Motion para suavizar a abertura de modais e transições de listas, melhorando a percepção de performance.
* **Modularidade:** Componentes desenvolvidos seguindo princípios de reutilização, facilitando a manutenção e escalabilidade do código.

## Estrutura de Componentes de UI

| Componente | Responsabilidade Técnica | Padrão de Design |
| :--- | :--- | :--- |
| **EditDocumentDialog** | Edição assíncrona de metadados de arquivos. | Modal Rounded-2xl |
| **DocumentViewDialog** | Visualização de detalhes com navegação por abas. | Tabs Underlined |
| **TableActions** | Centralização de ações rápidas (Edit/Delete/View). | Dropdown com Blur |
| **DocumentInfoSection** | Exibição de dados técnicos e logs do documento. | Grid Layout / Zinc Theme |

## Instruções para Execução

1. Instalação de dependências:
   ```bash
   npm install
   ```

2. Execução do ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

---
**Desenvolvido por Taila**
