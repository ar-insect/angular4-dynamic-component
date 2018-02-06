import { InjectionToken } from '@angular/core';

export interface InputConfig {
    type: string;
    placeholder: string;
    maxLength: number;
    minLength: number;
    [index: string]: any;
}

export const INPUT_DEFAULT_CONFIG =
    new InjectionToken<InputConfig>('INPUT_DEFAULT_ACCESSOR');

export const INPUT_CONFIG =
    new InjectionToken<InputConfig>('INPUT_CONFIG');

export const INPUT_DEFAULT_CONFIG_PROVIDER = {
    provide: INPUT_DEFAULT_CONFIG,
    useValue: {
        type: 'text',
        placeholder: ''
    }
};
