import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'This email is invalid',
        },
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This username already exists',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.hashPassword();
      },
      beforeUpdate: (user) => {
        if (user.changed('password')) {
          user.hashPassword();
        }
      },
      beforeBulkCreate: (users) => {
        users.forEach(function (user) {
          user.hashPassword();
        });
      },
      beforeBulkUpdate: (users) => {
        users.forEach(function (user) {
          if (user.changed('password')) {
            user.hashPassword();
          }
        });
      },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'Todos',
    });
  };

  // Instance Method
  User.prototype.hashPassword = function hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  };

  return User;
};
