document.addEventListener('DOMContentLoaded', () => {

    const cepInput = document.getElementById('cep');

    const consultarBtn = document.getElementById('consultar-btn');

    const resultadoDiv = document.getElementById('resultado');

    const loadingDiv = document.getElementById('loading');

    // Função para limpar o resultado e exibir carregamento

    function showLoading() {

        resultadoDiv.innerHTML = '';

        loadingDiv.style.display = 'block';

    }

    // Função para esconder carregamento

    function hideLoading() {

        loadingDiv.style.display = 'none';

    }

    // Função para exibir erro

    function showError(message) {

        resultadoDiv.innerHTML = `<p class="error" style="color: #FF6347;">${message}</p>`;

    }

    // Função principal para consultar o CEP

    async function consultarCEP() {

        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length !== 8) {

            showError('Por favor, digite um CEP válido com 8 dígitos.');

            return;

        }

        showLoading();

        try {

            // Usando a API ViaCEP

            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            const data = await response.json();

            hideLoading();

            if (data.erro) {

                showError('CEP não encontrado. Verifique o número digitado.');

            } else {

                resultadoDiv.innerHTML = `

                    <p><strong>CEP:</strong> ${data.cep}</p>

                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>

                    <p><strong>Bairro:</strong> ${data.bairro}</p>

                    <p><strong>Cidade:</strong> ${data.localidade}</p>

                    <p><strong>Estado:</strong> ${data.uf}</p>

                    <p><strong>DDD:</strong> ${data.ddd || 'N/A'}</p>

                `;

            }

        } catch (error) {

            hideLoading();

            showError('Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.');

            console.error('Erro na consulta de CEP:', error);

        }

    }

    // Adicionar evento ao botão de consulta

    consultarBtn.addEventListener('click', consultarCEP);

    // Opcional: Permitir consulta ao pressionar Enter no campo do CEP

    cepInput.addEventListener('keypress', (e) => {

        if (e.key === 'Enter') {

            consultarCEP();

        }

    });

});