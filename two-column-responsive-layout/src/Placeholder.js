import React from 'react'
import { css } from 'glamor'
import View from '@allthings/react-view'
import { alpha, ColorPalette } from '@allthings/colors'

import Text from '@allthings/elements/atoms/Text'
import Icon from '@allthings/elements/atoms/Icon'

// The ugly flex hacks are necessary for IE 11 🙀.
const Placeholder = () => (
  <View
    direction="column"
    alignV="center"
    alignH="space-around"
    {...css({
      background: ColorPalette.whiteIntense,
      flex: '1 0 100%!important',
    })}
  >
    <View
      flex="flex"
      direction="column"
      alignV="center"
      alignH="space-around"
      {...css({ flex: '1 0 100%!important', maxWidth: 320, maxHeight: 500 })}
    >
      <Text size="xl" color="secondary" strong align="center">
        This is a placeholder
      </Text>
      <View
        {...css({
          border: '10px solid #fff',
          borderRadius: '50%',
          padding: 35,
          boxShadow: '0 0 14px 0 rgba(0,0,0,0.05)',
        })}
      >
        <Icon
          name="list-bullets-filled"
          size={100}
          color={alpha(ColorPalette.grey, 0.25)}
        />
      </View>
      <Text align="center" color="grey">
        You can see some categories on the left...
      </Text>
    </View>
  </View>
)

export default Placeholder
