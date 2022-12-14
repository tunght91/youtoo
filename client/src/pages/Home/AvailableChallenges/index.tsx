import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fromUnixTime } from 'date-fns'

import { Card, CardActions, CardContent, Typography } from '@mui/material'

import Button from '~/components/Button'
import Container from '~/components/Layout/Container'
import configs from '~/configurations'
import { CHALLENGE_DETAIL_ROUTE } from '~/pages/ChallengeDetail'
import { selectChallenges } from '~/state/reducers/app'
import Http from '~/utils/httpUtils'

import Ribbon from '../components/Ribbon'
import { IChallenge } from '../types'

const AvailalbeChallenges = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [challenges, setChallenges] = useState<IChallenge[]>([])
  const onHandleNavigateToDetail = (id: string) => {
    console.log(id, 'id ?')
    navigate(`${CHALLENGE_DETAIL_ROUTE}/${id}`)
  }
  useEffect(() => {
    const fetchChallengeList = async () => {
      try {
        setIsLoading(true)
        const { data } = await Http.get(`/Challenges`)
        setChallenges(data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchChallengeList()
  }, [])

  return (
    <Container isLoading={isLoading}>
      {challenges.map(({ name, description, params, _id }) => {
        return (
          <Card
            key={_id}
            sx={{
              backgroundColor: 'secondary.dark',
              position: 'relative',
              overflow: 'visible',
              padding: (theme) => theme.spacing(1),
              margin: (theme) => theme.spacing(0, 0, 4, 0),
            }}
          >
            {/* <Ribbon type={type} /> */}
            <CardContent>
              <Typography gutterBottom variant="h2">
                {name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="subtitle1">
                {description}
              </Typography>
              <Typography variant="subtitle1">Thời gian: {fromUnixTime(params.startAt / 1000).toString()}</Typography>
              {/* <Typography variant="subtitle1">Quỹ thưởng: ${prize}</Typography> */}
              <Typography variant="subtitle1">Số tiền cam kết tối thiểu: ${params.depositAmount}</Typography>
              {/* <Typography variant="subtitle1" fontWeight={800}>
                  {numberOfCommittedPeople} người đăng ký tham gia
                </Typography> */}
            </CardContent>
            <CardActions>
              <Button onClick={() => onHandleNavigateToDetail(_id)} variant="contained">
                Details
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </Container>
  )
}

export default AvailalbeChallenges
