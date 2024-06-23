import {BoxCounter} from "./BoxCounter";
import {ElWrapper} from "./ElWrapper";
import {Input} from "./Input";
import {Button} from "./Button";
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";

type BoxCounter1Props = {
    startValue: number
    maxValue: number
    setStartValue: Dispatch<SetStateAction<number>>
    setMaxValue: Dispatch<SetStateAction<number>>
    setTextError: Dispatch<SetStateAction<string>>
    textError: string
}

export const BoxCounter1 = ({
                                startValue,
                                maxValue,
                                setStartValue,
                                setMaxValue,
                                setTextError,
                                textError
                            }: BoxCounter1Props) => {
    const [errorMaxV, setErrorMaxV] = useState(false);
    const [errorStartV, setErrorStartV] = useState(false);

    const isDisabled = () => {
        if(errorMaxV || errorStartV || textError){
            return true
        }else {
            return false
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        setMaxValue(+formJson.maxValue);
        setStartValue(+formJson.startValue);

        const isValid = +formJson.maxValue > +formJson.startValue && +formJson.maxValue !== +formJson.startValue && +formJson.maxValue > 0 && +formJson.startValue >= 0;

        if(isValid){
            localStorage.setItem("maxValue", String(formJson.maxValue));
            localStorage.setItem("startValue", String(formJson.startValue))
        }
    }

    const checkMaxValue = (e: FormEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < 0) {
            setErrorMaxV(true);
            setTextError('enter values and press `set`')
        }else if(+e.currentTarget.value === startValue || +e.currentTarget.value < startValue){
            setErrorMaxV(true);
            setErrorStartV(true);
            setTextError('enter values and press `set`')
        } else {
            setErrorMaxV(false);
            setErrorStartV(false);
            setTextError('')
        }
    }

    const checkStartValue = (e: FormEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < 0) {
            setErrorStartV(true);
            setTextError('enter values and press `set`')
        }  else if(+e.currentTarget.value === maxValue || +e.currentTarget.value > maxValue){
            setErrorMaxV(true);
            setErrorStartV(true);
            setTextError('enter values and press `set`')
        }
        else {
            setErrorStartV(false);
            setErrorMaxV(false);
            setTextError('')
        }
    }


    return (
        <BoxCounter>
            <form onSubmit={(e) => handleSubmit(e)}>
                <ElWrapper>
                    <Input name={'max value'} defaultValue={maxValue} id={'maxValue'}
                           onInputHandler={checkMaxValue} error={errorMaxV} onBlurHandle={(e) =>  setMaxValue(+e.currentTarget.value)}/>
                    <Input name={'start value'} defaultValue={startValue} id={'startValue'}
                           onInputHandler={checkStartValue} error={errorStartV} onBlurHandle={(e) => setStartValue(+e.currentTarget.value)}/>
                </ElWrapper>
                <ElWrapper>
                    <Button name={'set'} color={'#03a9f482'} type={'submit'} isDisabled={isDisabled()}/>
                </ElWrapper>
            </form>
        </BoxCounter>
    )
}