import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useThemeColors } from '../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';

const CardsScreen = () => {
  const themeColors = useThemeColors();
  const [isFrozen, setIsFrozen] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  
  const flip = useSharedValue(0); // 0 front, 180 back

  const flipCard = () => {
    flip.value = withSpring(flip.value === 0 ? 180 : 0, { damping: 15, stiffness: 100 });
  };

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${flip.value}deg` }
      ],
      backfaceVisibility: 'hidden',
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${flip.value + 180}deg` }
      ],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
    };
  });

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>My Cards</Text>
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={flipCard} style={styles.cardWrapper}>
        {/* Front of Card */}
        <Animated.View style={[styles.card, frontStyle, isFrozen && styles.frozenCard]}>
          <View style={styles.cardGlow} />
          <View style={styles.cardHeader}>
            <Text style={styles.cardBrand}>VaultX Premium</Text>
            <Icon name="logo-apple" size={24} color="#fff" />
          </View>
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>4812</Text>
            <Text style={styles.cardNumber}>3041</Text>
            <Text style={styles.cardNumber}>****</Text>
            <Text style={styles.cardNumber}>2904</Text>
          </View>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>Alex Doe</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>12/28</Text>
            </View>
          </View>
        </Animated.View>

        {/* Back of Card */}
        <Animated.View style={[styles.card, backStyle, isFrozen && styles.frozenCard]}>
           <View style={styles.blackStrip} />
           <View style={styles.cvvStrip}>
             <Text style={styles.cvvText}>{showCVV ? "892" : "***"}</Text>
           </View>
           <Text style={styles.backInfoText}>This card is issued by VaultX Financial under license. If found, please return to any VaultX branch.</Text>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.controlsSection}>
         <View style={[styles.controlItem, { backgroundColor: themeColors.card, borderColor: themeColors.glass }]}>
            <View style={styles.controlInfo}>
               <View style={[styles.iconBox, { backgroundColor: isFrozen ? 'rgba(239, 68, 68, 0.1)' : 'rgba(91, 46, 255, 0.1)' }]}>
                 <Icon name="snow-outline" size={22} color={isFrozen ? '#EF4444' : themeColors.primary} />
               </View>
               <View>
                 <Text style={[styles.controlName, { color: themeColors.textPrimary }]}>Freeze Card</Text>
                 <Text style={[styles.controlDesc, { color: themeColors.textSecondary }]}>Temporarily lock your card.</Text>
               </View>
            </View>
            <Switch value={isFrozen} onValueChange={setIsFrozen} trackColor={{ true: '#EF4444', false: themeColors.glass }} />
         </View>
]\
         <View style={[styles.controlItem, { backgroundColor: themeColors.card, borderColor: themeColors.glass }]}>
            <View style={styles.controlInfo}>
               <View style={[styles.iconBox, { backgroundColor: 'rgba(91, 46, 255, 0.1)' }]}>
                 <Icon name={showCVV ? "eye-outline" : "eye-off-outline"} size={22} color={themeColors.primary} />
               </View>
               <View>
                 <Text style={[styles.controlName, { color: themeColors.textPrimary }]}>Show CVV</Text>
                 <Text style={[styles.controlDesc, { color: themeColors.textSecondary }]}>Reveal 3-digit security code.</Text>
               </View>
            </View>
            <Switch value={showCVV} onValueChange={(val) => { setShowCVV(val); if(val && flip.value === 0) flipCard(); }} trackColor={{ true: themeColors.primary, false: themeColors.glass }} />
         </View>
      </View>
    </ScreenWrapper>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    height: 220,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    height: 220,
    backgroundColor: '#2A1F45',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#5B2EFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    overflow: 'hidden',
  },
  frozenCard: {
    backgroundColor: '#1E293B',
    opacity: 0.9,
  },
  cardGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(91, 46, 255, 0.4)',
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  blackStrip: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: '#111',
  },
  cvvStrip: {
    backgroundColor: '#eee',
    height: 35,
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  cvvText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
  backInfoText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  controlsSection: {
    marginTop: 10,
  },
  controlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  controlInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  controlName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  controlDesc: {
    fontSize: 12,
  },
});
