import { Fragment, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import WebFont from 'webfontloader'
import fontList from '~/assets/fonts'

function App() {
    useEffect(() => {
        WebFont.load({
            ...fontList,
        })
    }, [])

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component

                    let Layout

                    if (route.layout) {
                        Layout = route.layout
                    } else {
                        Layout = Fragment
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </div>
    )
}

export default App
