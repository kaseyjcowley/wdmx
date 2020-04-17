import React from 'react';
import {
  Layout,
  Icon,
  LayoutProps,
  IconProps,
  Text,
} from '@ui-kitten/components';
import {TouchableOpacity, StyleSheet, Animated} from 'react-native';

const AnimatedIcon: Animated.AnimatedComponent<typeof Icon> &
  IconProps = Animated.createAnimatedComponent(Icon);

interface Props extends LayoutProps {
  onDeleteRow: () => void;
  showDeleteControls: boolean;
  children: React.ReactNode;
}

export const DeleteRowWrapper: React.FC<Props> = ({
  showDeleteControls,
  onDeleteRow,
  children,
  ...layoutProps
}) => {
  const [rotate] = React.useState(new Animated.Value(0));
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const rotateIcon = () => {
    Animated.timing(rotate, {
      toValue: Number(!isDeleting),
      duration: 250,
    }).start(() => {
      setIsDeleting(!isDeleting);
    });
  };

  return (
    <Layout {...layoutProps} style={[styles.container, layoutProps.style]}>
      {showDeleteControls ? (
        <>
          <TouchableOpacity onPress={rotateIcon}>
            <AnimatedIcon
              name="minus-circle"
              fill="#ff0000"
              style={[
                styles.icon,
                {
                  transform: [
                    {
                      rotate: rotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '90deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
          {children}
          {isDeleting && (
            <TouchableOpacity style={styles.deleteBtn} onPress={onDeleteRow}>
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        children
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: 'red',
    marginRight: -24,
    marginLeft: 8,
  },
  deleteBtnText: {
    color: 'white',
    padding: 8,
  },
});
