const AvisoForm = document.querySelector('#AvisoForm');
        const AvisoIdInput = document.querySelector('#AvisoId');
        const AvisoTitleInput = document.querySelector('#AvisoTitle');
        const submitBtn = document.querySelector('#submitBtn');
        const AvisosContainer = document.querySelector('#AvisosContainer');
        const mensagem = document.querySelector('#mensagem');
        
        const PUBLISHABLE_KEY = 'sb_publishable_EHfkh_trzI6LdvCrSFj-MQ_-QcYvmcd';
        const API_URL = 'https://fhxobambvomypoovedvh.supabase.co/rest/v1/Tabelalegal';

        //Json com os dados do servidor será armazenado nesta variável
        let localAvisos = [];
        
        //Ouvintes de eventos
        AvisoForm.addEventListener('submit', updateAviso);
        

        // 1. READ - Buscar as Avisos *********
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
                AvisosContainer.innerHTML = 'Erro ao carregar os dados.';
            }
        }

        // Renderizar os elementos na tela
        function renderAvisos() {
            if (localAvisos.length === 0) {
                AvisosContainer.innerHTML = '<p>Nenhuma aviso encontrada.</p>';
                return;
            }

            AvisosContainer.innerHTML = '';
            localAvisos.forEach(Tabelalegal => {
                AvisosContainer.innerHTML += `
                    <div class="aviso-card" id="aviso-${Tabelalegal.id}">
                        <h3>${Tabelalegal.aviso}</h3>
                        <div class="actions">
                            <button class="btn-edit" onclick="preparaEdit(${Tabelalegal.id})">Editar</button>
                        </div>
                    </div>
                `;
            });
        }

       

        // Preenche o formulário com os dados da aviso selecionada para edição
        function prepararEdit(id) {
            const aviso = localAvisos.find(n => n.id === id);
            if (aviso) {
                AvisoForm.classList.remove('oculto');
                AvisosContainer.classList.add('oculto');
                mensagem.innerHTML = 'Informe os dados que serão alterados';

                AvisoIdInput.value = aviso.id;
                AvisoTitleInput.value = aviso.aviso;
                          
            }
        }

        window.preparaEdit = prepararEdit;

        // 3. UPDATE - Função que envia o PUT para a API *********
        async function updateAviso(e) {
            e.preventDefault(); // Impede o HTML de recarregar a página inteira
            
            const id = AvisoIdInput.value;
            const AvisoData = {
                aviso: AvisoTitleInput.value
            };

            try {
                const url = new URL(`${API_URL}`)
                url.searchParams.set('id', `eq.${id}`)
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {    
                    apikey: PUBLISHABLE_KEY,
                    'Content-Type': 'application/json',  
                    Prefer:'return=representation'
            },
                    body: JSON.stringify(AvisoData)
                });
                const updatedAviso = await response.json();
                
                AvisoForm.classList.add('oculto');
                AvisosContainer.classList.remove('oculto');
                mensagem.innerHTML = `Aviso alterada com sucesso! (Simulado)<br>
                                    Escolha outra aviso para editar.`;
                buscarAvisos(); // Atualiza a lista de notícias após a alteração
            } catch (error) {
                console.error('Erro ao alterar aviso:', error);
            }
        }

        buscarAvisos(); // Carrega as notícias ao iniciar a página