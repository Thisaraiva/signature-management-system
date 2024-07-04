const path = require('path'); // Adicione esta linha
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Importe o bcrypt para hash de senha
const jwt = require('jsonwebtoken'); // Importe o jsonwebtoken para geração de tokens

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

/*// Import User model
const User = require('../models/User');*/

// Caminho absoluto para o modelo User
const User = require(path.join(__dirname, '../app/models/User'));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/signature_management';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifique se o usuário existe no banco de dados
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verifique se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Gere um token JWT válido por um período de tempo (por exemplo, 1 hora)
    const token = jwt.sign({ userId: user._id }, 'secretpassword', { expiresIn: '1h' });

    // Retorne o token JWT como resposta
    res.status(200).json({ token });

  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota de registro
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });

  } catch (error) {
    console.error('Erro durante o registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota de registro de novo funcionário
app.post('/api/register-employee', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verifique se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário com o modelo User
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Salva o novo usuário no banco de dados
    await newUser.save();

    // Resposta de sucesso
    res.status(201).json({ message: 'Funcionário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro durante o registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});


// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso não autorizado.' });
  }

  try {
    const decoded = jwt.verify(token, 'secretpassword');
    req.userId = decoded.userId; // Adicione o userId à solicitação para uso posterior
    next();
  } catch (error) {
    console.error('Token inválido:', error);
    res.status(403).json({ message: 'Token inválido. Acesso não autorizado.' });
  }
};

// Exemplo de uso do middleware para uma rota protegida
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Rota protegida alcançada com sucesso.' });
});

// Rota de teste para verificar se o servidor está respondendo
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
