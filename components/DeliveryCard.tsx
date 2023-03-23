import { View, Text } from 'react-native'
import React from 'react'
import { Card, Divider, Icon } from '@rneui/themed'
import MapView, { Marker } from 'react-native-maps'
import { useTailwind } from 'tailwind-rn/dist'

type Props = {
    order: Order;
    fullWidth?: boolean;
}

const DeliveryCard = ({ order, fullWidth }: Props) => {
    const tw = useTailwind();

    return (
        <Card containerStyle={[tw(`${fullWidth ? 'rounded-none m-0' : 'rounded-lg'} my-2`),

        {
            backgroundColor: fullWidth ? '#EB6A7C' : '#59C1CC',
            padding: 0,
            paddingTop: 16,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        }
        ]}>
            <View style={fullWidth && { height: '100%' }}>
                <Icon
                    name='box'
                    type='entypo'
                    size={50}
                    color='white' />

                <View className='items-start p-5 -mt-3'>
                    <View className='mx-auto'>
                        <Text className='text-xs text-center uppercase text-white font-bold'>{order.carrier}-{order.trackingId}</Text>
                        <Text className='text-white text-center text-lg font-bold'>Expected delivery: {new Date(order.createdAt).toLocaleDateString()}</Text>

                        <Divider color='white' />
                    </View>

                    <View className='mx-auto pb-5'>
                        <Text className='text-base text-center text-white font-bold mt-5'>Address</Text>
                        <Text className='text-sm text-center text-white'>{order.Address} {order.City}</Text>
                        <Text className='text-sm text-center italic text-white'>Shipping cost: {order.shippingCost} Eur.</Text>
                    </View>
                </View>
                <Divider color='white' />

                <View className='p-5'>
                    {order.trackingItems.items.map((item) => (
                        <View key={item.item_id} className='flex-row justify-between items-center'>
                            <Text className='text-sm italic text-white'>{item.name}</Text>
                            <Text className='text-white text-xl'>x {item.quantity}</Text>
                        </View>
                    ))}
                </View>

                <MapView
                    initialRegion={{
                        latitude: order.Lat,
                        longitude: order.Lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}

                    style={[tw('w-full'), { flexGrow: 1 }, !fullWidth && { height: 200 }]}>
                    <Marker
                        coordinate={{
                            latitude: order.Lat,
                            longitude: order.Lng
                        }}
                        title='Delivery location'
                        description={order.Address}
                        identifier='destination' />
                </MapView>
            </View>
        </Card>
    )
}

export default DeliveryCard