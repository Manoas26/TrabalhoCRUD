const avisoForm = document.querySelector('#avisoForm');
const avisoTitleInput = document.querySelector('#avisoTitle');
        
const PUBLISHABLE_KEY = 'sb_publishable_EHfkh_trzI6LdvCrSFj-MQ_-QcYvmcd';
const API_URL = 'https://fhxobambvomypoovedvh.supabase.co/rest/v1/Tabelalegal';

      
        
        //Ouvintes de eventos
avisoForm.addEventListener('submit', criarAviso);
        
async function criarAviso(e) {
    e.preventDefault(); 

    const avisoData = {
        aviso: avisoTitleInput.value
    };
            
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                apikey: PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify(avisoData)
        });
        const newAviso = await response.json();
        mensagem.innerHTML = `Aviso criado com sucesso! <br>
                              Preencha o formulário novamente para criar outro aviso.`;
        avisoForm.reset();
    } catch (error) {
        console.error('Erro ao criar aviso:', error);
    }
}
