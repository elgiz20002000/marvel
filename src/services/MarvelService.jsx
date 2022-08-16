class MarvelService {

    _apiBase = `https://gateway.marvel.com:443/v1/public/`
    _apiKey = `apikey=0807b3851d1dd789c145f77155d53596`
    _offsetValue = 210

    async getResource(url) {
        let res = await fetch(url)

        if(!res.ok) {
            throw new Error(`Could not fetch ${url} , status: ${res.status}`)
        }

        return await res.json()
    }

    async getAllCharacters(offset = this._offsetValue) {
        let res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    async getCharacter(id) {
        let res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter(char) {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url ,
            comics:char.comics.items
        }
    }
}

export default MarvelService