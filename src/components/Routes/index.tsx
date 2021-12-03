import React, { FC, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenName, AuthStack, MainStack } from 'navigation/navigation';
import { Home } from 'screens/Home';
import { SignIn } from 'screens/SignIn';
import { SignUp } from 'screens/SignUp';

export const Routes: FC = (): JSX.Element => {
    const [isAuth, setIsAuth] = useState<boolean>(true);

    return (
        <NavigationContainer>
            {!isAuth ? (
                <AuthStack.Navigator
                    initialRouteName={ScreenName.SIGN_IN}
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {
                            alignItems: 'center',
                        }
                    }}
                >
                    <AuthStack.Screen name={ScreenName.SIGN_IN} component={SignIn} />
                    <AuthStack.Screen name={ScreenName.SIGN_UP} component={SignUp} />
                </AuthStack.Navigator>
            ) : (
                <MainStack.Navigator
                    initialRouteName={ScreenName.HOME}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <MainStack.Screen name={ScreenName.HOME} component={Home} />
                </MainStack.Navigator>
            )}
        </NavigationContainer>
    );
};