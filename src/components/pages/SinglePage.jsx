
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { useParams } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';
import { setContent } from '../utils/setContent';

const SinglePage = ({Component , dataType}) => {

    const {getComics , getCharacter , clearError , process , setProcess} = useMarvelService()
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
                .then(() => setProcess('confirmed'))
                break;
            case'character':
            getCharacter(id)
                .then(onDataLoaded)
                .then(() => setProcess('confirmed'))
                break;
            default:
                break
        }
    
    }

    useEffect(() => {
        onUpdateData()
    } ,[])

    

    useEffect(() => {
        onUpdateData()
    } , [id])







    return (
        <>
            <AppBanner/>
            {setContent(process , Component , data)}
        </>
    )
}

export default SinglePage;