// *** Header ***
class MeuHeader extends HTMLElement {

    constructor() {
      super();
      this.innerHTML = `
        <header>
          <h1>
            CRUD DO MANOEL
          </h1>
        </header>
      `;
    }
  }
  customElements.define('meu-header', MeuHeader);
  
  // *** Nav ***
  class MeuNav extends HTMLElement {
    // 
    constructor() {
      super();  
      this.innerHTML = `
      <nav>
        <a href="criar2.html">CRIAR</a> |
        <a href="consultar2.html">CONSULTAR</a> |
        <a href="alterar2.html">ALTERAR</a> |
        <a href="deletar2.html">DELETAR</a>
      </nav>
      `;
    }   
  }
  customElements.define('meu-nav', MeuNav);
  
  // *** Footer ***
  class MeuFooter extends HTMLElement {
  
    constructor() {
      super();
      this.innerHTML = `
      <footer>
          <p>
            Manoel - 2025311579. <br>
            Nenhum direito reservado
          </p>
      </footer>
      `;    
    }
  }      
  customElements.define('meu-footer', MeuFooter);