import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../_global/theme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	textInput: {
		margin: 1.5,
		borderWidth: 1,
		paddingHorizontal: 5,
		padding: 7,
		borderColor: colors.primary,
		borderRadius: 50,
		backgroundColor: 'white',
		...Platform.select({
			ios: {
				height: 30
			},
			android: {
				height: 40
			}
		})
	},
	searchboxBorder: {
        borderRadius: 50,
        borderColor: colors.primary,
        borderWidth: 2,
		backgroundColor: 'white',
		//paddingHorizontal: 3
	},
	searchbox: {
		backgroundColor: 'white',
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginBottom: 16,
		borderRadius: 50,
	},
	seperator: {
		marginTop: 10,
		backgroundColor: 'white'
	}
});

export default styles;
