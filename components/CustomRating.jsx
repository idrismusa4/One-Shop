import { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

function CustomRating({ defaultRating }) {
    const { themeStyles } = useContext(ThemeContext);
    const maxRating = [1, 2, 3, 4, 5];
    return(
      <View style={themeStyles.customRatingBarStyle}>
        {
          maxRating.map((item, index) => {
            return (
              item <= defaultRating
                ? <MaterialIcons key={index} name='star' size={20} color='yellow' />
                : <MaterialIcons key={index} name='star-border' size={20} color='yellow' />
            );
          })
        }
      </View>
    );
}

export default CustomRating;
