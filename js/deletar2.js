
        const avisosContainer = document.querySelector('#avisosContainer');
        const mensagem = document.querySelector('#mensagem');
        
        const PUBLISHABLE_KEY = 'sb_publishable_EHfkh_trzI6LdvCrSFj-MQ_-QcYvmcd';
        const API_URL = 'https://fhxobambvomypoovedvh.supabase.co/rest/v1/Tabelalegal';

        //Json com os dados do servidor será armazenado nesta variável
        let localAvisos = [];
        

        // READ - Buscar as avisos *********
        async function buscarAvisos() {
            try {
                const response = await fetch(`${API_URL}`, {
                    headers: {
                        apikey: PUBLISHABLE_KEY
                    }
                });
                localAvisos = await response.json();
                renderAvisos();
            } catch (error) {
                avisosContainer.innerHTML = 'Erro ao carregar os dados.';
            }
        }

        // Renderizar os elementos na tela
        function renderAvisos() {
            if (localAvisos.length === 0) {
                avisosContainer.innerHTML = '<p>Nenhuma aviso encontrada.</p>';
                return;
            }

            avisosContainer.innerHTML = '';
            localAvisos.forEach(Tabelalegal => {
                avisosContainer.innerHTML += `
                    <div class="aviso-card" id="aviso-${Tabelalegal.id}">
                        <h3>${Tabelalegal.aviso}</h3>
                        <div class="actions">
                            <button class="btn-delete" onclick="deletaAviso(${Tabelalegal.id})">Deletar</button>
                        </div>
                    </div>
                `;
            });
        }

       //  DELETE - Função que envia o DELETE para a API *********
        async function deletarAviso(id) {
            console.log("entrou");
            if (!confirm('Deseja realmente excluir esta aviso?')) return;

            try {
                const url = new URL(`${API_URL}`)
    url.searchParams.set('id', `eq.${id}`)
                let resposta = await fetch(url, {
                    headers: {
                        apikey: PUBLISHABLE_KEY
                    },
                    method: 'DELETE'
                });
               mensagem.innerHTML = `Aviso excluída com sucesso! (Simulado)<br>
                                    Escolha outra aviso para excluir.`;       
               buscarAvisos(); // Atualiza a lista de notícias após a exclusão   
                                } catch (error) {
                console.error('Erro ao excluir aviso:', error);
            }
        }

        window.deletaAviso = deletarAviso;
        buscarAvisos(); // Carrega as notícias ao iniciar a página        
