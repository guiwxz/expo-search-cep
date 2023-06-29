import Toast from "react-native-root-toast"

interface ToastProps {
  title: string;
  variant: 'success' | 'error'
}

export const toast = ({ title, variant }: ToastProps) => {

  const handleColor = () => {
    switch (variant) {
      case 'success': {
        return '#2E7D32'
      }
      case 'error': {
        return '#D32F2F'
      }
    }
  }

  return Toast.show(title, {
    duration: Toast.durations.LONG,
    backgroundColor: handleColor(),
    textColor: '#fff',
    position: Toast.positions.TOP,
    containerStyle: {
      marginTop: 40,
    }
  })
}