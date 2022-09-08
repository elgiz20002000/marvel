import { useCallback, useState } from "react"
import { Helmet } from "react-helmet"
import AppBanner from "../appBanner/AppBanner"
import ComicsList from "../comicsList/ComicsList"
import ErrorBoundary from "../errorBoundary/errorBoundary"



const ComicsPage = () => {


        return (
            <>
              <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Marvel comics list</title>
                </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
            </>
        )
}


export default ComicsPage
