'use client';
import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    FilledInput,
    InputAdornment,
    FormHelperText,
    InputLabel,
    FormLabel,
} from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react';
import { calcBMI } from '@/utils/tools/calcBMI';
import { FormData, IBMIData, ICombineData } from '@/types/tool';
import { calcTDEE } from '@/utils/tools/calcTDEE';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { updateLoading } from '@/lib/features/loading/loadingSlice';
import { useRouter } from 'next/navigation';
import toolSync from '@/utils/axios/tool';

interface FormError {
    age: string;
    height: string;
    weight: string;
    activityLevel: string;
    goal: string;
}

type Props = {};

const ToolForm: React.FC = ({}: Props) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<FormData>({
        gender: 0,
        age: null,
        height: null,
        weight: null,
        activityLevel: '',
        goal: '',
    });

    const [formErrors, setFormErrors] = useState<Partial<FormError>>({});

    const handleCalculate = async () => {
        if (validateFormData()) {
            try {
                // Show loading
                dispatch(
                    updateLoading({
                        isProgress: true,
                        text: 'Đang tính toán',
                    }),
                );

                // Nếu dữ liệu hợp lệ, log dữ liệu
                const dataForBMI: IBMIData = {
                    weight: formData.weight,
                    height: formData.height,
                };
                const resultBMI = calcBMI(dataForBMI);
                const resultTDEE = calcTDEE(formData);
                console.log(resultBMI);
                console.log(resultTDEE);

                let combineData: ICombineData = {
                    ...resultBMI,
                    ...resultTDEE,
                    ...formData,
                    message: '',
                };

                const messageFromAI = await toolSync.getResult(combineData);
                console.log('messageFromAI: ', messageFromAI);
                // combineData[message] = messageFromAI

                // router.push('/health-tool/result/1');
            } catch (error) {
            } finally {
                dispatch(
                    updateLoading({
                        isProgress: false,
                        text: '',
                    }),
                );
            }
        } else {
            // Nếu dữ liệu không hợp lệ, cập nhật trạng thái lỗi và xử lý theo ý của bạn
            console.log('Dữ liệu không hợp lệ');
            return;
        }
    };

    const validateFormData = (): boolean => {
        const errors: Partial<FormError> = {};

        if (!formData.age) {
            errors.age = 'Vui lòng nhập tuổi';
        }
        if (!formData.height) {
            errors.height = 'Vui lòng nhập chiều cao';
        }
        if (!formData.weight) {
            errors.weight = 'Vui lòng nhập cân nặng';
        }
        if (!formData.activityLevel) {
            errors.activityLevel = 'Vui lòng chọn cường độ vận động';
        }
        if (!formData.goal) {
            errors.goal = 'Vui lòng chọn mục tiêu';
        }

        setFormErrors(errors);

        // Trả về true nếu không có lỗi
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (
        event: React.ChangeEvent<
            HTMLInputElement | { name?: string; value: unknown }
        >,
    ): void => {
        setFormData({
            ...formData,
            [event.target.name as string]:
                typeof event.target.value === 'number'
                    ? event.target.value
                    : (event.target.value as string),
        });
    };

    const handleRadioChange = (event: any, fieldName: keyof FormData): void => {
        setFormData({
            ...formData,
            [fieldName]: parseInt(event.target.value, 10),
        });
    };

    const handleSelectChange = (
        event: React.ChangeEvent<{ value: string | unknown }>,
        field: keyof FormData,
    ): void => {
        setFormData({
            ...formData,
            [field]: event.target.value as string,
        });
    };

    return (
        <form>
            <FormControl component="fieldset" fullWidth required>
                <div className="center-y gap-5">
                    <div className="basis-1/3">
                        <FormLabel>Giới tính</FormLabel>
                    </div>
                    <RadioGroup
                        defaultValue={formData.gender}
                        name="gender"
                        row
                        onChange={(e) => handleRadioChange(e, 'gender')}
                    >
                        <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Nam"
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Nữ"
                        />
                    </RadioGroup>
                </div>
            </FormControl>

            <div className="flex items-start gap-5 mt-7">
                <FormControl className="" fullWidth>
                    <div className="center-x gap-2 flex-col">
                        <FormLabel>Tuổi</FormLabel>
                        <FilledInput
                            id="filled-adornment-age"
                            name="age"
                            endAdornment={
                                <InputAdornment position="end">
                                    tuổi
                                </InputAdornment>
                            }
                            aria-describedby="filled-age-helper-text"
                            inputProps={{
                                'aria-label': 'age',
                            }}
                            fullWidth
                            required
                            size="small"
                            type="number"
                            error={!!formErrors.age}
                            onChange={handleInputChange}
                        />
                        {formErrors.age && (
                            <FormHelperText error>
                                {formErrors.age}
                            </FormHelperText>
                        )}
                    </div>
                </FormControl>

                <FormControl className="" fullWidth>
                    <div className="center-x gap-2 flex-col">
                        <FormLabel>Chiều cao</FormLabel>
                        <FilledInput
                            id="filled-adornment-height"
                            name="height"
                            endAdornment={
                                <InputAdornment position="end">
                                    cm
                                </InputAdornment>
                            }
                            aria-describedby="filled-height-helper-text"
                            inputProps={{
                                'aria-label': 'height',
                            }}
                            fullWidth
                            required
                            size="small"
                            type="number"
                            error={!!formErrors.height}
                            onChange={handleInputChange}
                        />
                        {formErrors.height && (
                            <FormHelperText error>
                                {formErrors.height}
                            </FormHelperText>
                        )}
                    </div>
                </FormControl>

                <FormControl className="" fullWidth>
                    <div className="center-x gap-2 flex-col">
                        <FormLabel>Cân nặng</FormLabel>
                        <FilledInput
                            id="filled-adornment-weight"
                            name="weight"
                            endAdornment={
                                <InputAdornment position="end">
                                    kg
                                </InputAdornment>
                            }
                            aria-describedby="filled-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            fullWidth
                            required
                            size="small"
                            type="number"
                            error={!!formErrors.weight}
                            onChange={handleInputChange}
                        />
                        {formErrors.weight && (
                            <FormHelperText error>
                                {formErrors.weight}
                            </FormHelperText>
                        )}
                    </div>
                </FormControl>
            </div>

            <div className="center mt-7 gap-5">
                <FormControl variant="filled" className="" fullWidth>
                    <div className="center-x flex-col gap-2">
                        <div className="basis-1/3">
                            <FormLabel>Cường độ vận động</FormLabel>
                        </div>
                        <div className="basis-2/3">
                            <Select
                                fullWidth
                                required
                                size="small"
                                onChange={(e) =>
                                    handleSelectChange(e, 'activityLevel')
                                }
                                error={!!formErrors.activityLevel}
                            >
                                <MenuItem value="sedentary">
                                    Ít vận động
                                </MenuItem>
                                <MenuItem value="low">Vận động nhẹ</MenuItem>
                                <MenuItem value="medium">Vận động vừa</MenuItem>
                                <MenuItem value="high">Vận động nhiều</MenuItem>
                                <MenuItem value="athlete">
                                    Vận động cực nhiều
                                </MenuItem>
                            </Select>
                            {formErrors.activityLevel && (
                                <FormHelperText error>
                                    {formErrors.activityLevel}
                                </FormHelperText>
                            )}
                        </div>
                    </div>
                </FormControl>

                <FormControl variant="filled" className="" fullWidth>
                    <div className="center-x flex-col gap-2">
                        <div className="basis-1/3">
                            <FormLabel>Mục tiêu của bạn</FormLabel>
                        </div>
                        <div className="basis-2/3">
                            <Select
                                fullWidth
                                required
                                size="small"
                                onChange={(e) => handleSelectChange(e, 'goal')}
                                error={!!formErrors.goal}
                            >
                                <MenuItem value="increased">Tăng cân</MenuItem>
                                <MenuItem value="maintain">Duy trì</MenuItem>
                                <MenuItem value="lose">Giảm cân</MenuItem>
                            </Select>
                            {formErrors.goal && (
                                <FormHelperText error>
                                    {formErrors.goal}
                                </FormHelperText>
                            )}
                        </div>
                    </div>
                </FormControl>
            </div>

            <div className="center-y gap-5 mt-10 md:w-[70%] mx-auto">
                <Button
                    className="text-gray-700 hover:underline smooth"
                    variant="text"
                    fullWidth
                >
                    Xóa dữ liệu
                </Button>

                <Button
                    variant="contained"
                    className="bg-greenPrimary text-white opacity-80 hover:opacity-100 hover:bg-greenPrimary smooth"
                    fullWidth
                    onClick={handleCalculate}
                >
                    Bắt đầu phân tích
                </Button>
            </div>
        </form>
    );
};

export default ToolForm;