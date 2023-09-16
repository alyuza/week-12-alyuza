import { Text } from '../../components';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup'

interface AddressPage {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressWrapper {
  onNext:()=> void;
  onPrev:()=> void;
}

const initialValues = {
  streetAddress: '',
  city: '',
  state: '',
  zipCode: ''
}

const validationSchema = yup.object({
  streetAddress: yup
    .string()
    .required(`Sorry, street address can't be blank.`),
  city: yup
    .string()
    .required(`Sorry, city can't be blank.`),
  state: yup
    .string()
    .required(`Sorry, state can't be blank.`),
  zipCode: yup
    .string()
    .required(`Sorry, zip code can't be blank.`)
    .length(5)
    .matches(/^[0-9]{5}/)
})

const AddressInformation : React.FC<AddressWrapper> = ({onNext,onPrev}) => {

  const handleSubmit = (values: AddressPage) => {
    console.log(values)
  }

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const handleNext =() =>{
    if (formMik.isValid){
      onNext();
    }
  }

  return (
    <form onSubmit={formMik.handleSubmit}>
      <div>
        <Text>Street Address: </Text>
        <Input name={'streetAddress'}
          value={formMik.values.streetAddress}
          onChange={formMik.handleChange('streetAddress')}
          status={formMik.errors.streetAddress && 'error'}
          placeholder='Semolowaru Indah II'
        />
        {formMik.errors.streetAddress && (
          <Text>{formMik.errors.streetAddress}</Text>
        )}
      </div>
      <div>
        <Text>City: </Text>
        <Input name={'city'}
          value={formMik.values.city}
          onChange={formMik.handleChange('city')}
          status={formMik.errors.city && 'error'}
          placeholder='Surabaya'
        />
        {formMik.errors.city && (
          <Text>{formMik.errors.city}</Text>
        )}
      </div>
      <div>
        <Text>State: </Text>
        <Input name={'state'}
          value={formMik.values.state}
          onChange={formMik.handleChange('state')}
          status={formMik.errors.state && 'error'}
          placeholder='Indonesia'
        />
        {formMik.errors.state && (
          <Text>{formMik.errors.state}</Text>
        )}
      </div>
      <div>
        <Text>Zip Code: </Text>
        <Input name={'zipCode'}
          value={formMik.values.zipCode}
          onChange={formMik.handleChange('zipCode')}
          status={formMik.errors.zipCode && 'error'}
          placeholder='60119'
        />
        {formMik.errors.zipCode && (
          <Text>{formMik.errors.zipCode}</Text>
        )}
      </div>
      <Button type={'primary'} htmlType={"submit"} onClick={onPrev}>Previous</Button>
      <Button type={'primary'} htmlType={"submit"} onClick={handleNext}>Next</Button>
    </form>
  )
}


export default AddressInformation