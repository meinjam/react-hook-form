import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const messages = (type, value) => {
  if (type === 'required') {
    return `This ${value} field is required.`;
  }

  if (type === 'positive') {
    return `This ${value} field can not be zero or negative.`;
  }

  if (type === 'number') {
    return `This ${value} field must be a number input.`;
  }

  return 'This field is required.';
};

const numberPattern = /^01\d{9}$/;
const agePattern = /^(1[2-9]|[2-9]\d)$/;

const schema = yup.object().shape({
  fullName: yup.string().required(messages('required', 'full name')),
  email: yup.string().email().required(messages('required', 'email')),
  phone: yup
    .string()
    .required(messages('required', 'number'))
    .matches(numberPattern, 'Phone number must be 11 digit and bangladeshi number.'),
  age: yup.string().required(messages('required', 'age')).matches(agePattern, 'Please enter a valid age.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 character.')
    .max(20)
    .required(messages('required', 'password')),
  confirmPassword: yup
    .string()
    .required(messages('required', 'confirm password'))
    .oneOf([yup.ref('password'), null]),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className='mx-1 mx-md-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='d-flex flex-row align-items-center mb-4'>
        <i className='fas fa-user fa-lg me-3 fa-fw' />
        <div className='form-outline flex-fill mb-0'>
          <input type='text' className='form-control' {...register('fullName')} placeholder='Enter your full name' />
          {errors.fullName && <small className='text-danger'>{errors.fullName.message}</small>}
        </div>
      </div>
      <div className='d-flex flex-row align-items-center mb-4'>
        <i className='fas fa-envelope fa-lg me-3 fa-fw' />
        <div className='form-outline flex-fill mb-0'>
          <input type='email' placeholder='Enter your email' className='form-control' {...register('email')} />
          {errors.email && <small className='text-danger'>{errors.email.message}</small>}
        </div>
      </div>
      <div className='d-flex flex-row align-items-center mb-4'>
        <i className='fas fa-envelope fa-lg me-3 fa-fw' />
        <div className='form-outline flex-fill mb-0'>
          <input
            type='number'
            placeholder='Enter your number'
            className='form-control number-hide-arrow'
            {...register('phone')}
            onKeyDown={(e) => (e.keyCode === 38 || e.keyCode === 40) && e.preventDefault()}
          />
          {errors.phone && <small className='text-danger'>{errors.phone.message}</small>}
        </div>
      </div>
      <div className='d-flex flex-row align-items-center mb-4'>
        <i className='fas fa-lock fa-lg me-3 fa-fw' />
        <div className='form-outline flex-fill mb-0'>
          <input type='password' className='form-control' placeholder='Enter password' {...register('password')} />
          {errors.password && <small className='text-danger'>{errors.password.message}</small>}
        </div>
      </div>
      <div className='d-flex flex-row align-items-center mb-4'>
        <i className='fas fa-key fa-lg me-3 fa-fw' />
        <div className='form-outline flex-fill mb-0'>
          <input
            type='password'
            {...register('confirmPassword')}
            placeholder='Confirm password'
            className='form-control'
          />
          {errors.confirmPassword && <small className='text-danger'>Password and confirm password doesn't match</small>}
        </div>
      </div>
      <div className='d-flex flex-row align-items-center mb-4'>
        <i className='fas fa-user fa-lg me-3 fa-fw' />
        <div className='form-outline flex-fill mb-0'>
          <input
            type='number'
            className='form-control number-hide-arrow'
            {...register('age')}
            placeholder='Enter your age'
            onKeyDown={(e) => (e.keyCode === 38 || e.keyCode === 40) && e.preventDefault()}
          />
          {errors.age && <small className='text-danger'>{errors.age.message}</small>}
        </div>
      </div>
      <div className='d-flex justify-content-start mx-4 mb-3 mb-lg-4'>
        <button type='submit' className='btn btn-primary btn-lg'>
          Register
        </button>
        <button
          type='button'
          className='ms-2 btn btn-secondary btn-lg'
          onClick={() => {
            setValue('fullName', 'John Doe');
            setValue('email', 'john@gmail.com');
            setValue('password', 'abc12345');
            setValue('confirmPassword', 'abc12345');
            setValue('age', '40');
            setValue('phone', '01685970744');
            clearErrors();
          }}
        >
          Edit
        </button>
        <button
          type='button'
          className='ms-2 btn btn-info btn-lg'
          onClick={() => {
            setValue('fullName', '');
            setValue('email', '');
            setValue('password', '');
            setValue('confirmPassword', '');
            setValue('age', '');
            setValue('phone', '');
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Form;
