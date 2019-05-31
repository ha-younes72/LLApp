const validation = {
    email: {
      presence: {
        message: '^Please enter an email address'
      },
      email: {
        message: '^Please enter a valid email address'
      }
    },
    
    firstname: {
        presence:{
            message: '^Please enter a first name'
        },
        length: {
          minimum: 2,
          message: '^Please enter a first name'
        }
    },
    
    password: {
      presence: {
        message: '^Please enter a password'
      },
      length: {
        minimum: 5,
        message: '^Your password must be at least 5 characters'
      }
    }
  }
  
  export default validation