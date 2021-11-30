import React, { FC } from 'react';
import { TextInput } from 'react-native';

interface Props {
    value: string;
}

export const Input: FC<Props> = ({ value }: Props): JSX.Element => {
    return (
        <>
            <TextInput value={value}/>
        </>
    );
};