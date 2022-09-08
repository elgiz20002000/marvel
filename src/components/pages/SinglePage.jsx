
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import { Link, useParams } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component , dataType}) => {

    const {loading , error , getComics , getCharacter , clearError} = useMarvelService()
    const [data , setData] =  useState(null)
    const {id} = useParams()

    const onDataLoaded = (data) => {
        setData(data)
    }

    const onUpdateData = () => {
        clearError()
        if(!id) {
            return
        }
        switch(dataType) {
            case 'comics':
                getComics(id)
                .then(onDataLoaded)
                break;
            case'character':
            getCharacter(id)
                .then(onDataLoaded)
                break;
            default:
                break;
        }
    
    }

    useEffect(() => {
        onUpdateData()
    } ,[])

    

    useEffect(() => {
        onUpdateData()
    } , [id])


    let skeleton = loading || error || data ? null  : <Skeleton/> ,
    spinner = loading ? <Spinner/> : null ,
    errorMessage = error ? <ErrorMessage/> : null ,
    content = !(spinner || errorMessage || !data) ? <Component data={data}/> : null




    return (
        <>
            <AppBanner/>
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SinglePage;