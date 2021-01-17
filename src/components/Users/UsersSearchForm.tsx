import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import React from "react"
import { getUsersFilter } from '../../redux/usersSelectors';
import { useSelector } from 'react-redux';

const usersSearchFormValidate = (values: any) => {
         const errors = {};   
         return errors
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type Friend = "null" | "true" | "false"
type FormType = {
  term: string
  friend: Friend
}

const UsersSearchForm: React.FC<PropsType> = (props) => {

  const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
            const filter: FilterType = {
              term: values.term,
              friend: values.friend === "null" ? null : values.friend === "true" ? true : false
            }
            props.onFilterChanged(filter)
            setSubmitting(false)
      }
  const filter = useSelector(getUsersFilter)    

  return <div>
    <Formik
       enableReinitialize={true}
       initialValues={{ term: filter.term, friend: String(filter.friend) as Friend }}
       validate={usersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
             <option value="null">All</option>
             <option value="true">Only followed</option>
             <option value="false">Only unfollowed</option>
           </Field>
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
    
  </div>
}

export default UsersSearchForm