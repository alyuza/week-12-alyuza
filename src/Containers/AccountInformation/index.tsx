import { Text } from '../../components';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'

interface AddressPage {
  username: string;
  password: string;
}

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required(`Username can't be blank.`)
    .matches(/^\S*$/, 'Username cannot contain whitespace.'), // Added no whitespace validation
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, Uppercase, Lowercase, Number and special case Character"
    ),
});


const AccountInformation = () => {

  const handleSubmit = (values: AddressPage) => {
    console.log(values)
  }

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })

  return (
    <form onSubmit={formMik.handleSubmit}>
      <div>
        <Text>Username: </Text>
        <Input name={'username'}
          value={formMik.values.username}
          onChange={formMik.handleChange('username')}
          status={formMik.errors.username && 'error'}
          placeholder='helloworld'
        />
        {formMik.errors.username && (
          <Text>{formMik.errors.username}</Text>
        )}
      </div>
      <div>
        <Text>Password: </Text>
        <Input name={'password'}
          type = {"password"}
          value={formMik.values.password}
          onChange={formMik.handleChange('password')}
          status={formMik.errors.password && 'error'}
          placeholder='************'
        />
        {formMik.errors.password && (
          <Text>{formMik.errors.password}</Text>
        )}
      </div>
      <Button type={'primary'} htmlType={"submit"}>Submit</Button>
    </form>
  )
}


export default AccountInformation