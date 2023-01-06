import { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

function ProfileAction({ action, action_icon, ...otherProps }) {
    const { themeStyles } = useContext(ThemeContext);
    return (
        <TouchableOpacity style={themeStyles.profileAction} { ...otherProps }>
            {action_icon}
            <Text style={{ marginLeft: 20, fontSize: 15 }}>{action}</Text>
            {action !== "Logout" && <MaterialIcons name="arrow-forward-ios" size={24} color="black" style={{ marginLeft: 'auto' }} />}
        </TouchableOpacity>
    );
}

export default ProfileAction;
