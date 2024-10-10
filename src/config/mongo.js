const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yjcrlyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    
    // Conexão sem as opções deprectadas
    await mongoose.connect(uri);

    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro de conexão no MongoDB:', error);
    process.exit(1); // Sai da aplicação em caso de erro
  }
};

module.exports = mongoConnect;
