import { Text } from '../../components';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'

interface PersonalPage {
  fullName: string;
  emailAddress: string;
  dateOfBirth: string;
}

const initialValues = {
  fullName: '',
  emailAddress: '',
  dateOfBirth: ''
}

interface PersonalWrapper {
  onNext: () => void;
}

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Fullname can't be blank."),
  emailAddress: yup
    .string()
    .email("Please insert a valid email address")
    .required("Email address can't be blank"),
  dateOfBirth: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/,
      'Date of birth must be in the format mm-dd-yyyy'
    )
    .required('Date of birth is required'),
});

const PersonalInformation: React.FC<PersonalWrapper> = ({onNext}) => {

  const handleSubmit = (values: PersonalPage) => {
    console.log(values)
  }

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })

  const handleNext =() =>{
    formMik.handleSubmit()
    if (formMik.isValid){
      onNext();
    }
  }

  return (
    <form onSubmit={formMik.handleSubmit}>
      <div>
        <Text>Full Name: </Text>
        <Input name={'fullName'}
          value={formMik.values.fullName}
          onChange={formMik.handleChange('fullName')}
          status={formMik.errors.fullName && 'error'}
          placeholder="Steve Jobs"
        />
        {formMik.errors.fullName && (
          <Text>{formMik.errors.fullName}</Text>
        )}
      </div>
      <div>
        <Text>Email Address: </Text>
        <Input name={'emailAddress'}
          value={formMik.values.emailAddress}
          onChange={formMik.handleChange('emailAddress')}
          status={formMik.errors.emailAddress && 'error'}
          placeholder="email@example.com"
        />
        {formMik.errors.emailAddress && (
          <Text>{formMik.errors.emailAddress}</Text>
        )}
      </div>
      <div>
        <Text>Date of Birth: </Text>
        <Input
          name={'dateOfBirth'}
          value={formMik.values.dateOfBirth}
          onChange={formMik.handleChange('dateOfBirth')}
          status={formMik.errors.dateOfBirth && 'error'}
          placeholder="Enter your date of birth (mm-dd-yyyy)"
        />
        {formMik.errors.dateOfBirth && (
          <Text>{formMik.errors.dateOfBirth}</Text>
        )}
      </div>

      <Button type={'primary'} htmlType={"submit"} onClick={handleNext}>Next</Button>
    </form>
  )
}

export default PersonalInformation