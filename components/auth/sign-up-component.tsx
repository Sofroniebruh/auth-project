"use state"

import {CommonCard} from "../common-card";
import {Button} from "@/components/ui/button";
import {LogInIcon} from "lucide-react";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {FormProvider, useForm} from "react-hook-form";
import {formRegisterSchema, RegisterFormType} from "@/components/auth/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {HandleNextStage} from "@/lib";

export const SignUpComponent = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [data, setData] = useState<RegisterFormType>();
    const form = useForm<RegisterFormType>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const handleNext = async () => {
        const registerForm = form
        const isValid = await HandleNextStage({registerForm})

        isValid && setStep(2);
    };

    const onSubmit = (data: RegisterFormType) => {
        setData(data)
        console.log("Data", data)
    }

    return (
        <CommonCard className="gap-6" isForAuth={true} setStep={setStep} step={step}>
            <FormProvider {...form}>
                {step === 1 && (
                    <form className={"flex flex-col gap-6"} onSubmit={form.handleSubmit(handleNext)}>
                        <div className="flex flex-col gap-3 w-[255px]">
                            <div className={"flex flex-col gap-1"}>
                                <Input
                                    {...form.register("email")}
                                    placeholder="Enter your email"
                                />
                                {form.formState.errors.email && (
                                    <p className={"text-sm text-red-500"}>{form.formState.errors.email.message}</p>
                                )}
                            </div>
                            <Button onClick={handleNext} className="text-base cursor-pointer">
                                Next <LogInIcon></LogInIcon>
                            </Button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <form className={"flex flex-col gap-6"} onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3 w-[255px]">
                            <div className={"flex flex-col gap-1"}>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    {...form.register("password")}
                                />
                                {form.formState.errors.password && (
                                    <p className={"text-sm text-red-500"}>{form.formState.errors.password.message}</p>
                                )}
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <Input
                                    placeholder="Repeat your password"
                                    type="password"
                                    {...form.register("confirmPassword")}
                                />
                                {form.formState.errors.confirmPassword && (
                                    <p className={"text-sm text-red-500"}>{form.formState.errors.confirmPassword.message}</p>
                                )}
                            </div>
                            <Button type={"submit"} className="text-base mt-7 cursor-pointer">
                                Sign Up <LogInIcon/>
                            </Button>
                        </div>
                    </form>
                )}
                <div>
                    <p className="text-sm text-gray-400 text-center">
                        By continuing you accept our <br/> privacy policy
                    </p>
                </div>
            </FormProvider>
        </CommonCard>
    );
};
