import { Fragment, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { IKContext } from 'imagekitio-react'
import { publicRoutes } from '~/routes'
import WebFont from 'webfontloader'
import fontList from '~/assets/fonts'

const urlEndpoint = '<YOUR_IMAGEKIT_URL_ENDPOINT>'
const publicKey = 'public_nIYvizBv0dfP7mdHJPhzSQ3Fx3w='
const authenticationEndpoint = 'http://localhost:3001/auth'

function App() {
    useEffect(() => {
        WebFont.load({
            ...fontList,
        })
    }, [])

    return (
        <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticationEndpoint={authenticationEndpoint}>
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
        </IKContext>
    )
}

export default App
