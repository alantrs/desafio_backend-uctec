function carregarEmpresas() {
  fetch('/empresas')
    .then(response => response.json())
    .then(data => {
      const empresasBody = document.getElementById('empresas-body');
      empresasBody.innerHTML = '';

      data.forEach(empresa => {
        const row = document.createElement('tr');
        const cnpjCell = document.createElement('td');
        const razaoSocialCell = document.createElement('td');
        const verDadosButtonCell = document.createElement('td');

        cnpjCell.textContent = empresa.cnpj;
        razaoSocialCell.textContent = empresa.razao_social;

        const verDadosButton = document.createElement('button');
        verDadosButton.textContent = 'Ver Dados';
        verDadosButton.addEventListener('click', () => exibirDadosEmpresa(empresa.cnpj));

        verDadosButtonCell.appendChild(verDadosButton);

        row.appendChild(cnpjCell);
        row.appendChild(razaoSocialCell);
        row.appendChild(verDadosButtonCell);
        empresasBody.appendChild(row);
      });

      const backCnpjButton = document.getElementById('back-cnpj-button');
      const backNameButton = document.getElementById('back-name-button');
      backCnpjButton.classList.add('d-none');
      backNameButton.classList.add('d-none');
    })
    .catch(error => {
      console.error('Erro ao obter empresas:', error);
    });
}

function exibirDadosEmpresa(cnpj) {
  fetch(`/empresas/cnpj/${cnpj}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao buscar detalhes da empresa.');
      }
    })
    .then(empresa => {
      const modalBody = document.getElementById('empresa-modal-body');
      modalBody.innerHTML = '';

      const orderedKeys = Object.keys(empresa).sort(); // Ordena as chaves do objeto

      for (const key of orderedKeys) {
        const value = empresa[key];
        if (value !== null && value !== "") {
          if (Array.isArray(value)) {

            if (value.length > 0) {
              modalBody.innerHTML += `<h5>${key}:</h5>`;
              value.forEach(item => {
                let itemHtml = '';
                for (const itemKey in item) {
                  const itemValue = item[itemKey];
                  if (itemValue !== null && itemValue !== "") {
                    itemHtml += `<strong>${itemKey}:</strong> ${itemValue} `;
                  }
                }
                modalBody.innerHTML += `<p>${itemHtml}</p>`;
              });
            }
          } else {

            modalBody.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
          }
        }
      }

      const modal = document.getElementById('empresa-modal');
      modal.style.display = 'block';
    })
    .catch(error => {
      console.error('Erro ao obter detalhes da empresa:', error);
    });
}


function searchEmpresasByCnpj() {
  const searchCnpjInput = document.getElementById('search-cnpj-input');
  const cnpj = searchCnpjInput.value.trim();

  if (cnpj !== '') {
    fetch(`/empresas/cnpj/${cnpj}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao buscar empresas por CNPJ.');
        }
      })
      .then(data => {
        const empresasBody = document.getElementById('empresas-body');
        empresasBody.innerHTML = '';

        if (data.error) {
          const row = document.createElement('tr');
          const errorMessageCell = document.createElement('td');
          errorMessageCell.textContent = 'Empresa não cadastrada';

          row.appendChild(errorMessageCell);
          empresasBody.appendChild(row);
        } else {
          const row = document.createElement('tr');
          const cnpjCell = document.createElement('td');
          const razaoSocialCell = document.createElement('td');
          const verDadosButtonCell = document.createElement('td');

          cnpjCell.textContent = data.cnpj;
          razaoSocialCell.textContent = data.razao_social;

          const verDadosButton = document.createElement('button');
          verDadosButton.textContent = 'Ver Dados';
          verDadosButton.addEventListener('click', () => exibirDadosEmpresa(data.cnpj));

          verDadosButtonCell.appendChild(verDadosButton);

          row.appendChild(cnpjCell);
          row.appendChild(razaoSocialCell);
          row.appendChild(verDadosButtonCell);
          empresasBody.appendChild(row);

          const backCnpjButton = document.getElementById('back-cnpj-button');
          backCnpjButton.classList.remove('d-none');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar empresas por CNPJ:', error);
      });
  }
}

function searchEmpresasByRazaoSocial() {
  const searchNameInput = document.getElementById('search-name-input');
  const razaoSocial = searchNameInput.value.trim();

  if (razaoSocial !== '') {
    fetch(`/empresas/razaoSocial/${razaoSocial}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao buscar empresas por razão social.');
        }
      })
      .then(data => {
        const empresasBody = document.getElementById('empresas-body');
        empresasBody.innerHTML = '';

        if (data.error) {
          const row = document.createElement('tr');
          const errorMessageCell = document.createElement('td');
          errorMessageCell.textContent = 'Empresa não cadastrada';

          row.appendChild(errorMessageCell);
          empresasBody.appendChild(row);
        } else {
          const row = document.createElement('tr');
          const cnpjCell = document.createElement('td');
          const razaoSocialCell = document.createElement('td');
          const verDadosButtonCell = document.createElement('td');

          cnpjCell.textContent = data.cnpj;
          razaoSocialCell.textContent = data.razao_social;

          const verDadosButton = document.createElement('button');
          verDadosButton.textContent = 'Ver Dados';
          verDadosButton.addEventListener('click', () => exibirDadosEmpresa(data.cnpj));

          verDadosButtonCell.appendChild(verDadosButton);

          row.appendChild(cnpjCell);
          row.appendChild(razaoSocialCell);
          row.appendChild(verDadosButtonCell);
          empresasBody.appendChild(row);
          const backNameButton = document.getElementById('back-name-button');
          backNameButton.classList.remove('d-none');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar empresas por razão social:', error);
      });
  }
}

function voltarPesquisa() {
  const searchCnpjInput = document.getElementById('search-cnpj-input');
  const searchNameInput = document.getElementById('search-name-input');
  const backCnpjButton = document.getElementById('back-cnpj-button');
  const backNameButton = document.getElementById('back-name-button');
  const empresasBody = document.getElementById('empresas-body');

  searchCnpjInput.value = '';
  searchNameInput.value = '';
  backCnpjButton.classList.add('d-none');
  backNameButton.classList.add('d-none');
  empresasBody.innerHTML = '';
  carregarEmpresas();
}

function fecharModal() {
  const modal = document.getElementById('empresa-modal');
  modal.style.display = 'none';
}
function redirecionarParaCadastro() {
    window.location.href = 'cadastro.html';
  }

document.addEventListener('DOMContentLoaded', () => {
  carregarEmpresas();

  const searchCnpjButton = document.getElementById('search-cnpj-button');
  searchCnpjButton.addEventListener('click', searchEmpresasByCnpj);

  const searchNameButton = document.getElementById('search-name-button');
  searchNameButton.addEventListener('click', searchEmpresasByRazaoSocial);

  const backCnpjButton = document.getElementById('back-cnpj-button');
  backCnpjButton.addEventListener('click', voltarPesquisa);

  const backNameButton = document.getElementById('back-name-button');
  backNameButton.addEventListener('click', voltarPesquisa);

  const modalCloseButton = document.getElementsByClassName('modal-close-button')[0];
  modalCloseButton.addEventListener('click', fecharModal);

  const cadastrarButton = document.getElementById('cadastrar-button');
  cadastrarButton.addEventListener('click', redirecionarParaCadastro);
});
