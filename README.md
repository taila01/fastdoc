# 📄 FastDoc - Gestão de Documentos

Sistema moderno para gerenciamento, edição e visualização de documentos, construído com foco em **UI/UX consistente** e performance.

## ✨ Características Recentes (UI Refactor)

A interface foi atualizada para um design **Dark Moderno** com as seguintes especificações:

* **Design System:** Baseado em Zinc-900 com bordas Gray-800.
* **Componentes:** Modais e botões com arredondamento total (`rounded-full` / `2xl`).
* **Feedback:** Integração com `HotToast` para notificações de sucesso e erro.
* **Animações:** Transições suaves de entrada e saída usando `Framer Motion`.

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **UI Library:** [HeroUI](https://heroui.com/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [React Icons](https://react-icons.github.io/react-icons/) (FA6)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Como Executar o Projeto

1. Instale as dependências:
```bash
npm install

```


2. Execute o ambiente de desenvolvimento:
```bash
npm run dev

```



## 📂 Estrutura de Componentes de UI

| Componente | Função | Estilo |
| --- | --- | --- |
| **EditDocumentDialog** | Edição de metadados | Dark / Rounded-2xl |
| **DocumentViewDialog** | Visualização com Tabs | Underlined / Indigo Accent |
| **TableActions** | Menu Dropdown de ações | Pill-shaped / Blur Backdrop |
| **DocumentInfoSection** | Exibição de dados técnicos | Grid Layout / Zinc Theme |

---

Desenvolvido por **Taila** ❤️

---

**Para fazer o commit rápido, você pode usar este comando no terminal:**
`git add . && git commit -m "style: refactor document UI components and update readme"`
