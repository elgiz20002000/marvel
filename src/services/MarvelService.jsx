import useHttp from "../hooks/http.hook"



const useMarvelService = () => {
    const _apiBase = `https://gateway.marvel.com:443/v1/public/`
    const _apiKey = `apikey=0807b3851d1dd789c145f77155d53596`
    const _offsetValue = 210

    const {request , clearError , process , setProcess} = useHttp()

  

   const getAllCharacters = async (offset = _offsetValue) => {
        let res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacterByName = async (name) => {
        let res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        let res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _offsetValue) => {
        let res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComics = async (id) => {
        let res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }


    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url ,
            comics:char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? `${comics.description.slice(0, 210)}...` : 'There is no description for character',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price:comics.prices[0].price  ? comics.prices[0].price + " $" : 'NOT AVAILABLE' ,
            pages:comics.pageCount ? `${comics.pageCount} ` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',
        }
    }

    return { clearError , getAllCharacters, getCharacter , getAllComics , getComics , getCharacterByName , process , setProcess}
}

 


export default useMarvelService