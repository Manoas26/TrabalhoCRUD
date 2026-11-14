const PUBLISHABLE_KEY = 'sb_publishable_EHfkh_trzI6LdvCrSFj-MQ_-QcYvmcd';
        const API_URL = 'https://fhxobambvomypoovedvh.supabase.co/rest/v1/Tabelalegal';

        const avisosContainer = document.querySelector('#avisosContainer');
       
        

        //O Json com os dados do servidor será armazenado nesta variável
        let localavisos = [];

        // READ - Buscar as avisos *********
        async function buscaravisos() {
            try {
                const response = await fetch(`${API_URL}`,
                    {
                        headers: {
                        apikey: PUBLISHABLE_KEY,
                        Accept: 'application/json'
                        }
                    }
                );
                
                localavisos = await response.json();
                renderavisos();
            } catch (error) {
                avisosContainer.innerHTML = 'Erro ao carregar os dados.';
            }
        }

        // Renderizar os elementos na tela
        function renderavisos() {
            if (localavisos.length === 0) {
                avisosContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
                return;
            }

            localavisos.forEach(Tabelalegal => {
                avisosContainer.innerHTML += `
                    <div class="Tabelalegal-card" id="Tabelalegal-${Tabelalegal.id}">
                        <h3>${Tabelalegal.aviso}</h3>
                    </div>
                `;
            });
        }
        buscaravisos(); // Carrega as notícias ao iniciar a página

        console.log("ta funcionando chefe");