import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { Card, Icon } from '@rneui/themed';

type Props = {
    userId: string;
    name: string;
    email: string;
}

const CustomerCard = ({ userId, name, email }: Props) => {
    const { loading, error, orders } = useCustomerOrders(userId);
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    return (
        <TouchableOpacity>
            <Card containerStyle={tw('p-5 rounded-lg')}>
                <View>
                    <View className='flex-row justify-between'>
                        <View>
                            <Text className='text-2xl'>{name}</Text>
                            <Text className='text-sm text-blue-400'>ID: {userId}</Text>
                        </View>

                        <View className='flex-row items-center justify-end'>
                            <Text className='text-blue-400'>{loading ? 'loading...' : `${orders.length} x`}</Text>
                            <Icon
                                style={tw('mb-5 ml-auto')}
                                name='box'
                                type='entypo'
                                color='#59C1CC'
                                size={50} />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default CustomerCard