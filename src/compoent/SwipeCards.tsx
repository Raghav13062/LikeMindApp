import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    TouchableOpacity,
    Image,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DEFAULT_IMAGE = 'https://via.placeholder.com/300x400?text=No+Image'; // Fallback

const SwipeCards = ({ data }) => {
    const [cards, setCards] = useState(data);
    const pan = useRef(new Animated.ValueXY()).current;

    const removeTopCard = () => {
        setCards(prev => prev.slice(1));
        pan.setValue({ x: 0, y: 0 });
    };

    const swipeCard = (direction) => {
        const toValue = {
            right: { x: SCREEN_WIDTH, y: 0 },
            left: { x: -SCREEN_WIDTH, y: 0 },
            up: { x: 0, y: -SCREEN_WIDTH },
        }[direction];

        Animated.timing(pan, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            removeTopCard();
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > 120) swipeCard('right');
                else if (gesture.dx < -120) swipeCard('left');
                else if (gesture.dy < -120) swipeCard('up');
                else Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            },
        })
    ).current;

    if (cards.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.noMoreText}>No More Profiles</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {cards.map((item, index) => {
                const isTop = index === 0;
                const profileImage = item.image?.startsWith('http') ? item.image : DEFAULT_IMAGE;
                const name = item.full_name || item.first_name || item.email || 'Anonymous';
                const exp = item.exp_level || 'No Experience';

                return (
                    <Animated.View
                        key={item.id}
                        style={[styles.card, isTop && { transform: pan.getTranslateTransform() }]}
                        {...(isTop ? panResponder.panHandlers : {})}
                    >
                        <Image source={{ uri: profileImage }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.exp}>{exp}</Text>
                        </View>
                    </Animated.View>
                );
            })}

            {/* Action Buttons */}
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => swipeCard('left')} style={styles.btn}><Text>👎</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => swipeCard('up')} style={styles.btn}><Text>⭐</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => swipeCard('right')} style={styles.btn}><Text>👍</Text></TouchableOpacity>
            </View>
        </View>
    );
};

export default SwipeCards;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
        width: SCREEN_WIDTH - 40,
        height: '75%',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#f2f2f2',
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    exp: {
        fontSize: 16,
        color: '#fff',
    },
    buttons: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        justifyContent: 'space-evenly',
        width: '80%',
    },
    btn: {
        backgroundColor: '#eee',
        padding: 15,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMoreText: {
        fontSize: 20,
        color: 'gray',
    },
});
