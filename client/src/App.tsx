import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from '~/components/Layout'
import ChallengeDetail, { CHALLENGE_DETAIL_ROUTE } from '~/pages/ChallengeDetail'
import Home, { HOME_ROUTE } from '~/pages/Home'

import CreateChallenge, { CREATE_CHALLENGE_ROUTE } from './pages/CreateChallenge'
import Setting, { SETTING_ROUTE } from './pages/Setting'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={SETTING_ROUTE} element={<Setting />} />
        <Route path={CREATE_CHALLENGE_ROUTE} element={<CreateChallenge />} />
        <Route path={`${CHALLENGE_DETAIL_ROUTE}/:challengeId`} element={<ChallengeDetail />} />
      </Routes>
    </Layout>
  )
}

export default App
