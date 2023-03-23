import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import DeliveryCard from '../components/DeliveryCard';
import { useTailwind } from 'tailwind-rn/dist';

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, 'MyModal'>>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>

const ModalScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const { params: { name, userId } } = useRoute<ModalScreenRouteProp>()
    const { loading, error, orders } = useCustomerOrders(userId);

    return (
        <View>
            <TouchableOpacity onPress={navigation.goBack} className='absolute right-5 top-5 z-10'>
                <Icon
                    name='closecircle'
                    type='antdesign' />
            </TouchableOpacity>

            <View className='mt-10'>
                <View style={[tw('py-5 border-b'), { borderColor: '#59C1CC' }]}>
                    <Text className='text-center text-xl font-bold text-blue-400'>{name}</Text>
                    <Text className='text-center italic text-sm'>deliveries</Text>
                </View>
            </View>

            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={orders}
                keyExtractor={(order) => order.trackingId}
                renderItem={({ item: order }) => <DeliveryCard order={order} />} />

        </View>
    )
}

export default ModalScreen