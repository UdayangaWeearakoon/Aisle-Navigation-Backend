const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  pw_hash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date },
  is_active: { type: Boolean, default: true },
  hire_date: { type: Date, required: true },
  job_title: { type: String, required: true },
  salary: { type: Number, required: true },
  overtime: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Overtime' }],
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

module.exports = mongoose.model('User', userSchema);