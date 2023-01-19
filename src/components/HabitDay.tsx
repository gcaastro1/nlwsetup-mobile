import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from 'react-native'

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const DaySize =
  Dimensions.get('screen').width / weekDays - (screenHorizontalPadding + 5)

interface Props extends TouchableOpacityProps {}

export const HabitDay = ({ ...rest }: Props) => {
  return (
    <TouchableOpacity
      className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
      style={{ width: DaySize, height: DaySize }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}
