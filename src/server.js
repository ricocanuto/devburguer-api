import app from './app.js'
import './database/index.js'

// Se process.env.PORT não existir (localmente), ele usa a 3001. Na Render, usará a porta correta deles.
const port = process.env.PORT || 3001;

// Adicionamos '0.0.0.0' para permitir conexões externas na nuvem
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}...`);
});