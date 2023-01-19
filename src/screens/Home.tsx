import { useNavigation } from '@react-navigation/native'
import { View, Text, ScrollView } from 'react-native'
import { DaySize, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimunSymmaryDateSizes = 18 * 5
const amountOfDaysToFill = minimunSymmaryDateSizes - datesFromYearStart.length

export const Home = () => {
  const { navigate } = useNavigation()

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
        <View className='flex-row flex-wrap'>
          {datesFromYearStart.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate('habit', { date: date.toISOString() })}
            />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <View
                key={i}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                style={{ width: DaySize, height: DaySize }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}
