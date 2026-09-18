/* ============================================================
   VILLA CALUÍ — Página de links
   1) Modais: Política de Privacidade / Termos de Uso
   2) Ano do rodapé

   A animação de entrada é 100% CSS (style.css): nada aqui é
   pré-requisito para ver o conteúdo da página.
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     1) MODAIS
     Abrem sobre a própria página: nada navega, nada recarrega.
     Fecham no ✕, no fundo, com Esc — e o foco fica preso dentro
     da caixa enquanto ela estiver aberta.
     ============================================================ */
  var FOCAVEIS = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea';
  var aberto = null;     // modal aberto no momento
  var voltarPara = null; // elemento que tinha o foco antes de abrir

  function focaveis(modal) {
    return [].slice.call(modal.querySelectorAll(FOCAVEIS)).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
  }

  function abrir(id) {
    var modal = document.getElementById(id);
    if (!modal || aberto) return;

    voltarPara = document.activeElement;
    modal.hidden = false;
    modal.classList.add("aberto");
    document.body.classList.add("travado");
    aberto = modal;

    /* o corpo do texto é rolável e tem tabindex="0": começar o foco
       nele deixa as setas e o Page Down funcionando de imediato */
    var corpo = modal.querySelector(".modal__corpo");
    if (corpo) { corpo.scrollTop = 0; corpo.focus(); }
    else {
      var lista = focaveis(modal);
      if (lista.length) lista[0].focus();
    }
  }

  function fechar() {
    if (!aberto) return;
    aberto.classList.remove("aberto");
    aberto.hidden = true;
    document.body.classList.remove("travado");
    aberto = null;
    if (voltarPara && typeof voltarPara.focus === "function") voltarPara.focus();
    voltarPara = null;
  }

  /* botões que abrem */
  [].forEach.call(document.querySelectorAll("[data-modal]"), function (b) {
    b.addEventListener("click", function () {
      abrir(b.getAttribute("data-modal"));
    });
  });

  /* ✕ e clique no fundo */
  [].forEach.call(document.querySelectorAll("[data-fechar]"), function (b) {
    b.addEventListener("click", fechar);
  });

  /* Esc fecha · Tab circula dentro da caixa */
  document.addEventListener("keydown", function (ev) {
    if (!aberto) return;

    if (ev.key === "Escape" || ev.key === "Esc") {
      ev.preventDefault();
      fechar();
      return;
    }

    if (ev.key !== "Tab") return;

    var lista = focaveis(aberto);
    if (!lista.length) return;

    var primeiro = lista[0];
    var ultimo = lista[lista.length - 1];
    var atual = document.activeElement;

    if (!aberto.contains(atual)) {
      ev.preventDefault();
      primeiro.focus();
    } else if (ev.shiftKey && atual === primeiro) {
      ev.preventDefault();
      ultimo.focus();
    } else if (!ev.shiftKey && atual === ultimo) {
      ev.preventDefault();
      primeiro.focus();
    }
  });

  /* ============================================================
     2) ANO DO RODAPÉ
     ============================================================ */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
