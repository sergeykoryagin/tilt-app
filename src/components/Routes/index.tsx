import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenName, AuthStack, MainStack } from 'navigation/navigation';
import { useAuth } from 'hooks/useAuth';
import { Chat } from 'screens/Chat';
import { Home } from 'screens/Home';
import { Profile } from 'screens/Profile';
import { Settings } from 'screens/Settings';
import { SignIn } from 'screens/SignIn';
import { SignUp } from 'screens/SignUp';

export const Routes: FC = observer((): JSX.Element => {
    const { isAuth } = useAuth();

    return (
        <NavigationContainer>
            {!isAuth ? (
                <AuthStack.Navigator
                    initialRouteName={ScreenName.SIGN_IN}
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {
                            alignItems: 'center',
                        },
                        animation: 'slide_from_right'
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
                        animation: 'fade',
                    }}
                >
                    <MainStack.Screen name={ScreenName.HOME} component={Home} />
                    <MainStack.Screen name={ScreenName.PROFILE} component={Profile} />
                    <MainStack.Screen name={ScreenName.CHAT} component={Chat} />
                    <MainStack.Screen name={ScreenName.SETTINGS} component={Settings} />
                </MainStack.Navigator>
            )}
        </NavigationContainer>
    );
});