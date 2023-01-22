import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { DaySize, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'

import { api } from '../lib/axios'
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimunSymmaryDateSizes = 18 * 5
const amountOfDaysToFill = minimunSymmaryDateSizes - datesFromYearStart.length

type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

export const Home = () => {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation()

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('summary')
      setSummary(data)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possivel carregar o sumário de hábitos;')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className='flex-1 bg-background px-8 py-16'>
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DaySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {summary && (
          <View className='flex-row flex-wrap'>
            {datesFromYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })
              return (
                <HabitDay
                  key={date.toISOString()}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amounteCompleted={dayWithHabits?.completed}
                />
              )
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                <View
                  key={i}
                  className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                  style={{ width: DaySize, height: DaySize }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
