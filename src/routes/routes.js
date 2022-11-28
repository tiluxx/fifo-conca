import config from '~/config'

// Layouts
import { HomeLayout, WorkspaceLayout } from '~/layouts'

import Home from '~/pages/Home'
import Workspace from '~/pages/Workspace'
import NotFound from '~/pages/NotFound'

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HomeLayout },
    { path: config.routes.workspace, component: Workspace, layout: WorkspaceLayout },
    { path: config.routes.notFound, component: NotFound, layout: null },
]

export { publicRoutes }
