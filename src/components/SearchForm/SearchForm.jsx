
import { ErrorMessage as FormikErrorMessage, Field, Form, Formik } from 'formik'
import  ErrorMessage  from '../errorMessage/errorMessage'
import { useState } from 'react'
import {NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService'
import './search_form.scss'


export const SearchForm = () => {
    const {getCharacterByName , clearError  , process , setProcess} = useMarvelService()
    const [char , setChar] = useState()

    const updateChar = (name) => {
        clearError()

        getCharacterByName(name).then(char =>
            setChar(char)
        ).then(() => setProcess('confirmed'))
    }

    const errorMessage = process === 'error' ? <div className="search_critical_error"><ErrorMessage/></div> : null
    const results = !char ?  null : char.length > 0 ? 
        <div className="search_wrapper">
            <div className="search_success">There is! Visit {char[0].name} page?</div>
            <NavLink  to={'/character/' + char[0].id}  className="button button__secondary">
                <div className="inner">to page</div>
            </NavLink>
        </div> : <div className="search_error">The character was not found. Check the name and try again</div>
    
    
    return (
        <div className='search'>
        <Formik
        initialValues={{
            name:''
        }}
        onSubmit={({name}) => updateChar(name)}        
        validationSchema={Yup.object({
            name:Yup.string().required('This field is required')
        })}>
            <Form>
                <label htmlFor="name">Or find a character by name:</label>
                <Field type="text" name="name" id="" placeholder='Enter name'/>
                <button disabled={process === 'loading'} type='submit' className="button button__main">
                    <div className="inner">find</div>
                </button>
                <FormikErrorMessage component='div' name='name' className='error'/>
            </Form>
        </Formik>
        {results}
        {errorMessage}
        </div>
    )
}