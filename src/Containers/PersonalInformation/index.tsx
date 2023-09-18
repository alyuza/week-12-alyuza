import { Text } from '../../components';
import { Card, Button, Input, Form } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'

interface PersonalPage {
  fullName: string;
  emailAddress: string;
  dateOfBirth: string;
}
interface PersonalWrapper {
  onNext: () => void;
}

const initialValues = {
  fullName: 'Steve Jobs',
  emailAddress: 'email@example.com',
  dateOfBirth: '09-18-1997'
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
    .required('Date of Birth is required')
    .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/, 'date format mm-dd-yyyy')
});

const PersonalInformation: React.FC<PersonalWrapper> = ({ onNext }) => {

  const handleSubmit = (values: PersonalPage) => {
    console.log(values)
  }

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })

  const handleNext = () => {
    formMik.handleSubmit()
    if (formMik.isValid) {
      onNext();
    }
  }

  return (
    <Card title={'Address Information'}>
      <Form>
        <div>
          <Text>Full Name: </Text>
          <Input name={'fullName'}
            value={formMik.values.fullName}
            onChange={formMik.handleChange('fullName')}
            status={formMik.errors.fullName && 'error'}
          />
          {formMik.errors.fullName && (
            <Text >{formMik.errors.fullName}</Text>
          )}
        </div>
        <div>
          <Text>Email Address: </Text>
          <Input name={'emailAddress'}
            value={formMik.values.emailAddress}
            onChange={formMik.handleChange('emailAddress')}
            status={formMik.errors.emailAddress && 'error'}
          />
          {formMik.errors.emailAddress && (
            <Text>{formMik.errors.emailAddress}</Text>
          )}
        </div>
        <div>
          <Text>Date of Birth: </Text>
          <Input name={'dateOfBirth'}
            value={formMik.values.dateOfBirth}
            onChange={formMik.handleChange('dateOfBirth')}
            status={formMik.errors.dateOfBirth && 'error'}
          />
          {formMik.errors.dateOfBirth && (
            <Text>{formMik.errors.dateOfBirth}</Text>
          )}
        </div>

        <Button style={{ margin: '12px' }} type={'primary'} htmlType={"submit"} onClick={handleNext}>Next</Button>
      </Form>
    </Card>
  )
}

export default PersonalInformation