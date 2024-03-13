/**
 * Copyright 2023 Circle Internet Financial, LTD.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from 'layouts/AppLayout'

import Redeem from './Redeem/Redeem'
import Send from './Send/Send'
import Transactions from './Transactions/Transactions'

export interface RouteConfig {
  path: string
  label: string
  component: React.ComponentType
  nav: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Transfer',
    component: Send,
    nav: true,
  },
  {
    path: '/redeem',
    label: 'Redeem',
    component: Redeem,
    nav: false,
  },
  {
    path: '/transactions',
    label: 'Transactions',
    component: Transactions,
    nav: false,
  },
]

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Page = route.component
        return <Route key={route.path} path={route.path} element={<Page />} />
      })}
    </Routes>
  )
}

function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  )
}

export default Router
