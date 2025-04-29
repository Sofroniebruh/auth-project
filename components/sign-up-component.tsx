"use state"

import {CommonCard} from "./common-card";
import {Button} from "@/components/ui/button";
import {LogInIcon} from "lucide-react";
import {useState} from "react";
import {Input} from "@/components/ui/input";

export const SignUpComponent = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleNext = () => {
        if (!email.includes("@")) {
            alert("Please enter a valid email.");
            return;
        }
        setStep(2);
    };

    return (
        <CommonCard className="gap-10" isForAuth={true} setStep={setStep} step={step}>
            {step === 1 && (
                <div className="flex flex-col gap-3 w-full sm:w-2/3">
                    <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleNext} className="text-base cursor-pointer">
                        Next <LogInIcon></LogInIcon>
                    </Button>
                </div>
            )}
            {step === 2 && (
                <div className="flex flex-col gap-3 w-full sm:w-[80%]">
                    <Input
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder="Repeat your password"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <Button className="text-base mt-7 cursor-pointer">
                        Sign Up <LogInIcon/>
                    </Button>
                </div>
            )}
            <div>
                <p className="text-sm text-gray-400 text-center">
                    By continuing you accept our <br/> privacy policy
                </p>
            </div>
        </CommonCard>
    );
};
