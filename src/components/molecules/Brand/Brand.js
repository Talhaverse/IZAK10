import { StyleSheet, View } from 'react-native';
// import LogoLight from '@/theme/assets/images/tom_light.png';
import LogoDark from '@/theme/assets/images/tom_dark.png';
import logo from '@/theme/assets/images/logo.png';
import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
function Brand({ height, width, mode }) {
    const { layout } = useTheme();
    if (!isImageSourcePropType(logo) || !isImageSourcePropType(logo)) {
        throw new Error('Image source is not valid');
    }
    return (<View testID="brand-img-wrapper" style={{ height, width }}>
			<ImageVariant testID="brand-img" style={[layout.fullHeight, layout.fullWidth,styles.test]} source={logo} sourceDark={LogoDark} resizeMode={mode}/>
		</View>);
}
Brand.defaultProps = {
    height: 200,
    width: 200,
    mode: 'contain',
};
export default Brand;

const styles = StyleSheet.create({
    test: {
      
    },
})
