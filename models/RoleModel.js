const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true }
  });
  
  module.exports = mongoose.model('Role', roleSchema);