import React from 'react';
import { View, StyleSheet } from 'react-native';

const BarPagination: React.FC<{ activeIndex: number; totalItems: number }> = ({ activeIndex, totalItems }) => {
    return (
        <View style={styles.container}>
            <View style={{ ...styles.bar, width: `${((activeIndex+1) / totalItems) * 100}%` }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 10,
        backgroundColor: '#e0e0e0', // background color of the bar
        borderRadius: 5,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#FF7074', // color for the active portion
    },
});

export default BarPagination;
