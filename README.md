# ReluzSensi - Landing Page de Brinquedos Sensoriais ✨

Uma landing page moderna, dinâmica e responsiva desenvolvida para apresentar e comercializar brinquedos sensoriais impressos em 3D. O projeto tem foco em alívio de estresse, desenvolvimento infantil, estímulo cognitivo e bem-estar sensorial para pessoas de todas as idades.

A interface foi projetada para ser agradável, acessível e intuitiva, proporcionando uma experiência visual acolhedora para os usuários e facilitando a comunicação direta e o processo de vendas através do WhatsApp.

## 🔗 Demonstração
**Repositório do projeto:** [ViniciusBernardo06/ReluzSensi-LandingPage](https://github.com/ViniciusBernardo06/ReluzSensi-LandingPage)

---

## 🚀 Novidades e Funcionalidades Implementadas

O projeto evoluiu e agora conta com diversas funcionalidades avançadas:

- **Catálogo de Produtos Dinâmico:** 
  - Sistema de filtros por categorias (`Articulados`, `Sensoriais`, `Pedagogia`, `Copa`, `Miniaturas`, `Utilidades` e `Réplicas`).
  - Animações suaves ao transitar entre as categorias.
- **Seletor de Filamentos (Variações de Produto):**
  - Opção nativa nos cards para escolher entre "Cores Básicas" e "Arco-íris", com alteração automática de preços e troca dinâmica da foto do produto em tempo real.
- **Carrinho de Compras Integrado:**
  - Sidebar interativa para gerenciamento do carrinho.
  - Seleção inteligente de cores dentro do carrinho.
  - Cálculo automático de subtotais e total do pedido.
- **Checkout via WhatsApp:**
  - Os itens do carrinho são formatados automaticamente em uma mensagem organizada (incluindo cores/variações, quantidades, subtotais e aviso de frete) e enviados direto para o WhatsApp do vendedor.
- **Formulário de Pedido Personalizado:**
  - Seção dedicada para solicitar orçamentos de brinquedos totalmente personalizados (escolha de formato, tamanho, filamento ecológico, etc.).
- **Modo Claro / Escuro (Theme Toggle):**
  - Botão interativo no menu que alterna toda a paleta de cores do site entre os temas Claro e Escuro, com a preferência salva no navegador do usuário.
- **Totalmente Responsivo:**
  - Menu *hamburguer* para dispositivos móveis, e grids que se adaptam perfeitamente a smartphones, tablets e desktops.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica do conteúdo.
- **CSS3 (Vanilla):** Variáveis de cores (CSS Variables) para controle de temas, animações (keyframes), Flexbox e CSS Grid.
- **JavaScript (Vanilla):** Lógica do carrinho de compras, filtros de catálogo, troca de imagens, controle de modo claro/escuro e integração da API de links do WhatsApp.
- **Git & GitHub:** Versionamento de código.

---

## 📂 Estrutura do Projeto

```text
ReluzSensi-LandingPage/
│
├── index.html       # Estrutura principal da página (Navegação, Hero, Catálogo, Carrinho, Formulários)
├── style.css        # Sistema de design (Variáveis de tema, Tipografia, Layout Responsivo)
├── script.js        # Regras de negócio (Carrinho, Filtros, Integração com WA, Theme Toggle)
├── images/          # Imagens dos produtos (versões básicas e arco-íris), ícones e assets do site
└── README.md        # Documentação do projeto
```

---

## 🎯 Objetivo do Projeto

A ReluzSensi busca utilizar a tecnologia da impressão 3D para o bem-estar mental. O objetivo desta aplicação é auxiliar na divulgação e facilitação da compra de brinquedos que contribuem para:

1. Estímulo sensorial;
2. Desenvolvimento motor (como a linha de Pedagogia e Alfabetos Montessori);
3. Foco e concentração (ideal para TDAH e ansiedade);
4. Relaxamento e regulação emocional infantil e adulta.

Além disso, o projeto oferece uma presença digital profissional, conectando clientes diretamente aos serviços da marca de maneira eficiente.

---

## ⚙️ Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ViniciusBernardo06/ReluzSensi-LandingPage.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd ReluzSensi-LandingPage
   ```

3. **Abra no Navegador:**
   - Como é um projeto *Front-End Vanilla*, basta abrir o arquivo `index.html` em qualquer navegador (Chrome, Firefox, Safari, Edge).
   - *Dica:* Para uma experiência melhor de desenvolvimento, você pode utilizar a extensão **Live Server** do VSCode.

---

## 🔮 Melhorias Futuras (Roadmap)

Embora o site já possua integrações avançadas via JavaScript, algumas funcionalidades podem ser expandidas futuramente:

- [ ] Cálculo de frete automático integrado à API dos Correios ou transportadoras locais.
- [ ] Implementação de um Back-End / Área administrativa para cadastrar novos produtos sem mexer no código HTML.
- [ ] Gateway de pagamento integrado diretamente ao site (PIX, Cartão).

---

## 👨‍💻 Autor

Desenvolvido por **Vinícius Bernardo Vieira**.

- GitHub: [ViniciusBernardo06](https://github.com/ViniciusBernardo06)
