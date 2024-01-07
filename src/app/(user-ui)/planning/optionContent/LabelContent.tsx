import { TFeature, optionType, remindType } from '@/types/planning';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';

export interface ILabelContentProps {
    data: number | string;
    feature: TFeature;
    handleChange: (type: number | string, optionType: number) => void;
}

export default function LabelContent({
    data,
    feature,
    handleChange,
}: ILabelContentProps) {
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (parseInt(event.target.value, 10)) {
            case remindType.DRINK:
                handleChange(remindType.DRINK, optionType.TITLE);
                break;
            case remindType.EXCERCISE:
                handleChange(remindType.EXCERCISE, optionType.TITLE);
                break;
        }
    };

    return (
        <div className="pl-2">
            {feature === 'planning' ? (
                <div className=""></div>
            ) : (
                <div className="">
                    <RadioGroup
                        defaultValue={data}
                        name="radio-buttons-group"
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel
                            sx={{
                                height: 52,
                                '& .Mui-checked .MuiSvgIcon-root': {
                                    fill: '#097770', // Màu sắc khi radio button được chọn
                                },
                            }}
                            value={remindType.DRINK}
                            control={<Radio />}
                            label="Nhắc uống nước đều đặn"
                        />
                        <FormControlLabel
                            sx={{
                                height: 52,
                                '& .Mui-checked .MuiSvgIcon-root': {
                                    fill: '#097770', // Màu sắc khi radio button được chọn
                                },
                            }}
                            value={remindType.EXCERCISE}
                            control={<Radio />}
                            label="Nhắc lịch tập thể dục"
                        />
                    </RadioGroup>
                </div>
            )}
        </div>
    );
}
