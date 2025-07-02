export const firstName_validation = {
  name: 'first_name',
  label: 'first_name',
  type: 'text',
  id: 'first_name',
  placeholder: 'first name',
  validation: {
    required: {
      value: true,
      message: 'name is required',
    }
  },
}
export const lastName_validation = {
  name: 'last_name',
  label: 'last_name',
  type: 'text',
  id: 'last_name',
  placeholder: 'last name',
  validation: {
    required: {
      value: true,
      message: 'last name is required',
    }
  },
}
export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'Password',
  type: 'password',
  id: 'password',
  placeholder: 'password',
  validation: {
    required: {
      value: true,
      message: 'password is required.',
    }
  },
}

export const password_register_validation = {
  name: 'password',
  label: 'Password',
  type: 'password',
  id: 'password',
  placeholder: 'password',
  validation: {
    required: {
      value: true,
      message: 'password is required.',
    },
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters.',
    },
  },
}

export const num_validation = {
  name: 'num',
  label: 'number',
  type: 'number',
  id: 'num',
  placeholder: 'write a random number',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const email_validation = {
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'email address',
  validation: {
    required: {
      value: true,
      message: 'email is required.',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'email address is not valid',
    },
  },
}
export const termsAndConditions_validation = {
  name: '',
  label: 't&cs',
  type: 'checkbox',
  placeholder:'',
  id: 't&cs',
  validation: {
    required: {
      value: true,
      message: 'check is required.',
    }
  },
}