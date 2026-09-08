require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Importando o Multer
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Configuração do Multer para guardar a foto na memória RAM
const upload = multer({ storage: multer.memoryStorage() });

// GET: Consultar Perfil (Agora enviando a foto em Base64)
app.get('/perfil/:id', async (req, res) => {
    try {
        const [user] = await db.query('SELECT nome, email, setor, turno, foto FROM operadores WHERE id = ?', [req.params.id]);
        
        if (user.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });

        const operador = user[0];
        
        // Se houver foto no banco (BLOB), converte para Base64 para o React Native entender
        if (operador.foto) {
            operador.foto = operador.foto.toString('base64');
        }

        res.json(operador);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar perfil" });
    }
});

// PATCH: Atualizar APENAS a foto (Usamos upload.single para extrair o arquivo)
app.patch('/perfil/:id/foto', upload.single('foto'), async (req, res) => {
    try {
        const fotoBuffer = req.file ? req.file.buffer : null;
        
        if (!fotoBuffer) {
            return res.status(400).json({ error: "Nenhuma foto foi enviada." });
        }

        await db.query('UPDATE operadores SET foto = ? WHERE id = ?', [fotoBuffer, req.params.id]);
        res.json({ message: "Foto do crachá atualizada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar a foto" });
    }
});

// PUT: Atualizar Perfil (Setor e Turno)
app.put('/perfil/:id', async (req, res) => {
    const { setor, turno } = req.body;
    await db.query('UPDATE operadores SET setor = ?, turno = ? WHERE id = ?', [setor, turno, req.params.id]);
    res.json({ message: "Perfil atualizado com sucesso!" });
});
//POST /perfil/:id/checkin (Registra a localização GPS do operador)
app.post('/perfil/:id/checkin', async (req, res) => {
    const {id} = req.params;
    const {latitude, longitude} = req.body;
    
    if (!latitude || !longitude) {
        return res.status(400).json({error: 'Cordenadas GPS não informadas.'});
    }

    //Tratamento de erros 
    try{
        await db.query(
            'INSERT INTO checkins_operador (operador_id, latitude, longitude) VALUES (?, ?, ?)',
            [id, latitude, longitude]
        );
        
        console.log(`[PERFIL] Check-in registrado para o Operador ID ${id} em Lat: ${latitude} e Lon: ${longitude}`);
        res.status(201).json({message: 'Pressença confirmada no posto de trabalho com sucesso!'});

    }catch (error){
        console.error(erro);
        res.status(500).json({error: 'Erro ao registrar check-in no banco de dados.'});
    }
});




// DELETE: Excluir Perfil
app.delete('/perfil/:id', async (req, res) => {
    await db.query('DELETE FROM operadores WHERE id = ?', [req.params.id]);
    res.json({ message: "Conta excluída." });
});

app.listen(3002, () => console.log('Serviço de Perfil rodando na porta 3002'));