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

import { Link, useLocation } from 'react-router-dom'

import classnames from 'classnames'

import logo from 'assets/logo.svg'
import ConnectWallet from 'components/ConnectWallet/ConnectWallet'
import { routes } from 'pages/Router'

import type { RouteConfig } from 'pages/Router'

interface NavLinkProps {
  route: RouteConfig
}

function NavLink({ route }: NavLinkProps) {
  const location = useLocation()
  const isSelected = location.pathname === route.path

  return (
    <Link
      className={classnames('mr-12 font-semibold', {
        'text-gumdrop-500': isSelected,
        'text-licorice-200 hover:text-gumdrop-200 focus:text-gumdrop-200':
          !isSelected,
      })}
      to={route.path}
    >
      {route.label}
    </Link>
  )
}

function Nav() {
  return (
    <nav className="flex w-full flex-row items-center p-6">
      <Link className="flex flex-row items-center" to="/">
        <img className="inline h-12" src={logo} alt="logo" />
        <span className="ml-4 text-2xl font-semibold text-white">
          Cross-Chain Transfer Protocol
        </span>
      </Link>

      <div className="ml-auto">
        {routes
          .filter((route) => route.nav)
          .map((route) => (
            <NavLink key={route.path} route={route} />
          ))}

        <ConnectWallet />
      </div>
    </nav>
  )
}

export default Nav
